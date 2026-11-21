# Project Memory: Global Guidelines Consultancy Platform

## 1. Client & Business Overview
- **Client**: Global Guidelines Consultancy and Visa Services Pvt. Ltd.
- **Core Operations**: Overseas education counseling, university admissions, student visa processing, and standardized test preparation (IELTS, PTE, TOEFL, SAT, GRE, GMAT).
- **Offices**:
  - **Head Office**: Brihaspati Sadan (3rd Floor), Putalisadak / Bagbazar, Kathmandu, Nepal (`01-4525327`, `+977-970-2709933`)
  - **Branch Office**: Link Road, Birgunj, Nepal
- **Official Government Approvals & Accreditations**:
  - **MOEST Approval No**: 1459 (Ministry of Education, Science and Technology, Government of Nepal)
  - **Company Registration No**: 168812/73/074
- **Official Social Channels**:
  - Instagram: https://www.instagram.com/globalguidelines/
  - Facebook: https://www.facebook.com/globalguidelinesnepal
  - TikTok: @globalguidelines

---

## 2. Technical Stack & Live Production Deployments
- **Framework**: Next.js 14/15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with custom brand palette, Lucide React icons
- **3D Graphics Engine**: Three.js with GLTF Loader for procedural runway, commercial airliner, and orbital earth
- **Database & ORM**: SQLite (`prisma/dev.db`) managed via Prisma ORM (`prisma/schema.prisma`)
- **Authentication**: NextAuth.js (Credentials Provider with bcrypt passwords, JWT session)
- **Default CMS Admin**:
  - Email: `admin@globalguidelines.com`
  - Password: `admin123`
- **Git Repository**:
  - Remote: `https://github.com/manjul10/global-guidelines-consultancy.git`
  - Active Branches: `master` (synchronized to `main`)
  - Latest Commit: `a0a404f` - `style(theme): site-wide brand alignment, Royal Navy theme unification, and security headers hardening`
