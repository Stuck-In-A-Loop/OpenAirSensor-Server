import { randomBytes } from 'crypto';

import { db, schema } from '../db';

export const sensorCreate = async (name: string, description?: string | null) => {
	const existingSensor = await db.query.sensor.findFirst({
		where: (sensors, { eq }) => eq(sensors.name, name)
	});

	if (existingSensor) {
		return null;
	}
	const newApiKey = randomBytes(32).toString('hex');
	const sensor = await db
		.insert(schema.sensor)
		.values({
			apiKey: newApiKey,
			description,
			name
		})
		.returning();

	return sensor[0];
};
