<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	import type { ModalProps } from '@skeletonlabs/skeleton/dist/utilities/Modal/Modal.svelte';
	// Types
	import type { UserSettings } from '$lib/types/userSettings';

	// Stores
	import { get } from 'svelte/store';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { userSettings } from '$lib/stores/userSettings';
	interface Props {
		parent: ModalProps;
		children?: import('svelte').Snippet;
	}

	let { children, parent }: Props = $props();

	const modalStore = getModalStore();

	// Form Data
	const formData: UserSettings = $state(get(userSettings));

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		userSettings.set(formData);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<aside class="alert">
				<div class="alert-message">
					<p>Refresh Interval</p>
				</div>
				<div class="alert-actions">
					<select class="select" name="refreshInterval" bind:value={formData.refreshInterval}>
						<option value="5">5 seconds</option>
						<option value="10">10 seconds</option>
						<option value="30">30 seconds</option>
						<option value="60">1 minute</option>
						<option value="300">5 minutes</option>
					</select>
				</div>
			</aside>
		</form>

		{@render children?.()}

		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" onclick={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<button class="btn {parent.buttonPositive}" onclick={onFormSubmit}>Save</button>
		</footer>
	</div>
{/if}
