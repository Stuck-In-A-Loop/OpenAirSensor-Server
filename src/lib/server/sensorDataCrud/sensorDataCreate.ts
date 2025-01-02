import { z } from 'zod';
import logger from '$lib/logger';

import { db, schema, sensorDataInsert } from '../db';

type SensorDataCreate = z.infer<typeof sensorDataInsert>;
type Sensor = typeof schema.sensor.$inferSelect;

export const sensorDataCreate = async (sensor: Sensor, data: SensorDataCreate) => {
	const sensorData = await db
		.insert(schema.sensorData)
		.values({
			...data,
			sensorId: sensor.id
		})
		.returning();

	logger.debug({ sensorData });

	return sensorData[0];
};
