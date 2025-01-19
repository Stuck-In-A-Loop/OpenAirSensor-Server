<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	import ItemHeaderRow from '$lib/components/ItemHeaderRow.svelte';
	import DatatableSensorDataPerSensor from '$lib/components/DatatableSensorDataPerSensor.svelte';

	let dataTableSD: DatatableSensorDataPerSensor;
</script>

<svelte:head>
	<title>Sensor {data.name} - OpenAirSensor Server</title>
</svelte:head>

<ItemHeaderRow title={data.name} buttons={false} titleSize={'text-3xl'} />

<div class="py-4 w-full grid grid-cols-1 sm:grid-cols-9 gap-4">
	<div
		class="card w-full text-center p-4 col-span-1 flex space-between gap-2 sm:flex-col sm:space-y-0"
	>
		<p><strong class="text-xl">ID</strong></p>
		<hr class="hr w-full border-t-4 m-2 mx-auto hrHidden" />
		<p
			class="w-full h-auto text-responsive flex items-center justify-center sm:h-[calc(100%-1.5rem)]"
		>
			{data.id}
		</p>
	</div>
	<div class="card w-full flex flex-col items-start p-4 col-span-1 sm:col-span-6 md:col-span-8">
		<p><strong class="text-xl">Created At</strong></p>
		<hr class="hr w-full border-t-4 m-2 mx-auto" />
		<p class="mb-4">{data.createdAt}</p>

		<p><strong class="text-xl mt-4">Updated At</strong></p>
		<hr class="hr w-full border-t-4 m-2 mx-auto" />
		<p>{data.updatedAt}</p>
	</div>
</div>

{#if data.description}
	<div class="card p-8 w-full grid grid-cols-1 gap-4">
		<div class="flex flex-col items-start">
			<p><strong class="text-xl">Description</strong></p>
			<hr class="hr w-full border-t-4 m-2 mx-auto" />
			<p>{data.description}</p>
		</div>
	</div>
{/if}

<DatatableSensorDataPerSensor bind:this={dataTableSD} id={data.id} />

<style>
	.text-responsive {
		font-size: clamp(1rem, 2.5vh, 2rem);
	}

	.hrHidden {
		display: none !important;
	}

	@media (min-width: 640px) {
		.hrHidden {
			display: block !important;
		}
	}
</style>
