# AGENTS.md

KindCircle frontend (`kindcircle-client`): a Next.js 16 App Router app. The Express/MongoDB API is a separate `events-server` repository; this repo only contains the BetterAuth handler and UI. The README is partly stale: `SETUP.md` and `.env.example` are not present.

## Commands

- `npm install`
- `npm run dev` — loads `.env`, serves on http://localhost:3000
- `npx tsc --noEmit` — the only typecheck
- `npm run build` — production build; also runs TypeScript and route generation

There is no test, lint, formatter, or codegen setup. Do not assume `npm test`, `npm run lint`, or ESLint runs during builds.

## Environment

`lib/auth.ts` and `lib/api.ts` require these variables (already in the gitignored `.env`):

- `MONGODB_URI`, `AUTH_DB_NAME` (defaults to `kindcircle_auth`)
- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:5000`)

The API must be running to load event data or perform mutations. Never commit or echo the real credentials in `.env`.

## Architecture

- Routes live in `app/`; interactive screens are usually split into `components/*Client.tsx` with a thin server page for metadata.
- `lib/api.ts` is the only API client. Public reads use `cache: "no-store"`; authenticated calls pass `auth: true`, which dynamically imports browser-only `lib/token.ts` and attaches the BetterAuth JWT. Extend this client instead of adding ad-hoc `fetch` calls. API errors use `{ message, errors }` and become `ApiError` / `fieldErrors`.
- BetterAuth is configured in `lib/auth.ts`, exposed at `app/api/auth/[...all]/route.ts`, and used in the browser via `lib/auth-client.ts`. JWTs last 15 minutes; call `clearToken()` after logout or profile updates so the cached token is refreshed.
- Private pages use the client-side `components/PrivateRoute.tsx`; there is no middleware. Login redirects use `lib/redirect.ts` and must stay same-origin.
- Next 16 route `params` are Promises — await them (see `app/events/[id]/page.tsx`).
- Dates display in fixed `Asia/Dhaka` time (`lib/format.ts`), while `datetime-local` form values are interpreted in the browser's timezone.

## Conventions and gotchas

- Tailwind v4 is CSS-first: there is no `tailwind.config`. Design tokens and shared classes (`page-shell`, `surface-card`, `section-title`, `section-lead`, `section-eyebrow`) live in `app/globals.css`.
- `components/ui/*` are shadcn/ui primitives (new-york style). Reuse them; `button.tsx` adds custom `brand`, `destructive-outline`, and `success` variants.
- Event thumbnails are arbitrary user URLs rendered with a plain `<img>` in `components/EventImage.tsx` plus a local fallback. Do not switch to `next/image` without adding remote-image configuration.
- Event types are defined by `EVENT_TYPES` in `lib/constants.ts`. Changing them also requires matching updates in the separate Express API and its validation.
- Form validation lives in `lib/validation.ts`; the server duplicates those rules, so client changes must be mirrored there.
