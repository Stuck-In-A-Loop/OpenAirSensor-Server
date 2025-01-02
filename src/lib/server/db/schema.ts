import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar, text, doublePrecision } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.helpers';

export const sensor = pgTable('sensor', {
	apiKey: varchar('api_key', { length: 100 }).notNull().unique(),
	description: text(),
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	...timestamps
});

export const sensorRelations = relations(sensor, ({ many }) => ({
	sensorData: many(sensorData)
}));

export const sensorData = pgTable('sensor_data', {
	gpsAltitude: doublePrecision('gps_altitude'),
	gpsLatitude: doublePrecision('gps_latitude'),
	gpsLongitude: doublePrecision('gps_longitude'),
	humidityPercent: doublePrecision('humidity_percent').notNull(),
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	pm10: doublePrecision(),
	pm25: doublePrecision(),
	sensorId: integer('sensor_id')
		.notNull()
		.references(() => sensor.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	temperatureCelsius: doublePrecision('temperature_celsius').notNull(),
	...timestamps
});

export const sensorDataRelations = relations(sensorData, ({ one }) => ({
	sensor: one(sensor, {
		fields: [sensorData.sensorId],
		references: [sensor.id]
	})
}));
