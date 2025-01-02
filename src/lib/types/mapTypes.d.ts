import { schema } from '$lib/server/db';

export interface Location {
	lat: number;
	lng: number;
}

export interface MarkerData extends Omit<typeof schema.sensor.$inferSelect, 'apiKey'> {
	data: typeof schema.sensorData.$inferSelect;
}

export interface MarkerDataMap {
	[key: number]: MarkerData;
}

export interface GoogleMarker {
	[key: number]: {
		marker: google.maps.marker.AdvancedMarkerElement;
	} & MarkerData;
}
