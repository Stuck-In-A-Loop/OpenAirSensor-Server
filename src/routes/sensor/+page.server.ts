import logger from '$lib/logger.js';
import { sensorInsert } from '$lib/server/db.js';
import { zod } from 'sveltekit-superforms/adapters';
import { sensorCreate } from '$lib/server/sensorCrud';
import { message, superValidate, fail, setError } from 'sveltekit-superforms';

export const load = async () => {
	const form = await superValidate(zod(sensorInsert));

	// Always return { form } in load functions
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(sensorInsert));
		logger.debug(form);

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		const sensor = await sensorCreate(form.data.name, form.data.description);

		if (!sensor) {
			// Display an error status message
			return setError(form, 'name', 'A sensor with this name already exists');
		}

		// Display a success status message
		return message(form,  sensor.apiKey);
	}
};
