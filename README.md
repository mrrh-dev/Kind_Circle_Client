# KindCircle

**Show up. Give back. Together.**
KindCircle is a community platform where neighbours create, join and track social service events such as winter clothes drives, tree plantations and food distribution.

**Live site:** https://kindcircle-ashen.vercel.app

## Features

- **Email + password and Google login** with BetterAuth and the MongoDB adapter, with the password rules (uppercase, lowercase, 6+ characters) checked on every form
- **Create events** with title, description, type, thumbnail link, location and a future-only date and time
- **Upcoming events** page that lists only events that have not happened yet, with search and filter by event type
- **Join an event** in one click. Each join is saved with the event and the person, and nobody can join twice
- **Private dashboards**: Manage Events (edit and delete only your own events) and Joined Events (sorted by date)
- **JWT-protected API**: the Express server verifies every private request with the public keys from BetterAuth
- **Dark and light theme** toggle, loading skeletons, a profile update page, and a fully responsive layout

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · BetterAuth · MongoDB · Express

## Run it locally

```bash
npm install
cp .env  # then fill in the values
npm run dev                  # http://localhost:3000
```

The API lives in the separate `Kind_Circle-Server` repository.
