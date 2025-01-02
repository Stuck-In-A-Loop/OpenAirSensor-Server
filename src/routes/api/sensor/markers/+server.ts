import { sensorForMarkers } from '$lib/server/sensorCrud';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const markers = await sensorForMarkers();

	return new Response(JSON.stringify(markers), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
