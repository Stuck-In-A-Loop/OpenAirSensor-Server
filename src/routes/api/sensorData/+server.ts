import type { RequestState } from '$lib/types/datatables';

import logger from '$lib/logger';
import { error } from '@sveltejs/kit';
import { sensorDataInsert, db } from '$lib/server/db';
import { sensorDataList, sensorDataCreate } from '$lib/server/sensorDataCrud';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const limit = parseInt(url.searchParams.get('limit') ?? '10');
	const offset = parseInt(url.searchParams.get('offset') ?? '0');
	const query = url.searchParams.get('q') ?? '';
	const sort = url.searchParams.get('sort') ?? 'id';
	const direction = url.searchParams.get('order') === 'asc' ? 'asc' : 'desc';

	const state: RequestState = {
		offset: offset,
		rowsPerPage: limit,
		search: query,
		sort: {
			direction,
			field: sort
		}
	};

	const sensors = await sensorDataList(state);

	return new Response(JSON.stringify(sensors), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const authHeader = request.headers.get('Authorization');
	if (!authHeader?.startsWith('Bearer ')) {
		error(401, 'Unauthorized');
	}
	const sensorApiKey = authHeader.substring(7);
	let sensorData;
	try {
		sensorData = sensorDataInsert.parse(await request.json());
	} catch (e) {
		logger.error(e);
		error(400, `Invalid data: ${JSON.stringify(e)}`);
	}

	const sensor = await db.query.sensor.findFirst({
		where: (sensor, { eq }) => eq(sensor.apiKey, sensorApiKey)
	});

	if (!sensor) {
		error(404, 'Sensor not found');
	}

	return new Response(JSON.stringify(await sensorDataCreate(sensor, sensorData)), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
