import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for Global Guidelines Consultancy and Visa Services...");

  // 1. Seed Admin User
  const passwordHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@globalguidelines.com" },
    update: {},
    create: {
      email: "admin@globalguidelines.com",
      name: "Global Guidelines Admin",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log("Created admin user:", admin.email);

  // 2. Seed Services
  await prisma.service.upsert({
    where: { slug: "abroad-study-university-admissions" },
    update: {},
    create: {
      title: "Abroad Study & University Admissions",
      slug: "abroad-study-university-admissions",
      tagline: "End-to-end guidance for USA, UK, Canada, Australia & Europe",
      description:
        "Comprehensive university shortlisting, application filing, credit transfer evaluations, and scholarship assistance tailored to your academic background and career goals.",
      deliverables: JSON.stringify([
        "Profile evaluation & personalized country/course matching",
        "Direct admission processing with top accredited partner universities",
        "Scholarship assessment (securing maximum tuition fee discounts)",
        "Application documentation review (transcripts, recommendation letters)",
      ]),
      iconName: "GraduationCap",
      featured: true,
      displayOrder: 1,
    },
  });

  await prisma.service.upsert({
    where: { slug: "visa-documentation-interview-prep" },
    update: {},
    create: {
      title: "Visa Documentation & Interview Preparation",
      slug: "visa-documentation-interview-prep",
      tagline: "Meticulous visa file preparation and 1-on-1 embassy mock sessions",
      description:
        "Visa refusal prevention through airtight financial auditing, genuine intention justification, Statement of Purpose (SOP) polishing, and realistic mock interview drills.",
      deliverables: JSON.stringify([
        "Airtight financial documentation and sponsor verification review",
        "Custom Statement of Purpose (SOP) / Genuine Student (GS) drafting support",
        "1-on-1 simulated embassy interview coaching with seasoned counselors",
        "Biometrics, medical exam scheduling, and visa submission tracking",
      ]),
      iconName: "FileCheck",
      featured: true,
      displayOrder: 2,
    },
  });

  await prisma.service.upsert({
    where: { slug: "test-preparation-ielts-pte" },
    update: {},
    create: {
      title: "Test Preparation (IELTS, PTE & TOEFL)",
      slug: "test-preparation-ielts-pte",
      tagline: "Expert-led score booster coaching for target band scores",
      description:
        "Achieve your required language scores with certified master instructors, computer-delivered mock tests, instant speaking feedback, and personalized test-taking strategies.",
      deliverables: JSON.stringify([
        "IELTS (Academic & General) with target 7.5+ band strategies",
        "PTE Academic computer lab mock practice with automated scoring",
        "Daily speaking evaluation and writing essay correction",
        "Comprehensive study materials, question banks, and simulated tests",
      ]),
      iconName: "BookOpen",
      featured: true,
      displayOrder: 3,
    },
  });

  await prisma.service.upsert({
    where: { slug: "dependent-visitor-visa-services" },
    update: {},
    create: {
      title: "Dependent & Visitor Visa Guidance",
      slug: "dependent-visitor-visa-services",
      tagline: "Reunite with family and explore global travel opportunities",
      description:
        "Hassle-free processing for student spouse visas, parent visitor visas, tourist applications, and post-study work stream counseling.",
      deliverables: JSON.stringify([
        "Spouse dependent visa documentation and marriage proof verification",
        "Tourist/visitor visa invitations and travel itinerary drafting",
        "Post-study work permit (PSW) transition counseling",
        "Health insurance (OSHC / OVHC) and pre-departure briefings",
      ]),
      iconName: "Plane",
      featured: true,
      displayOrder: 4,
    },
  });

  // 3. Seed Articles
  await prisma.article.upsert({
    where: { slug: "australia-student-visa-changes-genuine-student-explained" },
    update: {},
    create: {
      title: "Australia Student Visa 2026: The Genuine Student (GS) Rule Explained",
      slug: "australia-student-visa-changes-genuine-student-explained",
      excerpt:
        "Everything you need to know about the new Genuine Student requirement, revised financial capacity benchmarks, and how to safeguard your Subclass 500 approval.",
      content: `<h2>Understanding Australia's Genuine Student (GS) Benchmark</h2>
<p>The Australian Department of Home Affairs has updated its assessment framework for international students. The Genuine Student (GS) criterion places a direct spotlight on your academic trajectory, employment prospects in your home country, and the economic rationale for your chosen qualification.</p>

<h3>Key Factors Visa Officers Scrutinize</h3>
<ul>
  <li><strong>Career Continuity:</strong> Demonstrating how the Australian degree builds directly on your prior education or industry experience.</li>
  <li><strong>Economic Incentive:</strong> Clear salary differential and job market demand in your home nation upon graduation.</li>
  <li><strong>Financial Viability:</strong> Verifiable living cost funds deposited with accredited financial institutions meeting current inflation thresholds.</li>
</ul>

<h3>Pro Tips for Your GS Submission</h3>
<p>Never submit generic, template-driven statements. At Global Guidelines, our team helps students craft bespoke narratives supported by objective labor market data, accreditation certificates, and transparent family ties.</p>`,
      category: "Australia Visa",
      tags: "Australia,Subclass500,GenuineStudent,VisaTips",
      published: true,
      publishedAt: new Date(),
      coverImageUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80",
      metaTitle: "Australia Student Visa 2026 Genuine Student Rule Explained",
      metaDescription: "Step-by-step guide to clearing Australia's Genuine Student (GS) requirement for Subclass 500.",
      authorId: admin.id,
    },
  });

  await prisma.article.upsert({
    where: { slug: "how-to-crack-usa-f1-visa-interview" },
    update: {},
    create: {
      title: "How to Clear Your USA F-1 Visa Interview on the First Attempt",
      slug: "how-to-crack-usa-f1-visa-interview",
      excerpt:
        "Master the 2-minute consular interview: what visa officers actually listen for, overcoming 214(b) immigrant intent, and proving non-immigrant ties.",
      content: `<h2>The 120-Second High-Stakes Conversation</h2>
<p>Consular interviews at the US Embassy are concise, fast-paced, and largely decided in the first sixty seconds. The visa officer's primary objective under INA section 214(b) is to ensure the applicant has legitimate study intentions and convincing ties to return home.</p>

<h3>The Golden Rules of F-1 Answers</h3>
<ul>
  <li><strong>Be Specific About the Curriculum:</strong> Rather than saying "USA has the best education," highlight specific professors, research labs, or niche subjects only your chosen university offers.</li>
  <li><strong>Quantify Your Career Plan:</strong> Name the exact roles, prospective employers, and expected return on investment in your domestic economy.</li>
  <li><strong>Crisp Financial Explanations:</strong> Know your annual I-20 cost, who is sponsoring you, and their verifiable income sources by heart.</li>
</ul>`,
      category: "USA Visa",
      tags: "USA,F1Visa,InterviewPrep,StudyInUSA",
      published: true,
      publishedAt: new Date(),
      coverImageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      metaTitle: "How to Clear USA F-1 Visa Interview on First Attempt | Global Guidelines",
      metaDescription: "Expert strategies to clear the US embassy F-1 visa interview and conquer 214(b) requirements.",
      authorId: admin.id,
    },
  });

  // 4. Seed Case Studies (Success Stories)
  await prisma.caseStudy.upsert({
    where: { slug: "ms-aakriti-regmi-uk-student-journey-visa-success" },
    update: {},
    create: {
      title: "Ms. Aakriti Regmi - UK Student Journey & Successful Visa Grant",
      slug: "ms-aakriti-regmi-uk-student-journey-visa-success",
      clientName: "Ms. Aakriti Regmi",
      industry: "UK Student Route (Tier 4) Visa",
      challenge:
        "Selecting the right accredited UK university, organizing sponsor financial affidavits, and preparing for CAS interviews on an expedited schedule.",
      solution:
        "Global Guidelines Putalisadak provided complete course evaluation, conducted 1-on-1 interview practice drills, and fast-tracked university admission paperwork.",
      results: JSON.stringify([
        { metric: "100%", label: "Visa Grant Success" },
        { metric: "10 Days", label: "CAS & Visa Turnaround" },
        { metric: "Top UK Uni", label: "Direct Admission" },
      ]),
      coverImage: "/social/instagram-photo-4.jpg",
      published: true,
    },
  });

  await prisma.caseStudy.upsert({
    where: { slug: "mr-jaykishan-kumar-yadav-uk-student-visa-grant" },
    update: {},
    create: {
      title: "Mr. Jaykishan Kumar Yadav - UK Student Visa Grant & University Admission",
      slug: "mr-jaykishan-kumar-yadav-uk-student-visa-grant",
      clientName: "Mr. Jaykishan Kumar Yadav",
      industry: "UK Student Visa (Tier 4 / Student Route)",
      challenge:
        "Navigating complex CAS documentation, sponsor affidavit requirements, and strict financial verification timelines without delays.",
      solution:
        "Global Guidelines' Putalisadak documentation team conducted a rigorous financial audit, fast-tracked CAS issuance with the university admissions desk, and pre-screened all tuberculosis test and biometric bookings.",
      results: JSON.stringify([
        { metric: "100%", label: "UK Visa Stamp Approved" },
        { metric: "12 Days", label: "Priority Decision Turnaround" },
        { metric: "Zero Refusals", label: "Airtight CAS Compliance" },
      ]),
      coverImage: "/social/instagram-photo-12.jpg",
      published: true,
    },
  });

  await prisma.caseStudy.upsert({
    where: { slug: "usa-f1-visa-with-75-scholarship" },
    update: {},
    create: {
      title: "USA F-1 Visa Approval with $26,000 Merit Scholarship",
      slug: "usa-f1-visa-with-75-scholarship",
      clientName: "Rohan Shrestha",
      industry: "MS in Computer Science, University of North Texas",
      challenge:
        "Rohan had a 2.5-year gap after his undergraduate degree and was nervous about proving career progression and securing funding.",
      solution:
        "Global Guidelines mapped his employment experience into relevant professional contributions, assisted in applying for targeted graduate assistantships, and conducted 5 intensive mock interview rounds.",
      results: JSON.stringify([
        { metric: "$26,000", label: "Merit Scholarship Awarded" },
        { metric: "1st Attempt", label: "F-1 Visa Grant" },
        { metric: "5 Rounds", label: "Simulated Interview Drills" },
      ]),
      coverImage: "/social/instagram-photo-8.jpg",
      published: true,
    },
  });

  await prisma.caseStudy.upsert({
    where: { slug: "australia-master-of-cybersecurity-visa-grant" },
    update: {},
    create: {
      title: "Australia Subclass 500 Granted in Just 11 Days",
      slug: "australia-master-of-cybersecurity-visa-grant",
      clientName: "Pooja Karki",
      industry: "Master of Cybersecurity, Deakin University",
      challenge:
        "Faced strict Genuine Student scrutiny due to changing from a general IT background into a specialized cybersecurity discipline.",
      solution:
        "We structured a 6-page comprehensive Genuine Student statement referencing national cybersecurity workforce shortages and verified bank audit trails.",
      results: JSON.stringify([
        { metric: "11 Days", label: "Visa Processing Time" },
        { metric: "100%", label: "GS Documentation Compliance" },
        { metric: "25%", label: "International Student Bursary" },
      ]),
      coverImage: "/social/instagram-photo-6.jpg",
      published: true,
    },
  });

  // 5. Seed Testimonials
  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: "Aakriti Regmi",
        clientRole: "UK Student Route Visa Recipient",
        companyName: "UK University Graduate Route",
        quote:
          "Throwback to planning my UK journey with Global Guidelines Consultancy in Putalisadak! From planning to achieving my goals, their team guided me every step with complete transparency and care.",
        rating: 5,
        featured: true,
      },
      {
        clientName: "Jaykishan Kumar Yadav",
        clientRole: "UK Student Visa Recipient",
        companyName: "UK University Admission",
        quote:
          "Global Guidelines' Putalisadak office handled my UK student visa processing with unmatched professionalism. They ensured all my financial documents and CAS steps were 100% compliant. My visa was approved without any issues!",
        rating: 5,
        featured: true,
      },
      {
        clientName: "Sunita Thapa",
        clientRole: "PTE Academic 79 Band Scorer",
        companyName: "Test Prep & Australia Applicant",
        quote:
          "The computer lab and daily speaking mock assessments at Global Guidelines Putalisadak helped me achieve 79 in PTE Academic on my very first try. Their test tips are simply the best in Kathmandu.",
        rating: 5,
        featured: true,
      },
      {
        clientName: "Sanjay Thapa",
        clientRole: "Master of Business Analytics Student",
        companyName: "University of Technology Sydney (UTS)",
        quote:
          "Global Guidelines made my dream of studying in Australia a reality. From course selection to the visa grant within two weeks, their counseling team was genuinely invested in my future.",
        rating: 5,
        featured: true,
      },
    ],
  });

  // 6. Seed Team Members
  await prisma.teamMember.deleteMany({});
  await prisma.teamMember.createMany({
    data: [
      {
        name: "Manjul Gautam",
        role: "Managing Director & Senior Education Advisor",
        bio: "Over 12 years of excellence leading Global Guidelines Putalisadak, counseling thousands of students toward Tier 4 UK, USA F-1, and Australia study permits.",
        avatarUrl: "/social/instagram-photo-1.jpg",
        displayOrder: 1,
      },
      {
        name: "Sita Sharma",
        role: "Head of Visa Documentation & Compliance",
        bio: "Specialist in Genuine Student (GS) compliance, financial auditing, and embassy interview coaching with a 99% visa success track record.",
        avatarUrl: "/social/instagram-photo-2.jpg",
        displayOrder: 2,
      },
      {
        name: "Manoj Jha",
        role: "Branch Director - Birgunj",
        bio: "Directs counseling operations and regional outreach at Global Guidelines Birgunj branch, helping Tarai students access premier global universities.",
        avatarUrl: "/social/instagram-photo-3.jpg",
        displayOrder: 3,
      },
      {
        name: "Aayushma KC",
        role: "Lead IELTS & PTE Master Trainer",
        bio: "Certified English language instructor helping students achieve 7.5+ in IELTS and 75+ in PTE Academic through modern computerized mock drills.",
        avatarUrl: "/social/facebook-photo-10.jpg",
        displayOrder: 4,
      },
    ],
  });



  // 7. Seed Downloadable Resource
  await prisma.resource.upsert({
    where: { slug: "ultimate-study-abroad-and-visa-checklist-2026" },
    update: {},
    create: {
      title: "The Ultimate Study Abroad & Visa Checklist (2026 Edition)",
      slug: "ultimate-study-abroad-and-visa-checklist-2026",
      description:
        "Comprehensive 30-point guide covering country comparison tables (USA, UK, Canada, Australia), fee requirements, intake deadlines, and document checklists.",
      fileUrl: "/resources/study-abroad-checklist-2026.pdf",
      fileType: "pdf",
      fileSizeBytes: 3200000,
      downloadCount: 318,
      isGated: true,
    },
  });

  console.log("Global Guidelines database seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
