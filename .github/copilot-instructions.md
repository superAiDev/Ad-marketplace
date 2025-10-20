<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Copilot instructions for Ad-marketplace

Purpose: make AI agents immediately productive working on this Next.js + Supabase + Tailwind + Shadcn/ui PWA starter.

Keep guidance short and actionable. Prefer changing only files inside the `app/`, `src/`, and `lib/` folders. When suggesting code, follow these constraints:

- TypeScript only (strict mode). Use existing tsconfig conventions if present.
- Use Next.js App Router patterns (server components for data fetching when possible, client components for interactivity). Prefer React Server Components for page-level data fetching and Supabase Edge Functions for server-side operations.
- Styling: Tailwind CSS utilities and Shadcn/ui components. When suggesting UI, reference the Shadcn components by name (e.g., `Input`, `Select`, `Card`, `Tabs`, `Table`, `Badge`, `Progress`, `AlertDialog`) and include Tailwind classes for spacing/variants.
- Auth: use Supabase Auth. Server-side auth checks should rely on Supabase session retrieval in server components or on Edge Functions for protected routes.
- Database: assume PostgreSQL via Supabase. Prefer SQL functions for complex search/filters and use RLS policies for row-level permissions.

Project-specific patterns and examples to follow

- Pages and routing
  - Use Next.js App Router `app/` for routes. Example SEO-friendly ad detail path: `/services/[category]/[slug]` implemented as `app/services/[category]/[slug]/page.tsx` (server component) that fetches ad data by slug and category.

- Components and UI
  - Use shadcn/ui components initialized with `npx shadcn-ui@latest init` and Tailwind. When adding components, wrap Shadcn components with small local wrappers in `src/components/` to centralize props and Tailwind classes.
  - Search page: implement filters using `Select` (support multi-select), text `Input`, and `Button`. Render results in `Card` components with an image, short meta, and CTAs (contact/save).
  - Ad form: implement as a multi-step flow in `src/components/ad-form/` using client components for step state, and use drag-and-drop package only if already in deps; otherwise suggest a small, documented dependency (e.g., `react-dropzone`).

- Data fetching and caching
  - Use server components with revalidation headers (ISR) for frequently-read pages (search results, listing detail). For real-time or user-personalized data (saved ads, live counters), use Supabase Realtime or client-side fetch with SWR/React Query.

- Security and DB
  - Enforce Row Level Security (RLS) in Supabase. When generating queries, include comment reminders to add/verify RLS policies and to run migrations (SQL files under `supabase/migrations/` if present).

- Build, test and dev commands (if missing in repository, assume common defaults)
  - Dev server: `pnpm dev` or `npm run dev` (prefer `pnpm` if `pnpm-lock.yaml` present).
  - Build: `npm run build` then `npm run start` for production.
  - Supabase local: `supabase start` and `supabase stop` when using the CLI. Use env var file `.env.local` for keys; never print secrets in PRs.

When to open PRs vs edit in-place

- For small fixes (< 6 files, non-breaking) propose a single PR with clear description and tests where possible. For large changes (new feature, DB migrations) always create a feature branch, include migration SQL, and an upgrade path in the PR.

Examples of explicit tasks you can do immediately

- Add `app/services/[category]/[slug]/page.tsx` server component that:
  - fetches ad by slug via Supabase, returns 404 if not found, and adds structured data (JobPosting/Service schema) in the Head.
- Add `src/components/search/Filters.tsx` client component using `Select` and `Input` from shadcn/ui and emitting events to parent.
- Add `supabase/migrations/` SQL file that creates an `ads` table with RLS and a search function using full-text search indices.

What not to do

- Don't add runtime secrets to code or PR descriptions. Don't auto-commit `.env` files.
- Don't convert the repository to a different framework (e.g., Remix, CRA). Stick to Next.js App Router.

If anything is ambiguous, ask for the intended path under `app/` or whether `pnpm`/`yarn` is the package manager.

Please review and tell me if you want additional project-specific examples (e.g., exact SQL schema for `ads`, or specific Shadcn component props and Tailwind variants to use).
