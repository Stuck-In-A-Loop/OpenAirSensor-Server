import type { RequestState } from '$lib/types/datatables';

import logger from '$lib/logger';
import { asc, desc, eq } from 'drizzle-orm';

import { db, schema } from '../db';

export const sensorDataList = async (state: RequestState) => {
	const { offset, rowsPerPage, sort } = state;

	let orderBy;
	if (sort) {
		const field: keyof typeof schema.sensorData.$inferSelect = sort.field ?? 'updatedAt';
		if (field in schema.sensorData) {
			orderBy =
				sort.direction === 'asc' ? asc(schema.sensorData[field]) : desc(schema.sensorData[field]);
		} else {
			orderBy =
				sort.direction === 'asc'
					? asc(schema.sensorData.updatedAt)
					: desc(schema.sensorData.updatedAt);
		}
	} else {
		orderBy = desc(schema.sensorData.updatedAt);
	}

	const sensorsData = await db
		.select({
			createdAt: schema.sensorData.createdAt,
			gpsAltitude: schema.sensorData.gpsAltitude,
			gpsLatitude: schema.sensorData.gpsLatitude,
			gpsLongitude: schema.sensorData.gpsLongitude,
			humidityPercent: schema.sensorData.humidityPercent,
			id: schema.sensorData.id,
			pm10: schema.sensorData.pm10,
			pm25: schema.sensorData.pm25,
			// sensor_description: schema.sensor.description,
			// sensor_name: schema.sensor.name,
			sensor: {
				name: schema.sensor.name
			},
			sensorId: schema.sensorData.sensorId,
			sensorStatus: schema.sensorData.sensorStatus,
			temperatureCelsius: schema.sensorData.temperatureCelsius,
			updatedAt: schema.sensorData.updatedAt
		})
		.from(schema.sensorData)
		.leftJoin(schema.sensor, eq(schema.sensor.id, schema.sensorData.sensorId))
		.limit(rowsPerPage)
		.offset(offset)
		.orderBy(orderBy);

	logger.debug({ sensorsData });

	const total = await db.$count(schema.sensorData);

	return { sensorsData, total };
};
