export const TICKER_ITEMS = [
  "website design",
  "mobile app development",
  "digital marketing",
  "branding",
  "website development",
];

export const NAV_LINKS = [
  { section: "info", label: "Home", variant: "home" as const },
  { section: "reasons", label: "Benefits", variant: "nav" as const },
  { section: "services", label: "Services", variant: "nav" as const },
  { section: "projects", label: "Projects", variant: "nav" as const },
  { section: "blog", label: "Blog", variant: "nav" as const },
  { section: "footer", label: "About", variant: "nav" as const },
  { section: "qa", label: "Contact Us", variant: "contact" as const },
];

export const SERVICE_RANGES = [
  "$1.000 - $100.000+",
  "$500 - $60.000+",
  "$1.720 - $40.000+",
  "$6.000 - $80.000+",
];

export const PROJECTS = [
  {
    name: "OmniHub",
    category: "Mobile App & Web",
    liveProduct: "Active",
    description:
      "OmniHub is a multichain launchpad that empowers anyone to turn ideas into digital collectibles. Create, buy, and sell blockchain collectibles with AI-powered art generation. No coding required.",
    image: "/assets/images/projects/omnihub.png",
    href: "https://omnihub.xyz/",
    tags: ["NFT", "Blockchain", "AI Art", "Marketplace", "Web3"],
  },
  {
    name: "MT Technology",
    category: "Data & Smart Platform",
    liveProduct: "Active",
    description:
      "A data-driven metal trading platform that uses parsing and AI technologies to turn raw market data into structured, sell-ready insights for traders and businesses.",
    image: "/assets/images/projects/technology.png",
    href: "https://mttechnology.eu/",
    tags: ["Data Analytics", "AI", "Trading", "B2B", "Automation"],
  },
  {
    name: "Phuket Estate",
    category: "Real Estate Platform",
    liveProduct: "Active",
    description:
      "A smart real estate platform that organizes property listings, market filters, and analytics into one strategic investment tool for the Phuket property market.",
    image: "/export.png",
    href: "https://phuket-estate.ru/",
    tags: ["Real Estate", "Search", "Analytics", "Listings", "Investment"],
  },
  {
    name: "Moadeep",
    category: "Loyalty & Engagement",
    liveProduct: "In Progress",
    description:
      "A modular digital loyalty & engagement platform that turns everyday visits into progress, rewards, and long-term user connection for businesses of any size.",
    image: "/assets/images/projects/moadeep.png",
    href: undefined as string | undefined,
    tags: ["Loyalty", "SaaS", "Engagement", "Mobile App", "Rewards"],
  },
];

export const SOCIAL_LINKS = [
  {
    iconSrc: "/assets/images/footer/linkedin.svg",
    iconAlt: "LinkedIn",
    title: "LINKEDIN",
    subtitle: "@TrealWay",
    href: "https://www.linkedin.com/in/maksim-stetsenko-9099b8202/",
  },
  {
    iconSrc: "/assets/images/footer/facebook.svg",
    iconAlt: "Facebook",
    title: "FACEBOOK",
    subtitle: "@TrealWay",
    href: "https://www.facebook.com/share/1CHYjqn4SE/?mibextid=wwXIfr",
  },
  {
    iconSrc: "/assets/images/footer/whatsapp.svg",
    iconAlt: "WhatsApp",
    title: "WHATSAPP",
    subtitle: "+380669459608",
    href: "https://wa.me/380669459608",
  },
  {
    iconSrc: "/assets/images/footer/telegram.svg",
    iconAlt: "Telegram",
    title: "TELEGRAM",
    subtitle: "@MarenkoMaksim",
    href: "https://t.me/MarenkoMaksim",
  },
];

export const BLOG_ARTICLE_IDS = [
  "ai-transforming-business-2026",
  "mobile-first-strategy",
  "saas-loyalty-systems",
];

export const BLOG_ARTICLE_IMAGES = [
  "/assets/images/projects/technology.png",
  "/assets/images/projects/omnihub.png",
  "/assets/images/projects/moadeep.png",
];
