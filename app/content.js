export const navigation = [
  { label: "Homepage", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Properties", href: "#for-properties" },
  { label: "Experiences", href: "#experiences" },
  { label: "FAQ", href: "#faq" },
];

export const partners = [
  { name: "Panorama Landscape Hotel Tahko", image: "panorama.webp", width: 230 },
  { name: "V8 Hotel Motorworld Region Stuttgart", image: "v8-hotel.webp", width: 163 },
  { name: "Regatta Spa Hotel", image: "regatta.webp", width: 121 },
  { name: "RUNO", image: "runo.webp", width: 145 },
];

export const villas = [
  { name: "Villa Palem", image: "villa-palem.webp", logo: "villa-palem-logo.webp" },
  { name: "Nor Hood", image: "nor-hood.webp", logo: "nor-hood-logo.webp" },
  { name: "Uluviu", image: "uluviu.webp", logo: "uluviu-logo.webp" },
];

export const showcase = [
  { title: "Spa day", image: "spa-day.webp", description: "Spa treatments in an open-air pavilion overlooking the ocean" },
  { title: "Villa tour", image: "villa-tour.webp", description: "A creator by the entrance to a tropical villa" },
  { title: "Poolside morning", image: "poolside-morning.webp", description: "Two guests at a bright white villa with a curved pool" },
  { title: "Breakfast", image: "breakfast.webp", description: "A guest in a tiled pool with a floating breakfast" },
  { title: "Sunset", image: "sunset.webp", description: "A mountain and clouds seen from a lookout at sunset" },
];

export const experiences = [
  { title: "VIP Access at FINNS Beach Club", image: "finns-beach-club.webp", description: "Friends raising drinks under yellow umbrellas at FINNS Beach Club" },
  { ...showcase[0], image: "experience-spa.webp" },
  { ...showcase[3], title: "Floating breakfast", image: "experience-breakfast.webp" },
  { ...showcase[4], title: "Sunset in Bali", image: "experience-sunset.webp" },
];

export const questions = [
  {
    question: "Are there any upfront or monthly fees?",
    answer: "No. VIPscore.ai does not charge registration, setup, or monthly subscription fees.",
  },
  {
    question: "How does my property benefit?",
    answer:
      "Creator features give potential guests a closer look at your property. You can also help guests discover experiences in Bali and open up revenue opportunities beyond accommodation.",
  },
  {
    question: "When does my property pay commission?",
    answer:
      "Your partnership agreement sets out which reservations or experiences qualify for commission and when payment is due.",
  },
  {
    question: "What experiences can we offer guests?",
    answer:
      "Examples include beach club access, spa days, floating breakfasts, and sunset outings. The partnership team can confirm what’s available for your property.",
  },
  {
    question: "How are cancellations and commission payments handled?",
    answer:
      "The partnership team can walk you through the cancellation terms, how they affect commission, and the payment schedule before you join.",
  },
];

export const interestOptions = {
  updates: {
    title: "Get Launch Updates",
    description: "Leave your email to register your interest in the VIPCIRCLE launch.",
  },
  circle: {
    title: "Become a VIPCIRCLE Member",
    description: "Register your interest in joining the VIPCIRCLE community.",
  },
  partner: {
    title: "Become a Partner",
    description: "Tell us a little about yourself and your property.",
  },
};
