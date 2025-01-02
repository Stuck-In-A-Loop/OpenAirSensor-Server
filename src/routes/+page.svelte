<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { browser } from '$app/environment';
	import { userSettings } from '$lib/stores/userSettings';
	import { galati, initMap, updateMarkers } from '$lib/utils/gmapsHelpers';
	import DatatableSensorData from '$lib/components/DatatableSensorData.svelte';

	let mapElement: HTMLElement;
	let dataTableSD: DatatableSensorData;
	let refreshInterval: number;
	const setRefreshInterval = (interval: number) => {
		refreshInterval = setInterval(async () => {
			dataTableSD.table.invalidate();
			await updateMarkers();
		}, interval * 1000);
	};

	onMount(() => {
		const initializeMap = async () => {
			await initMap(mapElement, galati);
			await updateMarkers();
		};
		initializeMap();
		setRefreshInterval(get(userSettings).refreshInterval);
		return () => clearInterval(refreshInterval);
	});

	$effect(() => {
		if (browser) {
			console.log('refreshInterval changed');
			clearInterval(refreshInterval);
			setRefreshInterval($userSettings.refreshInterval);
		}
	});
</script>

<svelte:head>
	<title>Home - OpenAirSensor Server</title>
</svelte:head>
<div class="min-h-screen md:min-h-full grid grid-cols-1 md:grid-cols-3 gap-4">
	<div bind:this={mapElement} class="md:col-span-2 bg-gray-100 p-4">
		<!-- Map content -->
	</div>
	<div class="p-4">
		<DatatableSensorData bind:this={dataTableSD} />
	</div>
</div>
