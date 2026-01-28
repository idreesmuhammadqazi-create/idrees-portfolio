1→# AGENTS.md
2→
3→## Setup
4→```bash
5→npm install
6→```
7→
8→## Commands
9→- **Build**: `npm run build`
10→- **Lint**: `npm run lint`
11→- **Test**: No test suite configured
12→- **Dev Server**: `npm run dev`
13→
14→## Tech Stack
15→- **Framework**: Next.js 14 (App Router)
16→- **Language**: TypeScript with strict mode
17→- **Styling**: Tailwind CSS + PostCSS
18→- **UI**: React 18, Framer Motion, Lucide Icons
19→- **Utilities**: clsx, tailwind-merge, class-variance-authority
20→
21→## Architecture
22→- App Router structure (`app/` directory with route-based folders)
23→- Reusable UI components in `components/ui/`
24→- Feature components in `components/`
25→- Path aliases: `@/*` maps to project root
26→
27→## Code Style
28→- Use `'use client'` directive for client components
29→- Functional components with TypeScript
30→- Tailwind for styling (no CSS modules)
31→- Next.js Image and Link components for optimization
32→