import dynamic from "next/dynamic";
import { Header, Info, BackgroundAnimation } from "@/components";

const Reasons = dynamic(() => import("@/components/landing/Reasons").then((m) => ({ default: m.Reasons })));
const Services = dynamic(() => import("@/components/landing/Services").then((m) => ({ default: m.Services })));
const Projects = dynamic(() => import("@/components/landing/Projects").then((m) => ({ default: m.Projects })));
const Blog = dynamic(() => import("@/components/landing/Blog").then((m) => ({ default: m.Blog })));
const FAQ = dynamic(() => import("@/components/contact/FAQ").then((m) => ({ default: m.FAQ })));
const QA = dynamic(() => import("@/components/contact/QA").then((m) => ({ default: m.QA })));
const Footer = dynamic(() => import("@/components/contact/Footer").then((m) => ({ default: m.Footer })));
const ScrollUp = dynamic(() => import("@/components/shell/ScrollUp").then((m) => ({ default: m.ScrollUp })));
const ConsultationPopup = dynamic(() =>
  import("@/components/ui/ConsultationPopup").then((m) => ({ default: m.ConsultationPopup })),
);

export default function HomePage() {
  return (
    <>
      <BackgroundAnimation />

      <div className="fixed top-0 left-0 right-0 z-[1000] w-full">
        <Header />
      </div>
      <div className="h-16 shrink-0" aria-hidden />

      <main className="relative z-10 mx-auto flex w-full max-w-[1400px] min-w-0 flex-col items-stretch gap-20 px-4 pb-6 md:gap-28 md:px-8 lg:gap-36 lg:px-16">
        <Info />
        <Reasons />
        <Services />
        <Projects />
        <Blog />
        <FAQ />
        <QA />
        <Footer />
      </main>

      <ScrollUp />
      <ConsultationPopup />
    </>
  );
}
