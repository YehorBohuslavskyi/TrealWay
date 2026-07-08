# Component structure

The app uses a **components** folder with small, repeatable pieces. The page composes from the top-level `@/components` index only.

## Principles

- **Small components**: Large sections are split into many smaller components (e.g. FAQItem, BudgetSlider, SocialLink).
- **Repeatable UI**: Shared pieces live in `components/ui` (Ticker, ScrollToSection, AnimatedCounter) and are reused across sections.
- **Single public API**: The page imports only from `@/components`; internal structure stays behind index exports.

## Structure

```
components/
├── index.ts              # Public API: Header, ScrollUp, Info, Reasons, Services, Projects, QA, Footer + ui
├── ui/                   # Repeatable primitives
│   ├── Ticker/
│   ├── ScrollToSection/
│   └── AnimatedCounter/
├── shell/                # App chrome
│   ├── Header/           # Logo, BurgerButton, NavBar
│   ├── ScrollUp/
│   ├── Logo/
│   ├── BurgerButton/
│   ├── NavBar/
│   └── NavLink/
├── landing/              # Hero, value, services, projects
│   ├── Info/             # HeroContent, HeroImage, StatsBar
│   ├── Reasons/          # ReasonCard (x4)
│   ├── Services/         # ServiceCard (x4)
│   ├── Projects/         # ProjectCard (x3)
│   ├── StatItem/
│   ├── StatsBar/
│   ├── HeroContent/
│   ├── HeroImage/
│   ├── ReasonCard/
│   ├── ServiceCard/
│   └── ProjectCard/
└── contact/              # FAQ, form, footer
    ├── QA/               # FAQItem (x5), ContactForm
    ├── Footer/           # PurposeBlock, SocialLink (x4), NewsletterBlock
    ├── FAQItem/
    ├── ContactForm/
    ├── BudgetSlider/
    ├── PurposeBlock/
    ├── SocialLink/
    └── NewsletterBlock/
```

## Shared kernel (`shared/`)

- `scrollToSection(section)` — used by NavLink, ScrollToSection (ui), PurposeBlock, ServiceCard.
- `feedbackApi.submitContact()` / `feedbackApi.subscribeEmail()` — used by ContactForm, NewsletterBlock.

## Adding components

1. Add a new small component in the right group (ui, shell, landing, contact).
2. Compose it in a parent or export it from the group index if the page should use it.
3. Optionally export from `components/index.ts` for top-level use.
