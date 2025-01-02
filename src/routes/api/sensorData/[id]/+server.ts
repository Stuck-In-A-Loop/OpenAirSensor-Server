import type { RequestState } from '$lib/types/datatables';

import { sensorDataGetForSensor } from '$lib/server/sensorDataCrud';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
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

	const { id } = params;

	const fetchedSensorData = await sensorDataGetForSensor(state, parseInt(id));

	return new Response(JSON.stringify(fetchedSensorData), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
