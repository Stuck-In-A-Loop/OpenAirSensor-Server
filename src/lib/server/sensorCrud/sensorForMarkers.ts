import type { MarkerDataMap } from '$lib/types/mapTypes';

import { db } from '../db';

export const sensorForMarkers = async () => {
	const sensors = await db.query.sensor.findMany({
		columns: {
			apiKey: false
		},
		with: {
			sensorData: {
				limit: 100,
				orderBy: (sensorData, { desc }) => [desc(sensorData.updatedAt)]
			}
		}
	});

	const markers: MarkerDataMap = {};

	for (const sensor of sensors) {
		const latestData = sensor.sensorData[0];
		if (!latestData) {
			continue;
		}

		markers[sensor.id] = {
			createdAt: sensor.createdAt,
			data: latestData,
			description: sensor.description,
			id: sensor.id,
			name: sensor.name,
			status: sensor.status,
			updatedAt: sensor.updatedAt
		};
		if (!latestData.gpsAltitude || !latestData.gpsLatitude || !latestData.gpsLongitude) {
			for (const data of sensor.sensorData) {
				if (data.gpsAltitude && data.gpsLatitude && data.gpsLongitude) {
					markers[sensor.id].data.gpsAltitude = data.gpsAltitude;
					markers[sensor.id].data.gpsLatitude = data.gpsLatitude;
					markers[sensor.id].data.gpsLongitude = data.gpsLongitude;
					break;
				}
			}
		}
	}

	return markers;
};
