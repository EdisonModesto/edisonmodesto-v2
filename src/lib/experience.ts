export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  logo: string;
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    id: "sandlot",
    company: "Sandlot Technology Ventures",
    role: "Mid Software Engineer",
    period: "April 2024 - Present",
    logo: "/images/sandlot.png",
    current: true,
  },
  {
    id: "prosperna",
    company: "Prosperna",
    role: "Junior Flutter Developer",
    period: "July 2023 - April 2024",
    logo: "/images/prosperna.png",
  },
  {
    id: "freelance",
    company: "Fiverr / Upwork",
    role: "Freelance Flutter Developer",
    period: "2020 - 2023",
    logo: "/images/fiverr.png",
  },
  {
    id: "devkinetics",
    company: "Devkinetics Inc.",
    role: "Flutter Lead Intern",
    period: "August 2022 - November 2022",
    logo: "/images/devkinetics.png",
  },
];
