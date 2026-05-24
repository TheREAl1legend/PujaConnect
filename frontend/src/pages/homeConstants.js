import pujaData from "../data/pujaData";

export const pujaList = Object.entries(pujaData).map(([slug, value]) => ({
  slug,
  ...value,
}));

export const whyItems = [
  { title: "Spiritual Comfort", description: "Performing pujas creates peace at home and strengthens faith.", emoji: "🙏" },
  { title: "Blessings for Family", description: "Invites positive energy, health, and harmony for loved ones.", emoji: "🌸" },
  { title: "Ritual Guidance", description: "Experienced pandits guide every step of the ceremony.", emoji: "🕯️" },
];

export const steps = [
  { title: "Search", description: "Enter your city and discover local pandits instantly.", icon: "🔍", num: "01" },
  { title: "Choose Pandit", description: "Compare profiles, ratings, and services before booking.", icon: "👳", num: "02" },
  { title: "Book", description: "Confirm your date, time and let the pandit handle the rest.", icon: "✅", num: "03" },
];

export const testimonials = [
   { quote: "The pandit was knowledgeable and made our pooja experience enjoyable.", name: "John Doe", role: "Manager", initial: "N" },
  { quote: "The pandit was professional and delivered a quality service.", name: "Eve Smith", role: "Property Dealer", initial: "R" },
  { quote: "The pandit arrived on time and made our housewarming a memorable experience.", name: "Alice Johnson", role: "Landlord", initial: "A" },
];

export const stats = [
  { value: "500+", label: "Verified Pandits" },
  { value: "12K+", label: "Pujas Performed" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Cities Covered" },
];

export const whyCards = [
  { icon: "📍", title: "Verified Pandits", desc: "Only trusted pandits with real reviews and authentic backgrounds." },
  { icon: "💪", title: "Easy Booking", desc: "Fast search, clear packages, and confirmed bookings in a few clicks." },
  { icon: "💰", title: "Affordable Prices", desc: "Transparent fees and value-driven service for every ceremony." },
];