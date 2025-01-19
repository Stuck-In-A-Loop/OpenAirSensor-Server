<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { browser } from '$app/environment';
	import { userSettings } from '$lib/stores/userSettings';
	import { galati, initMap, updateMarkers } from '$lib/utils/gmapsHelpers';
	import DatatableSensorData from '$lib/components/DatatableSensorData.svelte';

	let mapElement: HTMLElement;
	let dataTableSD: DatatableSensorData;
	let refreshInterval: ReturnType<typeof setInterval>;
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
			clearInterval(refreshInterval);
			setRefreshInterval($userSettings.refreshInterval);
		}
	});
</script>

<svelte:head>
	<title>Home - OpenAirSensor Server</title>
</svelte:head>
<div class="min-h-screen flex flex-col gap-4 p-4">
	<div bind:this={mapElement} class="h-full flex-1 p-4 rounded-lg shadow-md min-h-[40dvh]">
		<!-- Map content -->
	</div>
	<div class="flex-2 rounded-lg shadow-md">
		<DatatableSensorData bind:this={dataTableSD} />
	</div>
</div>
