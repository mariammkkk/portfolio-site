// ---------------------------------------------------------------------------
// All site copy lives here. Edit freely — components read from these shapes
// and don't need to change when you add/reorder/edit entries.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Mariam Khan",
  positioning: "CS & Data Science grad building AI-driven products.",
  role: "Product Specialist @ Apple",
  location: "Old Bridge, NJ",
  email: "mariamkhan8805@gmail.com",
  linkedin: "https://linkedin.com/in/mariamkhan8",
  linkedinLabel: "linkedin.com/in/mariamkhan8",
  github: "https://github.com/mariammkkk",
  githubLabel: "github.com/mariammkkk",
  resumeHref: "/resume.pdf",
};

export const about = {
  paragraph:
    "I graduated a year early from Rutgers University, New Brunswick in May 2026. I'm a new grad looking to apply my expertise and grow in a professional role. I'm happiest at the intersection of AI/ML and product, figuring out not just whether something can be built, but whether it should be.",
};

export type ExperienceEntry = {
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Product Specialist",
    org: "Apple",
    location: "Freehold, NJ",
    start: "Jul 2026",
    end: "Present",
    bullets: [
      "Diagnosed and resolved product/software issues for 100+ customers weekly, identifying recurring pain points and translating them into structured troubleshooting patterns that improved resolution speed and accuracy",
      "Designed self-serve training resources for SMB owners that closed product knowledge gaps and cut repeat support inquiries by 15%, reducing team ticket volume",
    ],
  },
  {
    role: "AI Automation Extern",
    org: "Pfizer",
    location: "Remote",
    start: "Jun 2026",
    end: "Aug 2026",
    bullets: [
      "Engineered a RAG-based document intelligence pipeline using LlamaIndex, open-source LLMs (Mistral, Phi-2), and OCR to automate data extraction from clinical vendor files, using chunk tuning to optimize context retrieval and ensure high-fidelity structured text extraction",
      "Spearheaded benchmarking of OCR and retrieval systems, compiling model trade-offs into a strategic report and interactive UI demo demonstrating a potential 90%+ reduction in manual data-hunting time",
    ],
  },
  {
    role: "Data Engineering Intern",
    org: "CrisPRO.ai",
    location: "Holmdel, NJ",
    start: "Aug 2025",
    end: "Oct 2025",
    bullets: [
      "Deployed the Evo2 genomic foundation model into CrisPRO's clinical AI pipeline, enabling high-throughput variant interpretation for oncology applications",
      "Mapped and documented end-to-end ETL workflows for genomic and clinical data, supporting structured dataset preparation for ML model training and patient-trial matching",
      "Collaborated with a team of ~4 engineers on AI/ML orchestration patterns, contributing to preprocessing pipelines for in silico therapeutic design",
    ],
  },
  {
    role: "Data Science & ML Research Assistant",
    org: "Ignito",
    location: "Remote",
    start: "May 2025",
    end: "Aug 2025",
    bullets: [
      "Pioneered 25 hands-on projects transforming datasets to improve model performance across classification, regression, NLP, and time series tasks",
      "Engineered features and applied advanced preprocessing (normalization, encoding, anomaly detection, dimensionality reduction) on real-world datasets",
    ],
  },
  {
    role: "Lead Extern, Harmony Biosciences",
    org: "Rutgers MBS Externship Program",
    location: "Remote",
    start: "Sept 2024",
    end: "Dec 2024",
    bullets: [
      "Improved data integration across contracting, procure-to-pay, and fee-for-service processes by implementing a streamlined digital form, reducing processing errors and accelerating approval times",
      "Led a cross-functional team of 5 externs to identify and resolve 50+ potential edge cases, enhancing software reliability and reducing contractor onboarding issues",
    ],
  },
  {
    role: "Backend Development Software Engineering Fellow",
    org: "Blueprint",
    location: "New Brunswick, NJ",
    start: "Oct 2024",
    end: "Dec 2024",
    bullets: [
      "Implemented Python and advanced SQL queries to develop a login application using socket programming",
      "Optimized client/server data management and HTTP protocols, enhancing data security and transfer reliability",
    ],
  },
  {
    role: "CS111 Exam Grader & Proctor",
    org: "Rutgers University",
    location: "Remote",
    start: "Sept 2024",
    end: "Jan 2025",
    bullets: [
      "Designed and implemented grading workflows in collaboration with professors, streamlining evaluation and ensuring consistent standards for 200+ students",
      "Contributed to developing and refining exam rubrics, aligning assessments with course objectives",
    ],
  },
];

export type ProjectStat = {
  value: string;
  label: string;
};

export type ProjectCaseStudy = {
  problem: string;
  approach: string;
  result: string;
  stats: ProjectStat[];
  learned?: string;
};

export type Project = {
  title: string;
  subtitle: string;
  date: string;
  github: string;
  tech: string[];
  caseStudy: ProjectCaseStudy;
};

