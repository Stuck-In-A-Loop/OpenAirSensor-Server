<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<main class="container p-4 sm:p-10 mx-auto">
	{@render children?.()}
</main>
