# Project Memory: Global Guidelines Consultancy Platform

## 1. Client & Business Overview
- **Client**: Global Guidelines Consultancy and Visa Services Pvt. Ltd.
- **Core Operations**: Overseas education counseling, university admissions, student visa processing, and standardized test preparation (IELTS, PTE, TOEFL, SAT, GRE, GMAT).
- **Offices**:
  - **Head Office**: Putalisadak / Bagbazar, Kathmandu, Nepal (`01-4525327`, `+977-970-2709933`)
  - **Branch Office**: Link Road, Birgunj, Nepal
- **Official Government Approvals & Accreditations**:
  - **MOEST Approval No**: 1459 (Ministry of Education, Science and Technology, Government of Nepal)
  - **Company Registration No**: 168812/73/074
- **Official Social Channels**:
  - Instagram: https://www.instagram.com/globalguidelines/
  - Facebook: https://www.facebook.com/globalguidelinesnepal
  - TikTok: @globalguidelines

---

## 2. Technical Stack & Environment
- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with custom brand palette, Lucide React icons
- **Database & ORM**: SQLite (`prisma/dev.db`) managed via Prisma ORM (`prisma/schema.prisma`)
- **Authentication**: NextAuth.js (Credentials Provider with bcrypt passwords)
- **Default CMS Admin**:
  - Email: `admin@globalguidelines.com`
  - Password: `admin123`
- **Server Ports & Tunneling**:
  - Local Port: `http://localhost:3000`
  - External ngrok Live Tunnel: active on port 3000
- **File Uploads**: `/api/upload` endpoint writing to `public/uploads/`

---

## 3. Brand Identity & Design System
- **Color Palette**:
  - Primary Navy: `#0F2C59` (Trust, Authority, Institutional standard)
  - Brand Red: `#E53935` / `#DC2626` (Action, Urgency, National flag accent)
  - Warm Gold: `#F59E0B` (Excellence, Accreditations, Ratings)
  - Clean Background: `#F8FAFC`
- **Navigation Rules**:
  - Brand logo links to `/`.
  - "Home" link was explicitly removed from the public navbar.
- **Google Stitch Workflow**:
  - The client will perform final visual polish using **Google Stitch** at the very end. Keep layouts clean, semantic, dynamic, and compatible.

---

## 4. Platform Architecture & Key Routes
### Public Pages:
- `/` - Homepage featuring authentic social gallery (`public/social/`), student visa ticker, MOEST approval badge, and study destination matrix.
- `/about` - About Global Guidelines, mission, MOEST accreditation, leadership & counselor team.
- `/services` & `/services/[slug]` - Study destinations (UK, USA, Australia, Canada, Europe) and test preparation services.
- `/case-studies` & `/case-studies/[slug]` - Visa grant stories and student admission milestones.
- `/resources` - Downloadable visa document checklists, toolkits, and university guides.
- `/insights` & `/insights/[slug]` - Dynamic visa updates, embassy policy changes, and educational blogs.
- `/contact` - Interactive consultation booking form routing to CMS Inquiries.

### CMS Studio (`/dashboard/*`):
- `/dashboard` - Executive stats (inquiries, articles, services, case studies) and recent lead feeds.
- `/dashboard/articles` - Mobile card view + desktop table, rich TipTap editor with image support.
- `/dashboard/services` - Study track and service manager with CRUD operations.
- `/dashboard/case-studies` - Visa success story manager with outcome metrics.
- `/dashboard/resources` - Student downloadables and guide manager.
- `/dashboard/testimonials` - Student review and rating manager.
- `/dashboard/team` - Counselor directory with direct one-click image upload.
- `/dashboard/inquiries` - Master-detail student leads manager with responsive mobile drill-down.
- `/dashboard/media` - Asset manager with copyable URLs for uploaded files.

---

## 5. Mobile & Responsive Design Rules
- All CMS dashboards are wrapped in `components/admin/DashboardShell.tsx` which provides:
  - Slide-over off-canvas navigation drawer with backdrop blur on `<1024px` screens.
  - Hamburger toggle header with user profile badge.
  - Automatic drawer close on route selection.
- All modals must include `max-h-[90vh] overflow-y-auto` and use `grid-cols-1 sm:grid-cols-2` to prevent modal boundary clipping on mobile.
- Inquiries CRM uses responsive master-detail navigation (`mobileView: "list" | "detail"`) with a clear back button on small screens.
- Tables have responsive mobile card views (`md:hidden`) for optimal touch usability.

---

## 6. Development Precautions
- **Never run `next build` concurrently while `next dev` is running**, as it overwrites `.next` webpack manifests and causes temporary chunk 404s.
- Always use `revalidatePath` inside server actions when mutating data.
- Ensure database paths and asset upload paths remain within the project tree.
