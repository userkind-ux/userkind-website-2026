'use client';

import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { VideoSection } from './sections/VideoSection';
import { LogoTicker } from './sections/LogoTicker';
import { BenefitsSection } from './sections/BenefitsSection';
import { TestimonialsTicker } from './sections/TestimonialsTicker';
import { ServicesSection } from './sections/ServicesSection';
import { ServicesTicker } from './sections/ServicesTicker';
import { USPSection } from './sections/USPSection';
import { ClientsSection } from './sections/ClientsSection';
import { FoundersSection } from './sections/FoundersSection';
import { ContactSection } from './sections/ContactSection';

export function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <VideoSection />
        <LogoTicker />
        <BenefitsSection />
        <TestimonialsTicker />
        <ServicesSection />
        <ServicesTicker />
        <USPSection />
        <ClientsSection />
        <FoundersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

