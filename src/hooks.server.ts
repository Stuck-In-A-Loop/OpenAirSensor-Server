import type { ServerInit } from '@sveltejs/kit';

import logger from '$lib/logger';
import { db } from '$lib/server/db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

export const init: ServerInit = async () => {
	logger.info('Running migrations...');
	await migrate(db, {
		migrationsFolder: 'drizzle',
		migrationsSchema: 'public',
		migrationsTable: 'drizzle_migrations'
	});
	logger.info('Migrations complete.');
};

export async function handle({ event, resolve }) {
	logger.debug(
		{
			method: event.request.method,
			timestamp: Date.now(),
			url: `${event.url.pathname}?${event.url.searchParams}`
		},
		'Incoming request'
	);

	const response = await resolve(event);

	logger.info(
		{
			method: event.request.method,
			status: response.status,
			timestamp: Date.now(),
			url: `${event.url.pathname}?${event.url.searchParams}`
		},
		'Request completed'
	);

	return response;
}
