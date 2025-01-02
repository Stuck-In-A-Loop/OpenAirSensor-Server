import { schema } from '$lib/server/db';

export interface SensorDataFetch {
	total: number;
	sensorData: (typeof schema.sensorData.$inferSelect)[];
}

export type SensorData = typeof schema.sensorData.$inferSelect;
export type SensorGet = Omit<typeof schema.sensor.$inferSelect, 'apiKey'>;
