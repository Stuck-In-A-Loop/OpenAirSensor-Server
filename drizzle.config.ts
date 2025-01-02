import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dbCredentials: {
		url: process.env.DATABASE_URL!
	},
	dialect: 'postgresql',
	migrations: {
		schema: 'public',
		table: 'drizzle_migrations'
	},
	out: './drizzle',
	schema: './src/lib/server/db/schema.ts'
});
