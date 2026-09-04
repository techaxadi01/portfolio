export interface Project {
  id: number;
  name: string;
  url: string;
  language: string;
  summary: string;
  description?: string;
  tags?: string[];
  stars?: number;
  featured?: boolean;
}

export interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  period: string;
  marks: string;
  notes: string;
  website?: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface CertificationItem {
  name: string;
  year: string;
  grade: string;
}

export interface Profile {
  fullName: string;
  photo: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  intro: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  projects: Project[];
  skills: string[];
}
