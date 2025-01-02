# OpenAirSensor Server

Simple project for a dashboard and api for a weather and air quality server, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

This project is also meant to test diverse technologies and tools, such as:

- [SvelteKit](https://kit.svelte.dev/)
- [Svelte 5](https://svelte.dev/)
- [pnpm](https://pnpm.io/)
- [Vite](https://vitejs.dev/)
- [Skeleton UI](https://www.skeleton.dev/)
- [Github Actions](https://github.com/features/actions)
- [Github Container Registry](https://ghcr.io/)
- [CodeQL](https://securitylab.github.com/tools/codeql)
- [Dependabot](https://github.com/dependabot)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

## Distributing

The project exists as:

- Docker Image in Github Container Registry: [ghcr.io/stuck-in-a-loop/openairsensor-server](https://ghcr.io/stuck-in-a-loop/openairsensor-server)
