import { env } from '$env/dynamic/private';
import { createInsertSchema } from 'drizzle-zod';
import { drizzle } from 'drizzle-orm/node-postgres';

import * as schema from './db/schema';

export const db = drizzle(env.DATABASE_URL!, { schema });
export { schema };

export const sensorInsert = createInsertSchema(schema.sensor, {
	apiKey: (schema) => schema.min(10).optional(),
	description: (schema) => schema.min(10).optional(),
	name: (schema) => schema.min(6).max(100).default('Hello world!')
});
export const sensorDataInsert = createInsertSchema(schema.sensorData, {
	sensorId: (schema) => schema.optional()
});
