import type { RequestState } from '$lib/types/datatables';

import { like, or } from 'drizzle-orm';

import { db, schema } from '../db';

export const sensorList = async (state: RequestState) => {
	const { offset, rowsPerPage, search, sort } = state;

	const sensors = await db.query.sensor.findMany({
		columns: {
			apiKey: false
		},
		limit: rowsPerPage,
		offset,
		orderBy: (sensors, { asc, desc }) => {
			const field: keyof typeof sensors = sort?.field ?? 'id';
			if (field in sensors) {
				return sort?.direction === 'asc' ? asc(sensors[field]) : desc(sensors[field]);
			} else {
				return sort?.direction === 'asc' ? asc(sensors.id) : desc(sensors.id);
			}
		},
		where: (sensors, { like, or }) =>
			or(like(sensors.name, `%${search}%`), like(sensors.description, `%${search}%`))
	});

	const total = await db.$count(
		schema.sensor,
		or(like(schema.sensor.name, `%${search}%`), like(schema.sensor.description, `%${search}%`))
	);

	return { sensors, total };
};
