import { setRequestLocale } from "next-intl/server";
import { Navbar, Footer } from "@/components/layout";
import {
  AnnouncementBanner,
  HeroSection,
  StatsSection,
  NavCardsSection,
  UpdatesSection,
  CommunitySection,
} from "@/components/homepage";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBanner />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <NavCardsSection />
        <UpdatesSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}
