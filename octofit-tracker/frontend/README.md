# Octofit Tracker presentation tier

The React 19 + Vite frontend calls the Express API on port `8000`.

## API URL configuration

For production builds, or when the frontend is not served from the standard
Codespaces forwarded frontend URL, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local` so Vite can construct the forwarded API
URL:

```dotenv
VITE_CODESPACE_NAME=opulent-funicular-7vp7pvp4469p3p947
```

Use the name of the active Codespace. In Codespaces, the app automatically
derives the API hostname from the standard `-5173.app.github.dev` frontend URL
when this variable is unset. Vite environment variables are embedded when the
development server starts or the app is built, so restart Vite after changing
`.env.local`. When accessed on localhost and the variable is unset, the
frontend uses `http://localhost:8000`.

Port `8000` must be publicly forwarded for browser requests from the frontend.
The repository's Dev Container configuration sets the API port visibility to
public.

## Run locally

```bash
npm run dev
```

The app uses React Router paths for users, teams, activities, leaderboard, and
workouts. Collection pages accept either array responses or paginated API
responses with a `results`, `items`, or `data` array.
