import { relations } from 'drizzle-orm';
import { integer, pgTable, pgEnum, varchar, text, doublePrecision } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.helpers';

export const sensorStatusEnum = pgEnum('sensor_status', [
	'SENSOR_NORMAL',
	'SENSOR_ERROR_TEMPERATURE',
	'SENSOR_ERROR_HUMIDITY',
	'SENSOR_ERROR_PM2_5',
	'SENSOR_ERROR_PM10',
	'SENSOR_ERROR_GPS',
	'SENSOR_STOLEN'
]);

export const sensor = pgTable('sensor', {
	apiKey: varchar('api_key', { length: 100 }).notNull().unique(),
	description: text(),
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	status: sensorStatusEnum().notNull().default('SENSOR_NORMAL'),
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
	sensorStatus: sensorStatusEnum('sensor_status').notNull().default('SENSOR_NORMAL'),
	temperatureCelsius: doublePrecision('temperature_celsius').notNull(),
	...timestamps
});

export const sensorDataRelations = relations(sensorData, ({ one }) => ({
	sensor: one(sensor, {
		fields: [sensorData.sensorId],
		references: [sensor.id]
	})
}));
