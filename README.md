# Rox & Nex

Production-ready Next.js foundation for a wholesale sports products showcase.

## Stack

- Next.js 16.3.3 with App Router
- TypeScript
- Tailwind CSS 4
- MongoDB with Mongoose
- Server Components by default
- Client Components only for interactive theme switching

## Environment

Copy `.env.example` and provide real values when available:

```bash
MONGODB_URI=
NEXT_PUBLIC_SITE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Do not commit real credentials.

## Architecture

- `app` contains routes, layout, loading, error, not-found, and route handlers.
- `components` contains reusable UI, layout, theme, and product presentation components.
- `constants` defines the two product divisions: Rox Fitness and Nex Games.
- `lib` contains shared configuration, fonts, and MongoDB connection logic.
- `models` contains Mongoose schemas.
- `services` contains server-only business/data access logic.
- `types` contains shared TypeScript domain types.
- `hooks` contains client-only React hooks.
- `utilities` contains small framework-independent helpers.

## Development

Run the development server:

```bash
npm run dev
```

Run checks:

```bash
npm run lint
npm run build
```

## Product Divisions

Rox & Nex supports two wholesale catalog divisions:

- Rox Fitness: fitness and exercise-related products
- Nex Games: board games, indoor games, sports games, and related products

Checkout, cart, payment processing, order management, and customer authentication are intentionally not included at this stage.
