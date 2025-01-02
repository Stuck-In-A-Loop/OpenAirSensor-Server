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

<ItemHeaderRow title={data.name} buttons={false} />
<div class="card p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
	<div>
		<p><strong class="text-xl">ID</strong></p>
		<p>{data.id}</p>
	</div>
	<div>
		<p><strong class="text-xl">Name</strong></p>
		<p>{data.name}</p>
	</div>
	<div>
		<p><strong class="text-xl">Description</strong></p>
		<p>{data.description}</p>
	</div>
	<div>
		<p><strong class="text-xl">Created At</strong></p>
		<p>{data.createdAt}</p>
	</div>
	<div>
		<p><strong class="text-xl">Updated At</strong></p>
		<p>{data.updatedAt}</p>
	</div>
</div>

<DatatableSensorDataPerSensor bind:this={dataTableSD} id={data.id} />
