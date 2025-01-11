<script lang="ts">
	interface Props {
		title: string;
		titleSize?: string;
		buttons?: boolean;
		hrClasses?: string[];
		classicButtons?: boolean;
		additionalClasses?: string[];
		editAction?: () => Promise<void>;
		additionalButtons?: import('svelte').Snippet;
		additionalControls?: import('svelte').Snippet;
		deleteAction?: (() => Promise<void>) | undefined;
	}

	let {
		additionalButtons,
		additionalClasses = [],
		additionalControls,
		buttons = false,
		classicButtons = true,
		deleteAction = undefined,
		editAction = async () => {
			console.warn('No edit action provided');
		},
		hrClasses = ['!border-t-4', 'my-5'],
		title,
		titleSize = 'text-2xl'
	}: Props = $props();
</script>

<div
	class={[
		'flex',
		'flex-col',
		'md:flex-row',
		'gap-4',
		'justify-between',
		'items-center',
		additionalClasses
	]}
>
	<h2 class={titleSize}>{title}</h2>
	<div class="flex flex-col md:flex-row gap-4 justify-between items-center">
		{#if buttons}
			<div class="btn-group variant-filled">
				{#if classicButtons}
					<button onclick={editAction}>Edit</button>
					{#if deleteAction}
						<button onclick={deleteAction}>Delete</button>
					{/if}
				{/if}
				{@render additionalButtons?.()}
			</div>
		{/if}
		{@render additionalControls?.()}
	</div>
</div>

<hr class={hrClasses} />
