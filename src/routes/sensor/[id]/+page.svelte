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

<ItemHeaderRow title={data.name} buttons={false} titleSize={'text-3xl'}/>

<div class="py-4 w-full grid grid-cols-1 sm:grid-cols-9 gap-4">
	<div class="card w-full flex flex-col items-center p-4 col-span-1">
		<p><strong class="text-xl">ID</strong></p>
		<hr class="hr w-full border-t-4 m-2" />
		<p>{data.id}</p>
	</div>
	<div class="card w-full flex flex-col items-start p-4 col-span-4">
		<p><strong class="text-xl">Created At</strong></p>
		<hr class="hr w-full border-t-4 m-2" />
		<p>{data.createdAt}</p>
	</div>
	<div class="card w-full flex flex-col items-start p-4 col-span-4">
		<p><strong class="text-xl">Updated At</strong></p>
		<hr class="hr w-full border-t-4 m-2" />
		<p>{data.updatedAt}</p>
	</div>
</div>

{#if data.description}
<div class="card p-8 w-full grid grid-cols-1 gap-4">
	<div class="flex flex-col items-start">
		<p><strong class="text-xl">Description</strong></p>
		<hr class="hr w-full border-t-4 m-2" />
		<p>{data.description}</p>
	</div>
</div>
{/if}

<DatatableSensorDataPerSensor bind:this={dataTableSD} id={data.id} />
