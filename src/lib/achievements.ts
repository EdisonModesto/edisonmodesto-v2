export interface Achievement {
  id: string;
  title: string;
  description: string;
  media: string;
  date?: string;
}

export const achievements: Achievement[] = [
  {
    id: "dlsu-workshop",
    title: "Flutter Workshop Speaker for GDG On Campus La Salle",
    description: "Conducted a workshop on Flutter for the GDG On Campus La Salle where I shared my knowledge in utilizing Flutter to the participants.",
    media: "/images/dlsu.jpg",
    date: "2025",
  },
  {
    id: "gtech-summit",
    title: "FlutterFlow Speaker for G-TECH SUMMIT 2025",
    description: "Did a talk at G-TECH Summit 2025 hosted by GDG on Campus TUP where I shared an introduction on how we can leverage FlutterFlow in building cross-platform applications with ease.",
    media: "/images/gtech.png",
    date: "2025",
  },
  {
    id: "innolympics-mentor",
    title: "Mobile Development Mentor for INNOLYMPICS 2024",
    description: "Guided and provided insights to teams on how they can leverage new technologies in building mobile apps during the Innolympics 2025 hosted by GDSC PLM.",
    media: "/images/innolympics.jpg",
    date: "2024",
  },
  {
    id: "innolympics-speaker",
    title: "Workshop Speaker for INNOLYMPICS 2024",
    description: "Acted as a speaker in a workshop where I shared my knowledge in utilizing Flutter to the participants of Innolympics 2025 hosted by GDSC PLM.",
    media: "/images/flutterPhSpeak.jpg",
    date: "2024",
  },
  {
    id: "ffdg-hackfest",
    title: "FFDG Hackfest: Impact Challenge 4th place",
    description: "Participated in FFDG Manila's Hackfest: Impact Challenge 2024, placing 4th with the Rent 'n Lend App my team developed.",
    media: "/images/wolfdevs.jpg",
    date: "2024",
  },
  {
    id: "flutter-ph-speaker-2",
    title: "Guest Speaker for Flutter PH",
    description: "Showcased a project on helping farmers via mobile app at a Flutter PH event.",
    media: "/images/flutterPhSpeak.jpg",
    date: "2023",
  },
  {
    id: "notjust-hack",
    title: "NotJust Hack 2023 Hackathon Runner Up",
    description: "Got 8th place in NotJust Hack 2023 with a Flutter App I developed called 4Unity.",
    media: "/images/notjusthack.png",
    date: "2023",
  },
  {
    id: "flutter-ph-speaker-1",
    title: "Guest Speaker for Flutter PH",
    description: "Was a speaker for a Flutter PH event and talked about 'Using Flutter in the Freelance World'.",
    media: "/images/flutter-ph.png",
    date: "2022",
  },
  {
    id: "isc2-cc",
    title: "Certified in Cybersecurity by ISC2",
    description: "Passed the ISC2 Certified in Cybersecurity (CC) Certification.",
    media: "/images/certified-cc.jpg",
    date: "2022",
  },
];
