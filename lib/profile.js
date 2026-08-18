import { readFile } from "node:fs/promises";
import path from "node:path";

const fallbackProfile = {
  fullName: "Your Name",
  photo: "/profile-photo.jpg",
  role: "MCA Student | Next.js Developer",
  location: "Bengaluru, Karnataka",
  email: "your.email@example.com",
  github: "https://github.com/techaxadi01",
  linkedin: "https://www.linkedin.com/in/aditya-kumar-aa677b3a6/",
  intro: "Next.js developer focused on server rendering, client rendering, and responsive UI work.",
  summary: "Entry-level developer portfolio with a focus on Next.js, REST APIs, and mobile-first Tailwind layouts.",
  experience: [
    {
      role: "NCC Senior Division",
      organization: "National Cadet Corps",
      period: "2022 - 2023",
      location: "Raipur",
      bullets: [
        "B Certificate with A grade in 2022.",
        "C Certificate with B grade in 2023."
      ]
    }
  ],
  education: [
    {
      degree: "MCA",
      institution: "Christ Deemed to be University, Bengaluru",
      period: "2028",
      marks: "Ongoing",
      notes: "Postgraduate program focused on advanced computer applications."
    },
    {
      degree: "BSc (PCM)",
      institution: "Government Nagarjuna Post Graduate College of Science, Raipur",
      period: "2025",
      marks: "8.08 CGPA",
      notes: "Bachelor's degree in Physics, Chemistry, and Mathematics."
    },
    {
      degree: "DCA",
      institution: "Government Nagarjuna Post Graduate College of Science, Raipur",
      period: "2023",
      marks: "64.25%",
      notes: "Practical foundation in computer applications and office productivity tools."
    },
    {
      degree: "12th",
      institution: "Kendriya Vidyalaya No.2, Raipur",
      period: "2022",
      marks: "88.6%",
      notes: "Higher secondary education."
    },
    {
      degree: "10th",
      institution: "Kendriya Vidyalaya No.2, Raipur",
      period: "2020",
      marks: "91.0%",
      notes: "Secondary education."
    }
  ],
  certifications: [
    { name: "NCC Senior Division - B Certificate", year: "2022", grade: "A" },
    { name: "NCC Senior Division - C Certificate", year: "2023", grade: "B" }
  ],
  projects: [
    {
      name: "CIA-3-FSD",
      url: "https://github.com/techaxadi01/CIA-3-FSD",
      language: "JavaScript",
      summary: "CIA 3"
    },
    {
      name: "EduFlow_MERN",
      url: "https://github.com/techaxadi01/EduFlow_MERN",
      language: "JavaScript",
      summary: "My Final Project for all Students"
    },
    {
      name: "Food-Ordering-System",
      url: "https://github.com/techaxadi01/Food-Ordering-System",
      language: "JavaScript",
      summary: "class activity"
    },
    {
      name: "Login",
      url: "https://github.com/techaxadi01/Login",
      language: "HTML",
      summary: "Lab 4 Login Page with Express and Node JS"
    }
  ],
  skills: [
    "Next.js App Router",
    "React components",
    "Tailwind CSS",
    "REST API design",
    "MongoDB Atlas ready",
    "HTML, CSS, JavaScript"
  ]
};

export async function getPortfolioProfile() {
  const filePath = path.join(process.cwd(), "data", "cv-data.txt");

  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return { ...fallbackProfile, ...parsed };
  } catch {
    return fallbackProfile;
  }
}
