# Design Specification: Consultancy Web Portal & Dynamic CMS (Phase 1)

**Date**: 2026-09-11  
**Status**: Approved (Brainstorming Phase Completed)  
**Author**: Antigravity & Engineering Team  
**Scope**: Phase 1 — Core Consultancy Portal & Dynamic Content Management System

---

## 1. Executive Summary & Goals

The objective of this project is to build a high-performance, conversion-oriented web platform for a professional consulting firm. The platform pairs a blazing-fast, SEO-optimized public website with a powerful, secure internal Content Management System (CMS) that allows consultants and administrators to dynamically author, publish, and update all marketing, thought leadership, case study, and resource materials in real time.

### Strategic Phasing Roadmap
* **Phase 1 (This Spec)**: Core Consultancy Web Portal & Dynamic Content CMS Studio (Articles, Services, Case Studies, Downloadable Resources, Testimonials, Team Bios, Contact/Lead Inbox, and Media Management).
* **Phase 2 (Future Extension)**: Consultation Booking & Scheduling Engine (Availability slots, appointment booking, calendar sync).
* **Phase 3 (Future Extension)**: E-Learning & Training Portal (Client courses, video/document modules, enrollment, and progress tracking).

---

## 2. Architecture & Technology Stack

The platform is designed as an **Integrated Modular Next.js Monolith** using the App Router.

### Tech Stack Choices
* **Framework**: Next.js 14+ (App Router, Server Components, Server Actions)
* **Language**: TypeScript (strict mode enabled across client and server)
* **Styling**: Tailwind CSS + Accessible UI components (shadcn/ui design language)
* **Icons**: Lucide React
* **Rich Text Editor**: TipTap (WYSIWYG Markdown & Rich Text blocks)
* **ORM & Database**: Prisma ORM with PostgreSQL
* **Authentication**: NextAuth.js (Auth.js v5) with credentials provider & bcrypt password hashing
* **Validation**: Zod (shared client-side and server-side schemas)
* **Testing**: Vitest for unit tests; Playwright for end-to-end regression tests

### Modular Directory Structure

```
consultancy-platform/
├── app/
│   ├── (public)/                 # Public marketing & content pages
│   │   ├── layout.tsx            # Public layout (Branded Nav, Sticky Header, Footer)
│   │   ├── page.tsx              # High-converting Homepage (Hero, Value Prop, Featured)
│   │   ├── services/             # Dynamic consulting offerings & detail views
│   │   ├── case-studies/         # Client success stories & metrics
│   │   ├── insights/             # Dynamic articles & thought leadership (blog)
│   │   ├── resources/            # Downloadable whitepapers, templates, & guides
│   │   ├── team/                 # Leadership & consultant profiles
│   │   └── contact/              # Interactive inquiry & lead capture form
│   ├── (admin)/                  # Authenticated Admin CMS Studio
│   │   ├── login/                # Admin authentication entry
│   │   └── dashboard/
│   │       ├── layout.tsx        # Dashboard sidebar, notification badges, header
│   │       ├── page.tsx          # Overview analytics (counts, recent leads, quick stats)
│   │       ├── articles/         # Article manager & rich-text editor
│   │       ├── services/         # Service package editor
│   │       ├── case-studies/     # Case study & metrics builder
│   │       ├── resources/        # Resource & file upload manager
│   │       ├── testimonials/     # Social proof & rating manager
│   │       ├── team/             # Team profile manager
│   │       ├── inquiries/        # Lead inbox & inquiry status pipeline
│   │       └── media/            # Media library & file browser
│   ├── api/                      # Webhooks, health checks, upload streaming
│   ├── not-found.tsx             # Friendly 404 page for missing slugs/pages
│   └── error.tsx                 # Global error boundary
├── lib/
│   ├── db/
│   │   └── prisma.ts             # Global singleton Prisma client
│   ├── auth/
│   │   ├── auth.ts               # NextAuth configuration and session callbacks
│   │   └── middleware.ts         # Route protection for /(admin) routes
│   └── modules/                  # Isolated domain services & business logic
│       ├── articles/             # CRUD, slug generation, SEO metadata
│       ├── services/             # Offerings, deliverables, pricing tiers
│       ├── case-studies/         # Client metrics, challenges, solutions
│       ├── resources/            # Gated download logic & download counting
│       ├── media/                # Storage adapter (Local / Cloudinary / S3)
│       └── inquiries/            # Form validation & lead notification dispatch
├── prisma/
│   ├── schema.prisma             # PostgreSQL schema definition
│   └── seed.ts                   # Initial admin user & demo content seeder
└── public/
    └── uploads/                  # Local development media storage
```

---

## 3. Data Model & Database Schema

The database runs on PostgreSQL managed via Prisma. All models are indexed for fast lookup by slug and publish status.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  EDITOR
}

enum InquiryStatus {
  NEW
  CONTACTED
  QUALIFIED
  ARCHIVED
}

