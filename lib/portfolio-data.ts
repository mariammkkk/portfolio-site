export const about = {
  name: 'Mariam Khan',
  role: 'CS · Data Science · AI/ML · Product',
  location: 'Old Bridge, New Jersey',
  headline: 'I turn messy data and AI/ML into products that ship.',
  summary:
    'Rutgers CS & Data Science grad (Cum Laude, ’26) working at the intersection of engineering and product: RAG pipelines, agentic systems, and data tooling that real teams actually use. I care less about whether something can be built and more about whether it should be.',
  stats: [
    { label: 'Rutgers CS + DS', value: "Cum Laude ’26" },
    { label: 'Duke AI Product Mgmt', value: 'Certified' },
  ],
}

export type Project = {
  title: string
  tagline: string
  context: string
  featured: boolean
  problem?: string
  approach?: string
  contribution?: string
  outcome?: { metric: string; detail: string }
  stack: string[]
  link?: string
}

export const projects: Project[] = [
  {
    title: 'RxWatch',
    tagline:
      'Drug-shortage prediction platform giving independent pharmacies the forecasting tools big chains already have.',
    context: 'Independent Research · In Progress',
    featured: true,
    problem:
      'Independent pharmacies lack access to the drug-shortage prediction models large chains rely on, a methodological gap I confirmed across 5+ peer-reviewed and government sources (GAO, AJHP, PLOS).',
    approach:
      'Engineered a Python pipeline on the openFDA REST API to merge multiple datasets and surface early signals on shortage-risk factors, benchmarked against published logistic-regression and ML-classifier studies (69–93% accuracy).',
    contribution:
      'Sole researcher and engineer: sourced the literature, defined the methodology, built the data pipeline, and am now designing the pharmacy-facing interface.',
    outcome: {
      metric: '69–93%',
      detail:
        'Targeting published accuracy benchmarks with a pharmacy-facing risk-scoring dashboard that turns FDA regulatory data into an actionable planning tool.',
    },
    stack: ['Python', 'openFDA API', 'ML Classifiers', 'Logistic Regression'],
    link: 'https://github.com/mariammkkk',
  },
  {
    title: 'Clara',
    tagline:
      'Agentic AI demo that automates high-risk insurance claims review and extraction of unstructured medical data.',
    context: 'RWJH x Rutgers Health Hackathon · Oct 2025',
    featured: true,
    problem:
      'Insurance claims review is slow and error-prone, with high-risk claims requiring manual extraction of unstructured medical data and tight policy/regulatory compliance.',
    approach:
      'Deployed specialized AI agents to automate high-risk claims review and extract unstructured medical data, wiring the flow together on Structify and the Airia platform inside a 48-hour build.',
    contribution:
      'Led end-to-end product development: defined scope, coordinated technical and clinical requirements, and shipped a working agentic demo with the team.',
    outcome: {
      metric: '65%',
      detail:
        'Cut manual processing time by 65% while improving policy and regulatory compliance on high-risk claims.',
    },
    stack: ['Python', 'Structify', 'Airia Platform', 'Agentic AI'],
    link: 'https://github.com/mariammkkk',
  },
  {
    title: "Early Alzheimer's Detection",
    tagline:
      "AI/ML classification model that detects early Alzheimer's indicators from handwriting patterns.",
    context: 'AI/ML Classification Model · Mar – Apr 2025',
    featured: true,
    problem:
      "Early Alzheimer's is hard to catch, but subtle motor changes surface in handwriting well before a formal diagnosis.",
    approach:
      'Built a classification model on handwriting-derived features with scikit-learn, handling preprocessing, feature engineering, and evaluation in NumPy and Pandas.',
    contribution:
      'Built the model end to end: data preparation, feature engineering, training, and evaluation of results.',
    outcome: {
      metric: 'Early signal',
      detail:
        "A working classifier that flags early Alzheimer's indicators from handwriting patterns for further screening.",
    },
    stack: ['Python', 'NumPy', 'Pandas', 'scikit-learn'],
    link: 'https://github.com/mariammkkk',
  },
  {
    title: 'Beauty Product R&D',
    tagline: 'Strategy dashboard that mines product and market data to guide beauty R&D decisions.',
    context: 'Strategy Dashboard',
    featured: true,
    problem:
      'Beauty R&D decisions are often driven by intuition rather than data, leaving teams without a clear read on ingredient trends, competitor formulations, and what the market actually wants.',
    approach:
      'Built a Streamlit dashboard on a Python + Pandas pipeline that cleans and mines product and market datasets, using Git LFS to version large data files, and surfaces ingredient, pricing, and positioning trends in one view.',
    contribution:
      'Designed and built the tool end to end: data cleaning, the analysis pipeline, and the interactive dashboard that turns raw product data into R&D-ready insights.',
    outcome: {
      metric: 'Data-driven R&D',
      detail:
        'A single interactive view that replaces guesswork with evidence, helping prioritize which product directions to pursue.',
    },
    stack: ['Python', 'Pandas', 'Streamlit', 'Git LFS'],
    link: 'https://github.com/mariammkkk',
  },
]

export type Experience = {
  title: string
  company: string
  location: string
  period: string
  metric: string
}

