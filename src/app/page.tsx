'use client'

import { useState, useEffect, useRef } from 'react'
import { Globe, ChevronDown } from 'lucide-react'

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
]

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    setIsOpen(false)

    // Cargar Google Translate dinámicamente
    const googleTranslateScript = document.createElement('script')
    googleTranslateScript.type = 'text/javascript'
    googleTranslateScript.async = true

    googleTranslateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'

    ;(window as any).googleTranslateElementInit = function() {
      new (window as any).google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: langCode,
        autoDisplay: false
      }, 'google_translate_element')

      // Simular cambio de idioma en Google Translate
      setTimeout(() => {
        const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement
        if (selectElement) {
          selectElement.value = langCode
          selectElement.dispatchEvent(new Event('change'))
        }
      }, 1000)
    }

    document.body.appendChild(googleTranslateScript)

    // O método alternativo: cambiar el hash de la URL
    window.location.hash = `googtrans(en|${langCode})`
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="/innova-logo.png" alt="Innova Museums" className="h-10 sm:h-12 w-auto" />
              <span className="text-lg sm:text-xl font-semibold tracking-tight text-white">Innova Museums</span>
            </div>

            {/* Language Selector with Globe Icon */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                aria-label="Select language"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                <ChevronDown className="w-3 h-3" />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 max-h-96 overflow-y-auto bg-card border border-border rounded-md shadow-lg z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors ${
                        currentLang === lang.code ? 'bg-accent' : ''
                      }`}
                    >
                      <span className="font-medium">{lang.name}</span>
                      <span className="ml-2 text-muted-foreground text-xs">({lang.nativeName})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hidden Google Translate Element (required for translation to work) */}
      <div id="google_translate_element" className="hidden" />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/85" />
          <div className="absolute inset-0">
            <img src="/images/hero.png" alt="Cultural systems architecture" className="w-full h-full object-cover opacity-70" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 max-w-5xl mx-auto leading-tight">
              We design, build, and operate systems that allow culture to function, scale, and endure.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
              Innova Museums is a global institution dedicated to the architecture of cultural ecosystems. We work with museums, governments, and cultural organizations to design and operate integrated systems that unify access, intelligence, inclusion, and long-term sustainability.
            </p>
          </div>
        </section>

        {/* Section 1: Institutional Definition */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/institutional.png" alt="Monumental cultural architecture" className="w-full h-full object-cover opacity-65" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-card/60" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 tracking-tight">
                An Institution for Cultural Systems
              </h2>
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>Innova Museums was created to address a fundamental shift in how culture operates.</p>
                <p>Cultural institutions today are responsible for far more than preservation and exhibition. They must manage access, data, education, inclusion, public accountability, and financial sustainability within increasingly complex environments. Yet the systems supporting these responsibilities remain fragmented and structurally misaligned.</p>
                <p>Innova Museums operates as an institutional platform that designs and runs cultural systems at scale. Our role is to translate cultural mission into operational reality through integrated infrastructures that align technology, governance, intelligence, and human experience.</p>
                <p>We operate globally, across institutions of all sizes, designing systems intended to endure across decades rather than cycles.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Global Cultural Challenge */}
        <section className="relative py-24 sm:py-32 overflow-hidden bg-card/50">
          <div className="absolute inset-0">
            <img src="/images/challenge.png" alt="Disconnected systems" className="w-full h-full object-cover opacity-55" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/75 to-background/65" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 tracking-tight">
                A Sector Without Integrated Infrastructure
              </h2>
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>Across the world, cultural institutions operate within fragmented operational environments.</p>
                <p>Digital transformation is often tool-driven rather than systemic. Accessibility commitments are rarely verified operationally. Data exists but remains disconnected and underutilized. Financial sustainability is treated tactically instead of structurally.</p>
              </div>
              <p className="text-foreground font-semibold text-xl sm:text-2xl md:text-3xl mt-8 sm:mt-12">
                The absence of integrated cultural infrastructure limits institutional autonomy, clarity, and long-term resilience.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Systemic Approach */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/approach.png" alt="Abstract systems on cultural spaces" className="w-full h-full object-cover opacity-50" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-card/70" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 tracking-tight">
                Designing Culture as Infrastructure
              </h2>
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>Innova Museums operates through a systems-first methodology.</p>
                <p>We design long-term cultural infrastructures rather than isolated initiatives.</p>
                <p>We integrate intelligence, access, and inclusion into unified architectures.</p>
                <p>We treat data and cultural knowledge as strategic institutional assets.</p>
                <p>We embed inclusion as an operational standard, supported by funding and verification.</p>
                <p>Technology functions as an enabling layer within a broader governance and human context.</p>
                <p>This approach allows multiple platforms to coexist within a single ecosystem, each fulfilling a defined institutional role while reinforcing shared strategic objectives.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Ecosystem */}
        <section className="relative py-24 sm:py-32 overflow-hidden bg-card/50">
          <div className="absolute inset-0">
            <img src="/images/canadian-museums.png" alt="Canadian museums and visitors" className="w-full h-full object-cover opacity-45" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/80 to-background/75" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
                An Integrated Cultural Architecture
              </h2>
            </div>

            <div className="grid gap-12 sm:gap-16 lg:gap-20 max-w-6xl mx-auto">
              {/* 4.1 Canadian Museums */}
              <div className="max-w-4xl mx-auto">
                <img src="/images/canadian-museums-bear.jpg" alt="Kanata Bear - Canadian Museums cultural guide" className="w-full h-auto object-contain" />
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center mt-6">
                  Canadian Museums
                </h3>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/80 text-center">
                  National Cultural Discovery & Engagement Platform
                </p>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  <p>Canadian Museums is the national cultural platform developed and operated by Innova Museums to connect the public with museums and cultural institutions across Canada.</p>
                  <p>It serves as both a discovery interface for audiences and a visibility and engagement engine for institutions. Canadian Museums also functions as a real-world deployment environment where cultural intelligence, accessibility standards, and audience behavior are tested and validated at scale.</p>
                  <p>At the core of Canadian Museums is Kanata the Bear™, the first cultural guide to implement the EVE™ conversational AI framework in public practice.</p>
                  <p>Kanata combines personality-driven interaction with intelligent cultural curation, guiding visitors through museums and cultural content in an adaptive, inclusive, and context-aware manner.</p>
                  <p>Kanata represents the transition from static cultural listings to intelligent, conversational cultural mediation.</p>
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
                <img src="/images/innova-tickets-scanning.jpg" alt="Innova Tickets - Scanning ticket design" className="w-full h-auto object-contain" />
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center mt-6">
                  Innova Tickets
                </h3>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/80 text-center">
                  Cultural Ticketing Infrastructure
                </p>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  <p>Innova Tickets is a SaaS-based ticketing infrastructure designed specifically for cultural and educational institutions.</p>
                  <p>It provides institutions with full autonomy over event creation, pricing, access control, and visitor flow, supported by AI-driven fraud prevention and real-time analytics. The platform scales globally across currencies, languages, and jurisdictions while remaining lightweight and governance-aware.</p>
                  <p>Innova Tickets integrates directly with Canadian Museums, linking discovery and access within a single ecosystem.</p>
                </div>
              </div>

              {/* 4.3 mAIseums */}
              <div className="max-w-4xl mx-auto">
                <img src="/images/maiseums-extraterrestrial.jpg" alt="mAIseums - Cultural Deep AI with extraterrestrial" className="w-full h-auto object-contain" />
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center mt-6">
                  mAIseums™
                </h3>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/80 text-center">
                  The World's First Cultural Deep AI™
                </p>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  <p>mAIseums™ is the world's first Cultural Deep AI™, designed to activate the latent intelligence embedded in museums, archives, and cultural datasets.</p>
                  <p>Built on advanced Retrieval-Augmented Generation architecture, mAIseums™ transforms fragmented cultural records into a unified, conversational intelligence layer.</p>
                  <p>At its core operates EVE™, the Cultural AI Guide™, enabling multilingual, context-aware interaction for visitors, researchers, educators, and institutional leaders.</p>
                  <p>mAIseums™ delivers cultural insight, discovery, and institutional intelligence while preserving ethical AI principles and full data sovereignty.</p>
                </div>
              </div>

              {/* 4.4 Innova Community & Inclusion */}
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center mt-6">
                  Innova Community & Inclusion
                </h3>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/80 text-center">
                  Verified Accessibility & Cultural Dignity Systems
                </p>
                <img src="/images/community-inclusion.jpg" alt="Innova Community & Inclusion - Accessibility and dignity" className="w-full h-auto object-contain mb-6" />
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  <p>Innova Community & Inclusion establishes funded, verifiable systems that transform inclusion into operational reality.</p>
                  <p>Its framework rests on three pillars:</p>
                  <p>Circular financing models that sustain accessibility independently</p>
                  <p>Early pedagogical education that prepares audiences before arrival</p>
                  <p>Verified experience standards based on audited, real-world data</p>
                  <p>This initiative positions accessibility as an institutional responsibility—measured, financed, and governed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: What We Do */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/what-we-do.png" alt="Teams working within institutions" className="w-full h-full object-cover opacity-50" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-card/70" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 tracking-tight">
                Our Work in Practice
              </h2>
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>Innova Museums delivers end-to-end cultural systems through a combination of strategic, technical, and educational capabilities.</p>
                <p>Our work includes:</p>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Institutional strategy and cultural systems architecture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Design and deployment of digital cultural platforms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Integration of intelligence, access, and inclusion systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Long-term operational partnerships with institutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Governance-aware technology implementation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Executive advisory, consulting, and institutional assessments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Professional training, courses, talks, and capacity-building programs</span>
                  </li>
                </ul>
                <p>We partner with institutions prepared to evolve structurally and operate with long-term vision.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Global Vision */}
        <section className="relative py-24 sm:py-32 overflow-hidden bg-card/50">
          <div className="absolute inset-0">
            <img src="/images/global-vision.png" alt="Global cultural landmarks" className="w-full h-full object-cover opacity-50" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/80 to-background/75" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 tracking-tight">
                Designed for Global Application
              </h2>
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>Canada serves as our institutional laboratory.</p>
                <p>Our systems are designed for global deployment.</p>
                <p>Multi-language, multi-currency, and multi-jurisdictional by design, Innova Museums supports cultural sovereignty while enabling international scalability.</p>
                <p>Our work is built for decades, not cycles.</p>
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
                Institutional Dialogue
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12 sm:mb-16">
                Innova Museums engages with institutions seeking structural cultural transformation and long-term partnership.
              </p>
              <a
                href="mailto:info@canadian-museums.ca"
                className="inline-block px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-md"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-card border-t border-border py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-4 mb-6">
              We acknowledge that our work takes place on the traditional, ancestral, and unceded territories of Indigenous Peoples. We recognize and respect their enduring presence, knowledge, and contributions, and reaffirm our commitment to cultural responsibility, inclusion, and reconciliation.
            </p>
            <div className="flex items-center justify-center space-x-3 text-xs sm:text-sm text-muted-foreground">
              <img src="/canada-flag.svg" alt="Canada flag" className="w-4 h-3 sm:w-5 sm:h-4" />
              <span>© 2026 Innova Museums Ltd. Developed in Vancouver, Canada</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
