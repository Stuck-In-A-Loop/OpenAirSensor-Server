<script lang="ts">
	import { page } from '$app/state';
	import { superForm } from 'sveltekit-superforms';
	import ItemHeaderRow from '$lib/components/ItemHeaderRow.svelte';
	import DatatableSensor from '$lib/components/DatatableSensor.svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let dataTableS: DatatableSensor;
	const isSmallScreen = new MediaQuery('max-width: 640px');

	const toastStore = getToastStore();

	const copiedkey: ToastSettings = {
		background: 'variant-filled-success',
		message: 'Sensor key copied to clipboard'
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

{#if $message}
	<div
		class="card py-6 px-4 mb-4 flex flex-row justify-between items-center border border-green-800"
	>
		<h3 class={['text-wrap w-full', 'break-words', { invalid: page.status >= 400 }]}>
			{#if isSmallScreen.current}
				Key was generated. Save it!
			{:else}
				Generated key: {$message}. Please save this key!
			{/if}
		</h3>
		<button type="button" class="btn variant-filled-primary rounded" onclick={copyToClipboard}>
			Copy Key
		</button>
	</div>
{/if}

<form class="card p-4 w-full text-token space-y-4" method="POST" use:enhance>
	<ItemHeaderRow title={'Create a new sensor'} buttons={false} />
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

<style>
	.invalid {
		color: red;
	}
</style>
