
# Port `patagoniainmersiva-v1` → TanStack Start + Lovable Cloud

Goal: full 1:1 port of the existing site (landing with Services / Portfolio / Photo / Video / Testimonials / Blog / Contact, plus Pricing, Projects list, Project viewer) into this TanStack Start project, with Firebase replaced by Lovable Cloud (Supabase).

## What I'll do

### 1. Enable Lovable Cloud + data model
Enable Cloud, then create tables matching the current Firestore model:
- `profiles` (linked to `auth.users`) — display name, avatar
- `user_roles` (separate table, `app_role` enum: `admin` | `user`) — replaces the hardcoded admin email in `firestore.rules`
- `posts` — title, excerpt, content, category, image, author, created_at
- `comments` — post_id, uid, user_name, user_photo, text, created_at
- `projects` — title, location, category, panorama_url, description, order
- `contacts` — name, email, message, plan, subject, created_at
- `newsletter` — email, created_at
- RLS on all tables, mirroring `firestore.rules` (public read for posts/projects, public insert for contacts/newsletter, admin-only writes via `has_role(uid, 'admin')`)

### 2. Auth
- Email/password + Google sign-in (Google via Lovable broker, not raw Supabase OAuth)
- Replace `firebase/auth` `signInWithPopup(googleProvider)` calls in `Navbar` / `CommentSection`
- `onAuthStateChange` wired once in `__root.tsx`

### 3. Routing — TanStack file routes
Replace `react-router-dom` `<Routes>` in `App.tsx` with:
```
src/routes/__root.tsx        → Navbar + Outlet + Footer + ScrollToTop
src/routes/index.tsx         → Hero + Services + Portfolio + PhotoGallery + VideoGallery + Testimonials + Blog + Contact
src/routes/pricing.tsx       → /pricing
src/routes/projects.index.tsx → /projects
src/routes/projects.$id.tsx  → /projects/:id (Pannellum viewer)
```
Each route gets its own `head()` (title, description, og:*).
Hash anchors (`#servicios`, `#portfolio`, etc.) stay for in-page scrolling on `/`.

### 4. Components
Port all 13 components from `src/components/` 1:1, but:
- Replace `motion/react` import paths as-is (package is supported)
- Swap Firebase Firestore calls (`getDocs`, `addDoc`, `onSnapshot`) → Supabase queries via `createServerFn` (public reads use `supabaseAdmin`-scoped fns; user writes use `requireSupabaseAuth`)
- `ThreeSixtyViewer` (Pannellum): keep but render client-only — Pannellum touches `window`, so guard with a `useEffect` mount and avoid SSR execution
- `Contact`: keep EmailJS as a client-side call (it's the simplest path; switch to Lovable Email later if you prefer)
- `CommentSection`: rewrite the Firestore subcollection logic against the new `comments` table

### 5. AI feature (`@google/genai`)
Move the Gemini call out of the browser into a `createServerFn` that calls the **Lovable AI Gateway** (no API key handling on your end). The component calls it via `useServerFn`.

### 6. Styling
- Tailwind v4 is already configured here via `src/styles.css`
- Port the project's design tokens (fonts: Geist via `@fontsource-variable/geist`, dark theme, brand colors) into `src/styles.css` as semantic tokens
- Install missing deps: `motion`, `pannellum`, `@emailjs/browser`, `@fontsource-variable/geist`, `lucide-react`, `react-markdown`, `class-variance-authority`, `clsx`, `tailwind-merge`

### 7. Assets (needs your input — see Open question)
The repo has ~80 MB of images in `/public/`, including ten 5–7 MB 360° panoramas. Plan:
- Small UI assets (logo, hero, gallery thumbnails ≤ 500 KB): copy into `src/assets/` and import
- Large 360° panoramas + large photos: upload to a Lovable Cloud Storage bucket (`project-panoramas`) and reference by public URL from the `projects` table

### 8. Drop
- `firebase`, `firebase-applet-config.json`, `firebase-blueprint.json`, `firestore.rules`
- `express` (unused in TanStack Start)
- `react-router-dom`
- `App.tsx`, `main.tsx`, `index.html` (TanStack Start owns these)

## Technical notes
- Server runtime is Cloudflare Workers (workerd). All Firebase calls move to either browser Supabase client or `createServerFn` with `supabaseAdmin` / `requireSupabaseAuth`
- Pannellum is browser-only — never import at module top level in a route; lazy-load inside `useEffect`
- Hardcoded admin email (`kevin.perelman@gmail.com`) becomes a row in `user_roles` after first signup
- Build secrets needed: none (Lovable AI Gateway uses `LOVABLE_API_KEY` auto-provisioned)
- Runtime secrets needed: `EMAILJS_PUBLIC_KEY` / `EMAILJS_SERVICE_ID` / `EMAILJS_TEMPLATE_ID` (or move to server-side via Lovable Email later)

## Open question before I start

**How do you want the 80 MB of images handled?** Three options:

1. **I scaffold everything except images; you upload assets** later via the file tree or Cloud Storage UI. Fastest start.
2. **Connect this Lovable project to a GitHub repo first**, then push the assets through git (bypasses upload limits). Slower start but cleanest.
3. **Skip the large 360° panoramas for now** — port the UI with the small `360LOW_*` thumbnails only; you wire real panoramas later.

Tell me which (1/2/3) and confirm everything else, and I'll switch to build mode and start.