export const projects: Project[] = [
  {
    title: "Clara: Insurance Claims Automation",
    subtitle: "RWJH x Rutgers Health Hackathon",
    date: "Oct 2025",
    github: "https://github.com/mariammkkk/Clara-Insurance-Claims-Automation",
    tech: ["Python", "Structify", "Airia Platform", "Agentic AI"],
    caseStudy: {
      problem:
        "Insurance claims review meant manually digging through unstructured medical records and patient claims. That process was slow, error-prone, and carried real compliance risk.",
      approach:
        "Built an agentic AI workflow in Python and Structify to detect, visualize, and extract critical unstructured medical data, then deployed specialized AI agents on the Airia Platform to automate high-risk claims review. Led end-to-end product development in a 48-hour hackathon, coordinating technical and clinical requirements.",
      result:
        "Improved policy and regulatory compliance and was selected for the Health Hack Accelerator Program.",
      stats: [{ value: "65%", label: "less manual processing time" }],
      learned:
        "It didn't stay static. Post-hackathon, I pivoted it into an AI-assisted call triage system for family planning.",
    },
  },
  {
    title: "Early Alzheimer's Detection via Handwriting Analysis",
    subtitle: "AI/ML Classification Model",
    date: "Mar – Apr 2025",
    github: "https://github.com/mariammkkk/Alzheimers-Detection-Model",
    tech: ["Python", "NumPy", "Pandas", "Scikit-learn"],
    caseStudy: {
      problem:
        "Early Alzheimer's detection is difficult and typically requires expensive or invasive clinical testing, even though handwriting changes are a known but underused early signal.",
      approach:
        "Built a data pipeline to preprocess 25 multi-modal handwriting trials across a 174-subject clinical dataset, used correlation matrices to guide feature selection, and benchmarked Random Forest against Naive Bayes, Logistic Regression, and SVM.",
      result: "Random Forest came out as the best-fit algorithm.",
      stats: [{ value: "83%", label: "classification accuracy" }],
      learned:
        "A larger, more diverse dataset would help confirm how well this generalizes.",
    },
  },
  {
    title: "Beauty Product R&D",
    subtitle: "Strategy Dashboard",
    date: "",
    github: "https://github.com/mariammkkk/beauty_product_rnd",
    tech: ["Python", "Pandas", "Streamlit", "Git LFS"],
    caseStudy: {
      problem:
        "Customer experience issues were treated as pure cost centers, with no clear way to quantify which fixes were actually worth the investment.",
      approach:
        "Built an interactive Streamlit dashboard in Python and Pandas that translates unstructured customer feedback into a Priority Score and Value-to-Cost Ratio, letting stakeholders filter by action type and net impact.",
      result: "Some topics reached an ROI as high as 11.75:1.",
      stats: [
        { value: "$99.83M", label: "total net impact" },
        { value: "1.62:1", label: "global ROI" },
      ],
    },
  },
];

export type LeadershipEntry = {
  role: string;
  org: string;
  start: string;
  end: string;
  description: string;
  photo?: string;
};

export type LeadershipGroup = {
  label: string;
  entries: LeadershipEntry[];
};

export const leadership: LeadershipGroup[] = [
  {
    label: "Rutgers Student Organizations",
    entries: [
      {
        role: "Co-founder & Marketing Director",
        org: "Tech Collaborative",
        start: "Jul 2025",
        end: "May 2026",
        description:
          "Co-founded a tech initiative connecting students and mentors; raised $2k+ in sponsorships, grew social to 190k+ interactions, drew 70+ attendees per event",
        photo: "/leadership/tech-collab-team.jpg",
      },
      {
        role: "Marketing Director",
        org: "United Mission for Relief & Development",
        start: "Sept 2024",
        end: "May 2026",
        description:
          "Led digital marketing and outreach campaigns driving 250k+ digital engagements, $20k+ in donations, and 400+ peak attendees",
        photo: "/leadership/umr-team-photo.JPG",
      },
      {
        role: "Authors Manager",
        org: "MSA",
        start: "Sept 2024",
        end: "May 2025",
        description:
          "Co-designed and launched a Framer-based digital magazine celebrating identity, collecting 50+ student art submissions; led event coordination for a 250+ attendee Art Gala",
      },
    ],
  },
  {
    label: "Young Muslims",
    entries: [
      {
        role: "Programs Chair, The Muslim Extravaganza",
        org: "Young Muslims",
        start: "Sept 2025",
        end: "Aug 2026",
        description:
          "Executive team member helping plan a full-day event for 10k+ attendees, organizing a carnival, sports tournaments, and vendor bazaar",
      },
      {
        role: "NJ Leadership Conference Co-chair",
        org: "Young Muslims",
        start: "Aug 2026",
        end: "Present",
        description:
          "Led a team of 10 to host a statewide conference for student org leaders across high school and college, running marketing, logistics, outreach, and programming teams",
      },
      {
        role: "Co-founder & Core Team Member",
        org: "Young Muslims (Old Bridge Chapter)",
        start: "Aug 2022",
        end: "Present",
        description:
          "Helped start a youth group for girls ages 13-25; grew to 50+ biweekly attendance running activities, volunteer initiatives, and workshops",
      },
    ],
  },
];

export const education = {
  school: "Rutgers University, New Brunswick, NJ",
  degree: "Bachelor of Science in Computer Science and Data Science",
  start: "Sept 2023",
  end: "May 2026",
  honors: "Cum Laude, GPA 3.5/4.0",
  coursework: [
    "Machine Learning Principles",
    "Data Management",
    "Introduction to Data Science",
    "Principles of Information & Data Management",
    "Regression Methods",
    "Statistical Inference for Data Science",
  ],
};

export const certifications = [
  {
    name: "AI Product Management Specialization",
    issuer: "Duke University (via Coursera)",
    year: "2026",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Core Technical",
    items: ["Python", "SQL", "Java", "R"],
  },
  {
    group: "ML / AI",
    items: ["Pandas", "NumPy", "Scikit-learn", "LlamaIndex"],
  },
  {
    group: "Cloud & Engineering",
    items: ["AWS", "Git", "Docker"],
  },
  {
    group: "Data & BI",
    items: ["Tableau", "Power BI"],
  },
  {
    group: "Product & Design",
    items: ["Figma"],
  },
];

export const beyondResume = {
  intro: "When I'm not building things",
  tags: [
    "Hiking",
    "Ziplining",
    "Jet Skiing",
    "Beach Days",
    "Video & Photo Editing",
    "Community Service",
    "Traveling",
    "Making Things From Scratch",
  ],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Leadership", href: "#leadership" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
