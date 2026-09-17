export type Certification = {
  name: string
  issuer: string
  status: 'completed' | 'in-progress'
  dateCompleted?: string
  expectedDate?: string
  credentialUrl?: string
}

export const certifications: Certification[] = [
  { name: 'AI Product Management', issuer: 'Duke University', status: 'completed' },
  { name: 'BigQuery for Data Analysts', issuer: 'Google Cloud', status: 'completed' },
  { name: 'Data Storytelling', issuer: 'LinkedIn Learning', status: 'completed' },
  { name: 'Tableau Masterclass', issuer: "O'Reilly", status: 'completed' },
  { name: 'Advanced Data Analytics', issuer: 'Google', status: 'in-progress' },
]

export type CertificationGoal = {
  name: string
  issuer: string
}

export const certificationGoals: CertificationGoal[] = [
  { name: 'Advanced MySQL Topics', issuer: 'Meta' },
  { name: 'Data Warehouse Fundamentals', issuer: 'IBM' },
]