export const experience: Experience[] = [
  {
    title: 'Product Specialist',
    company: 'Apple',
    location: 'Freehold, NJ',
    period: 'Jul 2026 – Present',
    metric:
      'Diagnosed product/software issues for 100+ customers weekly and designed self-serve SMB training that cut repeat support inquiries by 15%.',
  },
  {
    title: 'AI Automation Extern',
    company: 'Pfizer',
    location: 'Remote',
    period: 'Jun 2026 – Aug 2026',
    metric:
      'Built a RAG document-intelligence pipeline (LlamaIndex, open-source LLMs, OCR) projected to cut clinical teams’ manual data-hunting time by 90%+.',
  },
  {
    title: 'Data Engineering Intern',
    company: 'CrisPRO.ai',
    location: 'Holmdel, NJ',
    period: 'Aug 2025 – Oct 2025',
    metric:
      'Deployed the Evo2 genomic foundation model into a clinical AI pipeline, enabling high-throughput variant interpretation for oncology.',
  },
  {
    title: 'Data Science & ML Research Assistant',
    company: 'Ignito',
    location: 'Remote',
    period: 'May 2025 – Aug 2025',
    metric:
      'Delivered 25 hands-on ML projects across classification, regression, NLP, and time-series, engineering features to lift model performance.',
  },
  {
    title: 'Lead Extern · Harmony Biosciences',
    company: 'Rutgers MBS Externship',
    location: 'Remote',
    period: 'Sept 2024 – Dec 2024',
    metric:
      'Led 5 externs to resolve 50+ edge cases in a streamlined digital intake form, cutting processing errors and speeding approvals.',
  },
  {
    title: 'Backend Development SWE Fellow',
    company: 'Blueprint',
    location: 'New Brunswick, NJ',
    period: 'Oct 2024 – Dec 2024',
    metric:
      'Built a socket-programming login app in Python + advanced SQL, hardening client/server HTTP data management and security.',
  },
  {
    title: 'CS111 Exam Grader & Proctor',
    company: 'Rutgers University',
    location: 'Remote',
    period: 'Sept 2024 – Jan 2025',
    metric:
      'Designed grading workflows and rubrics with professors, ensuring consistent evaluation standards for 200+ students.',
  },
]

export type SkillGroup = {
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { label: 'Technical', items: ['Python', 'R', 'SQL', 'Java', 'JavaScript', 'Git', 'RAG', 'OCR / Computer Vision', 'ETL Pipelines'] },
  { label: 'Product', items: ['Notion', 'Figma', 'Tableau', 'Power BI', 'Requirements & Metrics', 'AI Product Management'] },
  { label: 'Creative', items: ['Photo & Video Production', 'DaVinci Resolve, CapCut, Final Cut Pro, Lightroom', 'Photo Editing', 'Visual Storytelling', 'Composition & Lighting'] },
]

export type Leadership = {
  role: string
  org: string
  period: string
  blurb: string
  image?: string
  imageAlt?: string
}

export const leadership: Leadership[] = [
  {
    role: 'Co-founder & Marketing Director',
    org: 'Tech Collaborative',
    period: 'Jul 2025 – May 2026',
    blurb: 'Co-founded a tech initiative connecting students and mentors; raised $2k+ in sponsorships, grew social to 190k+ interactions, and drew 70+ attendees per event.',
    image: '/tech-collab-team.jpg',
    imageAlt: 'The Tech Collaborative student and mentor team gathered together at a campus event.',
  },
  {
    role: 'Marketing Director',
    org: 'United Mission for Relief & Development',
    period: 'Sept 2024 – May 2026',
    blurb: 'Led digital marketing and outreach campaigns driving 250k+ digital engagements, $20k+ in donations, and 400+ peak attendees.',
    image: '/umr-team-photo.jpg',
    imageAlt: 'The UMR team posing in front of a lit UMR marquee sign at the Spring Gala.',
  },
  {
    role: 'Authors Manager',
    org: 'MSA',
    period: 'Sept 2024 – May 2025',
    blurb: 'Co-designed and launched a Framer-based digital magazine celebrating identity, collecting 50+ student art submissions; led coordination for a 250+ attendee Art Gala.',
  },
  {
    role: 'Programs Chair, The Muslim Extravaganza',
    org: 'Young Muslims',
    period: 'Sept 2025 – Aug 2026',
    blurb: 'Executive team member helping plan a full-day event for 10k+ attendees, organizing a carnival, sports tournaments, and a vendor bazaar.',
  },
  {
    role: 'NJ Leadership Conference Co-chair',
    org: 'Young Muslims',
    period: 'Aug 2026 – Present',
    blurb: 'Led a team of 10 to host a statewide conference for student org leaders, running marketing, logistics, outreach, and programming teams.',
  },
  {
    role: 'Co-founder & Core Team Member',
    org: 'Young Muslims (Old Bridge Chapter)',
    period: 'Aug 2022 – Present',
    blurb: 'Helped start a youth group for girls ages 13–25; grew to 50+ biweekly attendance running activities, volunteer initiatives, and workshops.',
  },
]

export const contact = {
  email: 'mariamkhan8805@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mariamkhan8',
  github: 'https://github.com/mariamkhan8',
  resume: '/mariam-khan-resume.pdf',
}
