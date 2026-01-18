'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

// Language options
const LANGUAGES = [
  'French',
  'English',
  'Spanish',
  'Mandarin Chinese',
  'Hindi',
  'Arabic',
  'Portuguese',
  'Bengali',
  'Russian',
  'Urdu',
  'Indonesian',
  'German',
  'Japanese',
  'Swahili',
  'Turkish',
]

// English content (default)
const ENGLISH_CONTENT = {
  hero: {
    headline: "We design, build, and operate systems that allow culture to function, scale, and endure.",
    description: "Innova Museums is a global institution dedicated to the architecture of cultural ecosystems. We work with museums, governments, and cultural organizations to design and operate integrated systems that unify access, intelligence, inclusion, and long-term sustainability."
  },
  section1: {
    title: "An Institution for Cultural Systems",
    content: [
      "Innova Museums was created to address a fundamental shift in how culture operates.",
      "Cultural institutions today are responsible for far more than preservation and exhibition. They must manage access, data, education, inclusion, public accountability, and financial sustainability within increasingly complex environments. Yet the systems supporting these responsibilities remain fragmented and structurally misaligned.",
      "Innova Museums operates as an institutional platform that designs and runs cultural systems at scale. Our role is to translate cultural mission into operational reality through integrated infrastructures that align technology, governance, intelligence, and human experience.",
      "We operate globally, across institutions of all sizes, designing systems intended to endure across decades rather than cycles."
    ]
  },
  section2: {
    title: "A Sector Without Integrated Infrastructure",
    content: [
      "Across the world, cultural institutions operate within fragmented operational environments.",
      "Digital transformation is often tool-driven rather than systemic. Accessibility commitments are rarely verified operationally. Data exists but remains disconnected and underutilized. Financial sustainability is treated tactically instead of structurally.",
      "The absence of integrated cultural infrastructure limits institutional autonomy, clarity, and long-term resilience.",
      
    ]
  },
  section3: {
    title: "Designing Culture as Infrastructure",
    content: [
      "Innova Museums operates through a systems-first methodology.",
      "We design long-term cultural infrastructures rather than isolated initiatives.",
      "We integrate intelligence, access, and inclusion into unified architectures.",
      "We treat data and cultural knowledge as strategic institutional assets.",
      "We embed inclusion as an operational standard, supported by funding and verification.",
      "Technology functions as an enabling layer within a broader governance and human context.",
      "This approach allows multiple platforms to coexist within a single ecosystem, each fulfilling a defined institutional role while reinforcing shared strategic objectives."
    ]
  },
  section4: {
    title: "An Integrated Cultural Architecture"
  },
  ecosystem: {
    canadianMuseums: {
      title: "Canadian Museums",
      subtitle: "National Cultural Discovery & Engagement Platform",
      content: [
        "Canadian Museums is the national cultural platform developed and operated by Innova Museums to connect the public with museums and cultural institutions across Canada.",
        "It serves as both a discovery interface for audiences and a visibility and engagement engine for institutions. Canadian Museums also functions as a real-world deployment environment where cultural intelligence, accessibility standards, and audience behavior are tested and validated at scale.",
        "At the core of Canadian Museums is Kanata the Bear™, the first cultural guide to implement the EVE™ conversational AI framework in public practice.",
        "Kanata combines personality-driven interaction with intelligent cultural curation, guiding visitors through museums and cultural content in an adaptive, inclusive, and context-aware manner.",
        "Kanata represents the transition from static cultural listings to intelligent, conversational cultural mediation."
      ]
    },
    innovaTickets: {
      title: "Innova Tickets",
      subtitle: "Cultural Ticketing Infrastructure",
      content: [
        "Innova Tickets is a SaaS-based ticketing infrastructure designed specifically for cultural and educational institutions.",
        "It provides institutions with full autonomy over event creation, pricing, access control, and visitor flow, supported by AI-driven fraud prevention and real-time analytics. The platform scales globally across currencies, languages, and jurisdictions while remaining lightweight and governance-aware.",
        "Innova Tickets integrates directly with Canadian Museums, linking discovery and access within a single ecosystem."
      ]
    },
    maiseums: {
      title: "mAIseums™",
      subtitle: "The Worlds First Cultural Deep AI™",
      content: [
        "mAIseums™ is the world's first Cultural Deep AI™, designed to activate the latent intelligence embedded in museums, archives, and cultural datasets.",
        "Built on advanced Retrieval-Augmented Generation architecture, mAIseums™ transforms fragmented cultural records into a unified, conversational intelligence layer.",
        "At its core operates EVE™, the Cultural AI Guide™, enabling multilingual, context-aware interaction for visitors, researchers, educators, and institutional leaders.",
        "mAIseums™ delivers cultural insight, discovery, and institutional intelligence while preserving ethical AI principles and full data sovereignty."
      ]
    },
    inclusion: {
      title: "Innova Community & Inclusion",
      subtitle: "Verified Accessibility & Cultural Dignity Systems",
      content: [
        "Innova Community & Inclusion establishes funded, verifiable systems that transform inclusion into operational reality.",
        "Its framework rests on three pillars:",
        "Circular financing models that sustain accessibility independently",
        "Early pedagogical education that prepares audiences before arrival",
        "Verified experience standards based on audited, real-world data",
        "This initiative positions accessibility as an institutional responsibility—measured, financed, and governed."
      ]
    }
  },
  section5: {
    title: "Our Work in Practice",
    content: [
      "Innova Museums delivers end-to-end cultural systems through a combination of strategic, technical, and educational capabilities.",
      "Our work includes:",
      "Institutional strategy and cultural systems architecture",
      "Design and deployment of digital cultural platforms",
      "Integration of intelligence, access, and inclusion systems",
      "Long-term operational partnerships with institutions",
      "Governance-aware technology implementation",
      "Executive advisory, consulting, and institutional assessments",
      "Professional training, courses, talks, and capacity-building programs",
      "We partner with institutions prepared to evolve structurally and operate with long-term vision."
    ]
  },
  section6: {
    title: "Designed for Global Application",
    content: [
      "Canada serves as our institutional laboratory.",
      "Our systems are designed for global deployment.",
      "Multi-language, multi-currency, and multi-jurisdictional by design, Innova Museums supports cultural sovereignty while enabling international scalability.",
      "Our work is built for decades, not cycles."
    ]
  },
  contact: {
    title: "Institutional Dialogue",
    content: "Innova Museums engages with institutions seeking structural cultural transformation and long-term partnership.",
    buttonText: "Contact Us"
  },
  footer: {
    content: "We acknowledge that our work takes place on the traditional, ancestral, and unceded territories of Indigenous Peoples. We recognize and respect their enduring presence, knowledge, and contributions, and reaffirm our commitment to cultural responsibility, inclusion, and reconciliation."
  }
};

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [isTranslated, setIsTranslated] = useState(false)
  const [translations, setTranslations] = useState<any>(ENGLISH_CONTENT)

  const handleLanguageSelect = async (language: string) => {
    setSelectedLanguage(language)
    setIsTranslated(true)

    if (language !== 'English') {
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            language,
            sections: ['hero', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'contact', 'footer']
          })
        })

        const data = await response.json()

        if (data.success && data.translations) {
          setTranslations(data.translations)
        }
      } catch (error) {
        console.error('Translation failed:', error)
      }
    } else {
      setTranslations(ENGLISH_CONTENT)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                src="/innova-logo.png"
                alt="Innova Museums"
                className="h-10 sm:h-12 w-auto"
              />
              <span className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                Innova Museums
              </span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-accent">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Language</span>
                    <span className="sm:hidden">{selectedLanguage.substring(0, 2)}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 max-h-96 overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => handleLanguageSelect(lang)}
                      className={selectedLanguage === lang ? 'bg-accent' : ''}
                    >
                      {lang}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Current Language Badge */}
              {isTranslated && selectedLanguage !== 'English' && (
                <span className="text-xs sm:text-sm bg-primary/20 text-primary px-3 py-1 rounded-full font-medium">
                  {selectedLanguage}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/85" />
          <div className="absolute inset-0">
            <img
              src="/images/hero.png"
              alt="Cultural systems architecture"
              className="w-full h-full object-cover opacity-70"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 max-w-5xl mx-auto leading-tight">
              {translations.hero.headline}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
              {translations.hero.description}
            </p>
          </div>
        </section>

        {/* Section 1: Institutional Definition */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/institutional.png"
              alt="Monumental cultural architecture"
              className="w-full h-full object-cover opacity-65"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-card/60" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 tracking-tight">
                {translations.section1.title}
              </h2>
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                {translations.section1.content.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Global Cultural Challenge */}
        <section className="relative py-24 sm:py-32 overflow-hidden bg-card/50">
          <div className="absolute inset-0">
            <img
              src="/images/challenge.png"
              alt="Disconnected systems"
              className="w-full h-full object-cover opacity-55"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/75 to-background/65" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 tracking-tight">
                {translations.section2.title}
              </h2>
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                {translations.section2.content.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <p className="text-foreground font-semibold text-xl sm:text-2xl md:text-3xl mt-8 sm:mt-12">
                {translations.section2.content[3]}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Systemic Approach */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/approach.png"
              alt="Abstract systems on cultural spaces"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-card/70" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 tracking-tight">
                {translations.section3.title}
              </h2>
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>{translations.section3.content[0]}</p>
                <ul className="space-y-4 sm:space-y-6">
                  {translations.section3.content.slice(1, 5).map((item: string, index: number) => (
                    <li className="flex items-start" key={index + 1}>
                      <span className="text-primary mr-3 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>{translations.section3.content[6]}</p>
                <p>{translations.section3.content[7]}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Ecosystem */}
        <section className="relative py-24 sm:py-32 overflow-hidden bg-card/50">
          <div className="absolute inset-0">
            <img
              src="/images/canadian-museums.png"
              alt="Canadian museums and visitors"
              className="w-full h-full object-cover opacity-45"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/80 to-background/75" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
                {translations.section4.title}
              </h2>
            </div>

            <div className="grid gap-12 sm:gap-16 lg:gap-20 max-w-6xl mx-auto">
              {/* 4.1 Canadian Museums */}
              <div className="max-w-4xl mx-auto">
                <img
                  src="/images/canadian-museums-bear.jpg"
                  alt="Kanata Bear - Canadian Museums cultural guide"
                  className="w-full h-auto object-contain"
                />
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center mt-6">
                  {translations.ecosystem.canadianMuseums.title}
                </h3>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/80 text-center">
                  {translations.ecosystem.canadianMuseums.subtitle}
                </p>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {translations.ecosystem.canadianMuseums.content.map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-card rounded-lg border border-border">
                  <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">
                    Kanata the Bear™ — Conversational Cultural Guide
                  </h4>
                  <p className="text-sm sm:text-base">
                    At the core of Canadian Museums is Kanata the Bear™, the first cultural guide to implement the EVE™ conversational AI framework in public practice.
                  </p>
                  <p className="text-sm sm:text-base mt-3 sm:mt-4">
                    Kanata combines personality-driven interaction with intelligent cultural curation, guiding visitors through museums and cultural content in an adaptive, inclusive, and context-aware manner.
                  </p>
                  <p className="text-sm sm:text-base mt-3 sm:mt-4">
                    Kanata represents the transition from static cultural listings to intelligent, conversational cultural mediation.
                  </p>
                </div>
              </div>

              {/* 4.2 Innova Tickets */}
              <div className="max-w-4xl mx-auto">
                <img
                  src="/images/innova-tickets-scanning.jpg"
                  alt="Innova Tickets - Scanning ticket design"
                  className="w-full h-auto object-contain"
                />
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center mt-6">
                  {translations.ecosystem.innovaTickets.title}
                </h3>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/80 text-center">
                  {translations.ecosystem.innovaTickets.subtitle}
                </p>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {translations.ecosystem.innovaTickets.content.map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* 4.3 mAIseums */}
              <div className="max-w-4xl mx-auto">
                <img
                  src="/images/maiseums-extraterrestrial.jpg"
                  alt="mAIseums - Cultural Deep AI with extraterrestrial"
                  className="w-full h-auto object-contain"
                />
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center mt-6">
                  {(translations.ecosystem.maiseums.subtitle)}
                </h3>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/80 text-center">
                  {translations.ecosystem.maiseums.subtitle}
                </p>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {translations.ecosystem.maiseums.content.map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* 4.4 Innova Community & Inclusion */}
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center mt-6">{translations.ecosystem.inclusion.title}</h3>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/80 text-center">
                  {translations.ecosystem.inclusion.subtitle}
                </p>
                <img
                  src="/images/community-inclusion.jpg"
                  alt="Innova Community & Inclusion - Accessibility and dignity"
                  className="w-full h-auto object-contain mb-6"
                />
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {translations.ecosystem.inclusion.content.map((paragraph: string, index: number) => {
                    if (paragraph.includes('Its framework rests on three pillars:')) {
                      return (
                        <p key={index}>{paragraph}</p>
                      )
                    }
                    return <p key={index}>{paragraph}</p>
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: What We Do */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/what-we-do.png"
              alt="Teams working within institutions"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-card/70" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 tracking-tight">
                {translations.section5.title}
              </h2>
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>{translations.section5.content[0]}</p>
                <p>{translations.section5.content[1]}:</p>
                <ul className="space-y-3 sm:space-y-4">
                  {translations.section5.content.slice(2, 9).map((item: string, index: number) => (
                    <li className="flex items-start" key={index + 2}>
                      <span className="text-primary mr-3 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Global Vision */}
        <section className="relative py-24 sm:py-32 overflow-hidden bg-card/50">
          <div className="absolute inset-0">
            <img
              src="/images/global-vision.png"
              alt="Global cultural landmarks"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/80 to-background/75" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 tracking-tight">
                {translations.section6.title}
              </h2>
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                {translations.section6.content.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 tracking-tight">
                {translations.contact.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12 sm:mb-16">
                {translations.contact.content}
              </p>
              <a 
  href="mailto:info@canadian-museums.ca" 
  className="inline-flex items-center justify-center px-12 py-6 text-xl font-semibold bg-white text-black hover:bg-gray-200 transition-all rounded-md"
>
  Contact Us
</a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-card border-t border-border py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-4 mb-6">
              {translations.footer.content}
            </p>
            <div className="flex items-center justify-center space-x-3 text-xs sm:text-sm text-muted-foreground">
              <img
                src="/canada-flag.svg"
                alt="Canada flag"
                className="w-4 h-3 sm:w-5 sm:h-4"
              />
              <span>© 2026 Innova Museums Ltd. Developed in Vancouver, Canada</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
