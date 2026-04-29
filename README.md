# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Location Lookup

Property geocoding and nearby listing filters use the app endpoint at `/api/geocode`, which proxies Nominatim search server-side. Configure these optional environment variables in deployment:

```bash
NOMINATIM_BASE_URL=https://nominatim.openstreetmap.org
NOMINATIM_USER_AGENT="REI Immobiliare/1.0 (contact@example.com)"
NOMINATIM_EMAIL=contact@example.com
```

The public Nominatim service requires identifying requests, caching, a maximum of one upstream request per second, and the ability to switch providers. Browser code should keep calling `/api/geocode`, not `nominatim.openstreetmap.org` directly.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
