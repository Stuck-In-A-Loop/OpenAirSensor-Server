<script lang="ts">
	import { page } from '$app/state';
	import { superForm } from 'sveltekit-superforms';
	import DatatableSensor from '$lib/components/DatatableSensor.svelte';

	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let dataTableS: DatatableSensor;

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
</script>

<svelte:head>
	<title>Sensors - OpenAirSensor Server</title>
</svelte:head>

<DatatableSensor bind:this={dataTableS} />

<form class="card p-4 w-full text-token space-y-4" method="POST" use:enhance>
	{#if $message}<h3 class={['text-wrap', 'break-words', { invalid: page.status >= 400 }]}>
			{$message}
		</h3>{/if}
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
			placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
