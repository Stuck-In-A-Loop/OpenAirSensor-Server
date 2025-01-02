import type { RequestState } from '$lib/types/datatables';

import { eq } from 'drizzle-orm';

import { db, schema } from '../db';

export const sensorDataGetForSensor = async (state: RequestState, id: number) => {
	if (isNaN(id)) {
		return { sensorsData: [], total: 0 };
	}
	const { offset, rowsPerPage, sort } = state;

	const sensorsData = await db.query.sensorData.findMany({
		limit: rowsPerPage,
		offset,
		orderBy: (sensorData, { asc, desc }) => {
			const field: keyof typeof sensorData = sort?.field ?? 'updatedAt';
			if (field in sensorData) {
				return sort?.direction === 'asc' ? asc(sensorData[field]) : desc(sensorData[field]);
			} else {
				return sort?.direction === 'asc' ? asc(sensorData.updatedAt) : desc(sensorData.updatedAt);
			}
		},
		where: (sensorData, { eq }) => eq(sensorData.sensorId, id)
	});

	const total = await db.$count(schema.sensorData, eq(schema.sensorData.sensorId, id));

	return { sensorsData, total };
};
