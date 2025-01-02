import type { ToastStore } from '@skeletonlabs/skeleton';
import type { Location, GoogleMarker, MarkerDataMap, MarkerData } from '$lib/types/mapTypes';

import logger from '$lib/logger';
import { env } from '$env/dynamic/public';
import { getToastStore } from '@skeletonlabs/skeleton';
import * as gmapsLoader from '@googlemaps/js-api-loader';

const { Loader } = gmapsLoader;
export const galati: Location = { lat: 45.4377134, lng: 28.0124756 };

let MapLib: google.maps.MapsLibrary | undefined = undefined;
let MarkerLib: google.maps.MarkerLibrary | undefined = undefined;
let toastStore: ToastStore | undefined = undefined;
let loader: gmapsLoader.Loader;
let map: google.maps.Map;
let markers: GoogleMarker = {};

export const initMap = async (mapElement: HTMLElement, initLocation: Location) => {
	toastStore = getToastStore();

	loader = new Loader({
		apiKey: env.PUBLIC_GOOGLEMAPS_API_KEY,
		version: 'weekly'
	});

	MapLib = await loader.importLibrary('maps');
	MarkerLib = await loader.importLibrary('marker');

	map = new MapLib.Map(mapElement, {
		center: initLocation,
		mapId: 'openairsensor',
		zoom: 13
	});

	// empty markers
	markers = {};
};

const addMarker = async (markerData: MarkerData) => {
	if (MarkerLib) {
		logger.debug(`Adding marker ${markerData.name}`);
		const location =
			markerData.data.gpsLatitude && markerData.data.gpsLongitude
				? { lat: markerData.data.gpsLatitude, lng: markerData.data.gpsLongitude }
				: galati;
		markers[markerData.id] = {
			...markerData,
			marker: new MarkerLib.AdvancedMarkerElement({
				gmpClickable: true,
				map,
				position: location,
				title: markerData.name
			})
		};
		markers[markerData.id].marker.addListener('click', () => {
			logger.info(`Marker ${markers[markerData.id].name} clicked`);
			if (MapLib) {
				new MapLib.InfoWindow({
					content: `
				<div class="variant-filled-primary">
					<h3 class="h3">${markers[markerData.id].name}</h3>
					<p>Temperature: ${markers[markerData.id].data.temperatureCelsius} °C</p>
					<p>Humidity: ${markers[markerData.id].data.humidityPercent} %</p>
					<p>PM2.5: ${markers[markerData.id].data.pm25} μg/m3</p>
					<p>PM10: ${markers[markerData.id].data.pm10} μg/m3</p>
				</div>
				`
				}).open(map, markers[markerData.id].marker);
			} else {
				logger.error('MapLib is not loaded');
			}
			toastStore?.trigger({
				// Provide any utility or variant background style:
				background: 'variant-filled-surface',
				message: `Marker ${markers[markerData.id].name} clicked, ${markers[markerData.id].data.temperatureCelsius}`,
				timeout: 5000
			});
		});
	} else {
		logger.error('MarkerLib is not loaded');
	}
};

const updateMarker = async (markerData: MarkerData) => {
	if (MarkerLib) {
		logger.debug(`Updating marker ${markerData.name}`);
		if (!markers[markerData.id]) {
			await addMarker(markerData);
			return;
		}
		const location =
			markerData.data.gpsLatitude && markerData.data.gpsLongitude
				? { lat: markerData.data.gpsLatitude, lng: markerData.data.gpsLongitude }
				: galati;
		markers[markerData.id] = {
			...markerData,
			marker: markers[markerData.id].marker
		};
		markers[markerData.id].marker.position = location;
	} else {
		logger.error('MarkerLib is not loaded');
	}
};

export const updateMarkers = async () => {
	const markersFetch = await fetch('/api/sensor/markers');
	const markersData: MarkerDataMap = await markersFetch.json();
	for (const markerData of Object.values(markersData)) {
		await updateMarker(markerData);
	}
};
