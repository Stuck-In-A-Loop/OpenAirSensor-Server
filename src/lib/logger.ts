import pino from 'pino';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';

const logger = pino({
	level: env.PUBLIC_LOG_LEVEL ?? 'info',
	transport:
		dev && env.PUBLIC_LOG_PRETTY
			? {
					options: { colorize: true },
					target: 'pino-pretty'
				}
			: undefined
});

export default logger;
