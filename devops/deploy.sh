#!/usr/bin/env bash

ME=$(basename "$0")

usage() {
    echo "Usage: $ME" >&2
    exit 1
}

DEPLOYMENT=${DEPLOYMENT:-${COMPONENT}-deploy}
CONTAINER=$COMPONENT
DATE=$(cat $TIMESTAMP)

echo "Image: ${REGISTRY}/${IMAGE_NAME}:${TAG}"

trigger_deployment() {
    echo "[DEPLOYMENT STARTED] $1"
    OLD_IMAGE=$(kubectl -n $1 get deployment/$DEPLOYMENT -o jsonpath='{.spec.template.spec.containers[0].image}')
    kubectl -n $1 set image deployment/$DEPLOYMENT $CONTAINER=${REGISTRY}/${IMAGE_NAME}:${TAG}
    # Annotated the deployment kubernetes.io/change-cause
    kubectl -n $1 annotate deployment/$DEPLOYMENT kubernetes.io/change-cause="Deployed by $CI_PROJECT_NAME pipeline, commit $CI_COMMIT_SHA, updated to ${HARBOR_REPO}/${HARBOR_PROJ}/${SERVICE_NAME}:${TAG}, from $OLD_IMAGE" --overwrite
    kubectl -n $1 rollout status deploy $DEPLOYMENT
    echo "[DEPLOYMENT FINISHED] $1 (exit code: $?)"
}

IFS=','
MAX_DEPLOYMENT=5
running=0
total=0

echo "ℹ️ Maximum parallel deployments: $MAX_DEPLOYMENT"

for NAMESPACE in $NAMESPACES; do
    trigger_deployment $NAMESPACE &
    ((total += 1))
    ((running += 1))
    if [ $running -eq $MAX_DEPLOYMENT ]; then
        echo "⌛ $running deployments in-progress, waiting to complete..."
        wait
        running=0
    fi
done

echo "⌛ $running deployments in-progress, waiting to complete..."
wait
echo "🎉 $total deployments completed!"