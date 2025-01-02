import { db } from '../db';

export const sensorGet = async (id: number) => {
	if (isNaN(id)) {
		return null;
	}
	const sensor = await db.query.sensor.findFirst({
		columns: {
			apiKey: false
		},
		where: (sensor, { eq }) => eq(sensor.id, id)
	});

	return sensor;
};
