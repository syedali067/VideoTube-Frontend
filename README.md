# VideoTube Frontend

A full-featured, YouTube-inspired video platform frontend, built with **Next.js (App Router)** on top of a fully-implemented [VideoTube Express backend](https://github.com/syedali067/backend). Covers video browsing and playback, search, authentication, uploading, channel management, subscriptions, playlists, comments, likes, and a mini tweet feed — all fully responsive and built mobile-first.

## Features

- 🔐 **Authentication** — register (with avatar/cover upload), login, logout, protected routes
- 🎬 **Video** — browse, search, watch, upload, edit, delete, publish/unpublish
- 💬 **Comments** — add, edit, delete on any video
- ❤️ **Likes** — toggle likes on videos, comments, and tweets
- 🔔 **Subscriptions** — subscribe/unsubscribe to channels, live subscriber counts
- 📃 **Playlists** — create, edit, delete, add/remove videos
- 🐦 **Tweets** — a lightweight Twitter-style feed tied to your channel
- 📊 **Dashboard** — channel stats (total videos, views, subscribers, likes)
- 📺 **Channel profiles** — public channel pages with videos, playlists, and tweets
- 🕘 **Watch history**
- 📱 **Fully responsive** — mobile-first throughout, tested at mobile/tablet/desktop widths

## Tech Stack

- **Framework:** Next.js (App Router), mixed Server + Client Components
- **Styling:** Tailwind CSS v4 (`@theme`-based tokens, no separate config file)
- **Design system:** "Midnight Ledger" — dark canvas, emerald-teal gradient primary actions, gold accent for highlight numbers, Fraunces (headings) + Inter (body) + IBM Plex Mono (numeric/timestamps)
- **Global client state:** Zustand (auth/user state, toasts, UI state)
- **Server data caching:** Next.js built-in `fetch` caching (`revalidate` / `no-store`) for Server Components
- **Client-side data fetching/caching:** TanStack Query (comments, likes, dashboard stats, playlists, tweets)
- **Route protection:** Next.js middleware (cookie-presence check) backed by the Express API's own JWT verification as the real security boundary

## Architecture Notes

- **Rendering strategy:** Public pages (Landing, Feed, Watch, Channel Profile, Search) are Server Components that fetch data directly from the Express API at render time — fast initial loads, good SEO, no loading spinners. Interactive and authenticated pieces (like/comment/subscribe buttons, dashboard, upload, settings, playlists, tweets) are Client Components that call the API directly from the browser with `credentials: "include"` so the backend's httpOnly cookies are sent automatically.
- **Auth:** No token handling in the frontend beyond forwarding cookies — the Express backend issues and validates all JWTs. An `AuthProvider` component checks `/users/current-user` once on app load to restore login state after a page refresh (Zustand alone doesn't persist across reloads). Route protection is enforced twice: a lightweight `middleware.js` cookie-presence check for fast UX redirects, and the backend's `verifyJWT` as the actual security boundary.
- **Caching strategy:** Server Components use Next.js's native fetch cache (short revalidation windows for listing pages, `no-store` for anything that must always be fresh, like a video's view count). Client Components use TanStack Query for automatic caching, loading/error states, and targeted refetching (e.g. comments refresh after posting, without reloading the whole page).
- **Responsive:** Built mobile-first throughout — every layout starts as a single column and expands at `sm:`/`md:`/`lg:` breakpoints, verified at each phase rather than retrofitted at the end.

## Project Structure

```
app/
├── page.js                          → / (Landing)
├── feed/page.js                     → /feed
├── search/page.js                   → /search
├── login/page.js                    → /login
├── register/page.js                 → /register
├── watch/[videoId]/page.js          → /watch/:id
├── channel/[username]/page.js       → /channel/:username
├── dashboard/page.js                → /dashboard
├── upload/page.js                   → /upload
├── settings/page.js                 → /settings
├── settings/password/page.js        → /settings/password
├── my-videos/page.js                → /my-videos
├── playlists/page.js                → /playlists
├── playlists/[playlistId]/page.js   → /playlists/:id
├── history/page.js                  → /history
├── tweets/page.js                   → /tweets
├── layout.js                        → root layout (fonts, providers, navbar)
├── error.js                         → global error boundary
└── */loading.js                     → route-level loading skeletons
components/
├── ui/                              → Button, Input, Avatar, Card, Modal, Skeleton
├── VideoCard.jsx, ManageVideoCard.jsx
├── LikeButton.jsx, SubscribeButton.jsx, SaveToPlaylistButton.jsx
├── CommentSection.jsx, Navbar.jsx, AuthProvider.jsx, QueryProvider.jsx, ToastContainer.jsx
store/
├── authStore.js                    → Zustand: current user / logged-in state
├── toastStore.js                   → Zustand: toast notifications
lib/
├── api.js                           → fetch wrapper (cookies, JSON, file uploads, error shaping)
middleware.js                        → route protection (cookie-presence redirect)
```

## Getting Started

### Prerequisites

- Node.js v18.18+
- The [VideoTube backend](https://github.com/syedali067/backend) running locally or deployed

### Installation

```bash
git clone <this-repo-url>
cd videotube-frontend
npm install
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

Point this at your backend's URL (local or deployed). Must be `NEXT_PUBLIC_`-prefixed since it's read in both Server and Client Components.

### Running Locally

```bash
npm run dev
```

Runs on `http://localhost:3000`. The backend must be running separately (on `localhost:8000` by default) for any data to load.

## Deployment

- **Frontend:** Deployed on Vercel — `NEXT_PUBLIC_API_URL` set to the deployed backend's URL.
- **Backend:** Deployed separately (Railway/Render) — `CORS_ORIGIN` set to this frontend's deployed URL (not `*`), with cookies configured using `sameSite: "none"` + `secure: true` in production so cross-domain auth works correctly.

**Live demo:** *add your deployed URL here*

## Related

- Backend repo & full API reference: [syedali067/backend](https://github.com/syedali067/backend)

## Author

**Muhammad Ali Shah**
- GitHub: [@syedali067](https://github.com/syedali067)
- LinkedIn: [muhammad-ali-mern067](https://linkedin.com/in/muhammad-ali-mern067)
