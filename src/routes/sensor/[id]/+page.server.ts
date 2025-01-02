import { error } from '@sveltejs/kit';
import { sensorGet } from '$lib/server/sensorCrud';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const sensor = await sensorGet(parseInt(id));

	if (sensor) {
		return sensor;
	}

	error(404, 'Not found');
};
