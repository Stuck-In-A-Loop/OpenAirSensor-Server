<script lang="ts">
	import { page } from '$app/state';
	import { superForm } from 'sveltekit-superforms';
	import DatatableSensor from '$lib/components/DatatableSensor.svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import ItemHeaderRow from '$lib/components/ItemHeaderRow.svelte';

	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let dataTableS: DatatableSensor;
	const toastStore = getToastStore();

	const copiedkey: ToastSettings = {
	message: 'Sensor key copied to clipboard',
	background: 'variant-filled-success',
};

	// Client API:
	const { constraints, delayed, enhance, errors, form, message } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.valid) {
				// Submit the form
				dataTableS.table.invalidate();
			}
		},
		resetForm: false
	});


	function copyToClipboard() {
    navigator.clipboard.writeText($message);
	toastStore.trigger(copiedkey);
  }

</script>

<svelte:head>
	<title>Sensors - OpenAirSensor Server</title>
</svelte:head>

<DatatableSensor bind:this={dataTableS} />

<form class="card p-4 w-full text-token space-y-4" method="POST" use:enhance>
	<ItemHeaderRow title={"Create a new sensor"} buttons={false} />
	<label class="label" for="name">
		<span>Name</span>
		<input
			class="input"
			type="text"
			name="name"
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
	</label>
	<label class="label">
		<span>Description</span>
		<textarea
			class="textarea"
			rows="4"
			placeholder="More information about the sensor."
			name="description"
			aria-invalid={$errors.description ? 'true' : undefined}
			bind:value={$form.description}
			{...$constraints.description}
		></textarea>
		{#if $errors.description}<span class="invalid">{$errors.description}</span>{/if}
	</label>

	<button class="btn variant-filled-primary" type="submit">Submit</button>
	{#if $delayed}Working...{/if}
</form>

{#if $message}
	<div class="card p-4 rounded-lg mb-4 flex justify-between items-center border border-green-800">
		<h3 class={['text-wrap', 'break-words', { invalid: page.status >= 400 }]}>
			Generated key: {$message}. Please save this key.
		</h3>
		<button type="button" class="btn variant-filled-primary px-4 py-2 rounded" onclick={copyToClipboard}>
			Copy Key
		</button>
	</div>
{/if}

<style>
	.invalid {
		color: red;
	}
</style>
