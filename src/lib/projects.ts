export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  githubUrl?: string;
  videoUrl?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "ace",
    title: "A.C.E. - Ace Dating & Friends",
    description: "A.C.E. is for asexual dating and finding ace friends",
    thumbnail: "/images/ace_banner.png",
    tags: ["Flutter", "Mobile App", "Social"],
  },
  {
    id: "prosperna",
    title: "Prosperna Mobile",
    description: "A mobile app for Prosperna - an all-in-one e-commerce platform for Philippine MSMEs",
    thumbnail: "/images/prosperna_banner.png",
    tags: ["Flutter", "E-commerce", "Fintech"],
  },
  {
    id: "cebuana-jewelry",
    title: "Cebuana Lhuillier Jewelry",
    description: "E-commerce Web App for Cebuana Lhuillier Jewelry",
    thumbnail: "/images/cebuana_banner.png",
    tags: ["Flutter Web", "E-commerce"],
  },
  {
    id: "cebuana-alajera",
    title: "Cebuana Alajera",
    description: "E-commerce Web App for Cebuana Alajera",
    thumbnail: "/images/alajera_banner.png",
    tags: ["Flutter Web", "E-commerce"],
  },
  {
    id: "timberland",
    title: "Timberland Mountain Bike Park",
    description: "A booking mobile app for Timberland Mountain Bike Park",
    thumbnail: "/images/timberland-banner.png",
    tags: ["Flutter", "Booking", "Sports"],
  },
  {
    id: "actnow",
    title: "ActNow Mobile",
    description: "A mobile app that rewards you for saving the planet through eco-friendly actions",
    thumbnail: "/images/actnow_banner.png",
    tags: ["Flutter", "Sustainability", "Gamification"],
  },
  {
    id: "a11y",
    title: "A11Y",
    description: "An app that allows people with disabilities to watch movies with accessibility features",
    thumbnail: "/images/a11y_banner.png",
    tags: ["Flutter", "Accessibility", "Social Impact"],
  },
  {
    id: "nvtours",
    title: "NVTours",
    description: "A tourist app for tourists in Nueva Vizcaya with local guides and recommendations",
    thumbnail: "/images/nvtours_banner.png",
    githubUrl: "https://github.com/EdisonModesto/NVTours",
    tags: ["Flutter", "Tourism", "Maps"],
  },
  {
    id: "qcu",
    title: "QCU Mobile",
    description: "An e-commerce app for the students of Quezon City University",
    thumbnail: "/images/qcu_banner.png",
    githubUrl: "https://github.com/EdisonModesto/QCU-Mobile",
    tags: ["Flutter", "Education", "E-commerce"],
  },
  {
    id: "pharmago",
    title: "PharmaGo",
    description: "A pharmacy delivery app for PharmaGo",
    thumbnail: "/images/pharmago_banner.png",
    githubUrl: "https://github.com/EdisonModesto/pharma_go",
    tags: ["Flutter", "Healthcare", "Delivery"],
  },
  {
    id: "gaia",
    title: "GAIA",
    description: "An information app for gardening at your own home with plant care guides",
    thumbnail: "/images/gaia_banner.png",
    githubUrl: "https://github.com/EdisonModesto/GAIA-Mobile",
    tags: ["Flutter", "Lifestyle", "Education"],
  },
];
