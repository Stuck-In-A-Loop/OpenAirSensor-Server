import type { RequestState } from '$lib/types/datatables';

import { sensorList } from '$lib/server/sensorCrud';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const limit = parseInt(url.searchParams.get('limit') ?? '10');
	const offset = parseInt(url.searchParams.get('offset') ?? '0');
	const query = url.searchParams.get('q') ?? '';
	const sort = url.searchParams.get('sort') ?? 'id';
	const direction = url.searchParams.get('order') === 'desc' ? 'desc' : 'asc';

	const state: RequestState = {
		offset: offset,
		rowsPerPage: limit,
		search: query,
		sort: {
			direction,
			field: sort
		}
	};

	const sensors = await sensorList(state);

	return new Response(JSON.stringify(sensors), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