- **Live Vercel Production Deployments**:
  - Primary Production URL: [https://global-guidelines.vercel.app/](https://global-guidelines.vercel.app/)
  - Secondary Production URL: [https://global-guidelines-consultancy.vercel.app/](https://global-guidelines-consultancy.vercel.app/)
  - Direct Deployment: `https://global-guidelines-consultancy-kf774wuhw.vercel.app`
- **Local Server**:
  - `http://localhost:3000` via `npm run dev`

---

## 3. Brand Identity & Design System
- **Color Palette**:
  - **Signature Royal Navy**: `#0F2C59` (Authority, Trust, Prestige, Table headers, Featured cards)
  - **Authentic Nepal Red**: `#E53935` / `#DC2626` (Primary action CTA buttons, key kickers, accents)
  - **Warm Gold / Amber**: `#F59E0B` (Accreditations, verified ratings, badges)
  - **Clean Backgrounds**: Clean White (`#FFFFFF`) and Light Slate (`#F8FAFC` / `slate-50`) with subtle borders (`border-slate-200/90`)
  - **Dark Navy Accents**: Strictly Deep Royal Navy (`#0F2C59` / `bg-brand-navy-950`). **No pitch-black `#0b1320` or `#000000` or terminal cyberpunk monospace styles with neon colors.**
- **Logos**:
  - Light Backgrounds (Navbar, Login card): `/logo-emblem.png` with crisp Royal Navy & Nepal Red typography (no blurry duplicate subtext underneath).
  - Dark Navy Backgrounds (Footer, Admin Sidebar): `/logo-emblem-light.png` seamlessly integrated without any white square box.
  - The duplicate `#1459` tag next to the header title was explicitly removed per client preference.
- **Document Upload Links**:
  - Strictly confined to the dedicated [`/upload`](/upload) route. Removed from top ticker and general marketing banners to maintain a clean student inquiry funnel.

---

## 4. 3D Hero Takeoff Experience (`components/3d/HeroTakeoffExperience.tsx`)
- **Tribhuvan International Airport (KTM / VNKT) Runway**:
  - Procedural high-resolution asphalt surface with tire rubber touchdown skid marks.
  - PAPI 4-light array, green threshold light bar, elevated blue taxiway stanchions, and amber centerline beacons.
  - Realistic ground contact shadow beneath aircraft wheels to eliminate floating look.
- **Authentic Nepal Airlines Jetliner Livery**:
  - High-poly commercial airliner mapped with Nepal Airlines livery:
    - Pure white fuselage with authentic red and blue cheating lines.
    - Nepal Red vertical stabilizer with the white sun & moon emblem.
    - Blue engine cowlings.
- **Orbital Flight Dynamics & Globe**:
  - Unified single-canvas takeoff progression controlled smoothly by scroll or mousewheel:
    - **Stage 1 (0 -> 25%)**: Runway roll and acceleration.
    - **Stage 2 (25 -> 60%)**: Aerodynamic rotation, wheel lift-off, and climbing turn with golden contrail ribbons.
    - **Stage 3 (60 -> 100%)**: Seamless transition into satellite orbit around the NASA Blue Marble Earth.
  - **Anti-Penetration Guard**: Distance clamp calculation strictly enforces minimum clearance altitude above atmosphere (4.55 units) and clouds (4.25 units), eliminating any clipping inside the globe.
  - **Clean Earth**: Realistic Rayleigh atmospheric scattering shader; zero flight arrows, dotted arcs, or clutter on the globe surface.
- **User Prompts**:
  - Top Radar: Clean bold sans text (`IN ORBIT: KATHMANDU (KTM) ➔ {DEST}`).
  - Bottom Prompt: Frosted Brand Royal Navy pill (`bg-brand-navy-950/85`) with red airplane icon and clean text: `Scroll Down`.

---

## 5. Security & Defensive Engineering Hardening
1. **HTTP Response Security Headers** ([next.config.mjs](next.config.mjs)):
   - `X-Frame-Options: SAMEORIGIN` (prevents clickjacking attacks)
   - `X-Content-Type-Options: nosniff` (mitigates MIME-confusion attacks)
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
2. **Access Control & Server Actions**:
   - All server actions in `app/actions/*.ts` verify `const session = await getServerSession(authOptions)` before executing database mutations.
   - All `/dashboard/:path*` routes protected via JWT inspection in [`middleware.ts`](middleware.ts).
3. **Student Document Upload Security** ([app/api/student-documents/route.ts](app/api/student-documents/route.ts)):
   - In-memory sliding-window IP rate limiting (max 8 submissions per 10 minutes).
   - Strict extension whitelist (`.pdf`, `.jpg`, `.jpeg`, `.png`, `.webp`, `.doc`, `.docx`).
   - Magic byte signature verification (`%PDF-`, `0xFF 0xD8 0xFF`, `0x89 P N G`, `RIFF WEBP`, `PK\x03\x04`, `0xD0 0xCF 0x11 0xE0`).
   - Cryptographic random token filenames (`crypto.randomBytes`) preventing directory traversal or file overwrites.
4. **Input Sanitization**:
   - Public inquiry submissions validated with strict Zod schemas; database operations parameterized via Prisma ORM (zero SQL injection surface).

---

## 6. Page Inventory & Theme Status
- `/` - Clean white stats card (`MOEST #1459`), academic IELTS/PTE showcase card with Royal Navy registration container, destination visa rates, interactive 3D hero.
- `/study-abroad` - Comparison tables with Royal Navy `#0F2C59` headers, clean sans cost cells, 6-step visa roadmap, bottom counseling banner.
- `/contact` - Comprehensive head office & branch directory, consultation booking form.
- `/upload` - Dedicated student portal for uploading academic transcripts and passports with tracking reference IDs (`GG-DOC-XXXXX`).
- `/insights` & `/insights/[slug]` - Visa policy changes and education blogs with Brand Royal Navy CTA cards.
- `/services` & `/services/[slug]` - Program catalogs and test preparation curriculum.
- `/case-studies` & `/case-studies/[slug]` - Real student visa success stories.
- `/team` - Leadership and certified counselor profiles.
- `/login` - Clean white authentication card over Royal Navy gradient backdrop.
- `/dashboard/*` - Responsive CMS studio with mobile off-canvas drawer and `logo-emblem-light.png` branding.

---

## 7. Developer Guidelines & Important Commands
- **Never run `next build` concurrently while `next dev` is running** (prevents `.next` build manifest conflicts).
- **Restarting Dev Server**:
  ```bash
  cd /home/crazzy/projects/consultancy-platform
  npm run dev
  ```
- **Typecheck & Production Build**:
  ```bash
  cd /home/crazzy/projects/consultancy-platform
  npx tsc --noEmit
  npm run build
  ```
- **Deploying to Vercel Production**:
  ```bash
  cd /home/crazzy/projects/consultancy-platform
  mise exec node@25.9.0 -- vercel --prod --yes
  mise exec node@25.9.0 -- vercel alias set <deployment-url> global-guidelines.vercel.app
  mise exec node@25.9.0 -- vercel alias set <deployment-url> global-guidelines-consultancy.vercel.app
  ```
- **Pushing to Git**:
  ```bash
  cd /home/crazzy/projects/consultancy-platform
  git push origin master && git push origin master:main
  ```