model User {
  id            String       @id @default(cuid())
  email         String       @unique
  name          String
  passwordHash  String
  role          Role         @default(ADMIN)
  articles      Article[]
  mediaAssets   MediaAsset[]
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

model Article {
  id              String    @id @default(cuid())
  title           String
  slug            String    @unique
  excerpt         String
  content         String    @db.Text
  coverImageUrl   String?
  category        String
  tags            String[]
  published       Boolean   @default(false)
  publishedAt     DateTime?
  metaTitle       String?
  metaDescription String?
  authorId        String
  author          User      @relation(fields: [authorId], references: [id])
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@index([slug, published])
}

model Service {
  id           String        @id @default(cuid())
  title        String
  slug         String        @unique
  tagline      String
  description  String        @db.Text
  deliverables String[]
  iconName     String?
  featured     Boolean       @default(false)
  displayOrder Int           @default(0)
  testimonials Testimonial[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model CaseStudy {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  clientName  String
  industry    String
  challenge   String   @db.Text
  solution    String   @db.Text
  results     Json     // Array of { "metric": "+140%", "label": "Growth" }
  coverImage  String?
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Resource {
  id            String   @id @default(cuid())
  title         String
  slug          String   @unique
  description   String
  fileUrl       String
  fileType      String   // "pdf", "xlsx", etc.
  fileSizeBytes Int
  downloadCount Int      @default(0)
  isGated       Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Testimonial {
  id          String   @id @default(cuid())
  clientName  String
  clientRole  String
  companyName String
  avatarUrl   String?
  quote       String   @db.Text
  rating      Int      @default(5)
  serviceId   String?
  service     Service? @relation(fields: [serviceId], references: [id])
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model TeamMember {
  id           String   @id @default(cuid())
  name         String
  role         String
  bio          String   @db.Text
  avatarUrl    String?
  linkedinUrl  String?
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
}

model Inquiry {
  id                String        @id @default(cuid())
  name              String
  email             String
  phone             String?
  company           String?
  serviceOfInterest String?
  message           String        @db.Text
  status            InquiryStatus @default(NEW)
  createdAt         DateTime      @default(now())
}

model MediaAsset {
  id          String   @id @default(cuid())
  filename    String
  url         String
  mimeType    String
  sizeBytes   Int
  uploaderId  String
  uploader    User     @relation(fields: [uploaderId], references: [id])
  createdAt   DateTime @default(now())
}
```

---

## 4. Admin CMS Studio Workflows

### 4.1. Authentication & Route Guard
* Admin studio lives exclusively under `app/(admin)/dashboard`.
* Next.js Middleware intercepts all requests to `/dashboard/*`:
  * Verifies the cryptographic signature of the session cookie.
  * If unauthenticated, redirects to `/login` with an encoded `?callbackUrl`.
  * If authenticated as `EDITOR`, restricts destructive actions (user management and global site config).

### 4.2. Dynamic Content Management Experience
* **Editor Interface**: Rich-text authoring using TipTap with integrated markdown keyboard shortcuts, typography styling, code blocks, and quote callouts.
* **Media Library Integration**: An interactive drawer lets admins upload images/documents with drag-and-drop or select previously uploaded assets. The selected asset URL is injected directly into content.
* **SEO Metadata Panel**: Every article, service, and case study includes dedicated fields for `metaTitle` and `metaDescription` with a live visual simulation of the Google SERP snippet.
* **Draft / Published Workflow**: Content can be saved as an unlisted draft (`published: false`) or published immediately.

### 4.3. On-Demand Incremental Static Regeneration (ISR)
When content is created or updated in the CMS, the respective Server Action executes:
```ts
revalidatePath('/insights');
revalidatePath(`/insights/${slug}`);
```
This guarantees zero stale cache for users while maintaining near-zero database load on the public website.

### 4.4. Lead & Inquiry Pipeline
* Public `/contact` submissions write directly to the `Inquiry` table.
* The admin navigation displays a badge count of `NEW` inquiries.
* Admins can inspect leads, review the client's problem statement, and advance the status (`NEW` → `CONTACTED` → `QUALIFIED` → `ARCHIVED`).

---

## 5. Error Handling & Validation Strategy

1. **Zod Validation on All Inputs**:
   * Form inputs are strictly validated both in browser client components (for instant user feedback) and in Server Actions (for tamper-proof integrity).
2. **File Upload Hardening**:
   * Restricted file extensions (`.jpg`, `.png`, `.webp`, `.svg`, `.pdf`).
   * Maximum file size limits: Images max 5MB; PDFs max 25MB.
   * File content verified via magic-byte/MIME inspection before storage persistence.
3. **Resilient UI Boundaries**:
   * `not-found.tsx` for unknown articles or services.
   * Granular `error.tsx` boundaries to isolate failures so that a broken media preview never degrades the rest of the application.

---

## 6. Testing & Quality Assurance Plan

* **Unit Tests (Vitest)**:
  * Slug generator logic (URL normalization, collision handling).
  * Zod schema parsing edge cases.
  * Markdown-to-HTML sanitization.
* **Integration Tests**:
  * Server Actions handling content creation, updating, and publication states.
  * Role permission guards for `ADMIN` vs `EDITOR`.
* **End-to-End Tests (Playwright)**:
  * Visitor navigation flow: Home → Services → Case Studies → Contact form submission.
  * Admin editorial flow: Login → Create Article → Upload Cover Image → Publish → Verify live public rendering.

---

## 7. Future-Proofing for Phase 2 & Phase 3

* **Phase 2 (Consultation Booking)**:
  * The `Service` model is pre-configured with distinct IDs so that `AvailabilitySlot` and `Booking` models in Phase 2 can link directly to specific services (e.g. "Cloud Architecture Audit - 1 Hour").
* **Phase 3 (E-Learning & LMS)**:
  * The `User` model can be extended with a `CLIENT` role.
  * A new `lib/modules/courses` module will reuse the media pipeline and TipTap lesson editing infrastructure without rewriting any core platform code.
