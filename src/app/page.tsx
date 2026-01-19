
import React from 'react';
import { Globe, ChevronRight } from 'lucide-react';
import { ENGLISH_CONTENT } from './constants';

const App: React.FC = () => {
  const t = ENGLISH_CONTENT;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-white selection:text-black">
      
      {/* Header Estático Simplificado */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
               <span className="text-black font-black text-lg italic">I</span>
            </div>
            <span className="text-lg font-bold tracking-tighter uppercase">Innova Museums</span>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
            <Globe className="w-4 h-4 text-zinc-500" />
            <div id="google_translate_element"></div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
             <img 
               src="https://images.unsplash.com/photo-1518998053502-53cc83e9c5ec?auto=format&fit=crop&q=80&w=2000" 
               className="w-full h-full object-cover" 
               alt="Background"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl mb-8">
              {t.hero.headline}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl">
              {t.hero.description}
            </p>
          </div>
        </section>

        {/* Section 1 & 2: Context */}
        <section className="py-24 bg-zinc-950">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-3xl font-bold mb-8">{t.section1.title}</h2>
                <div className="space-y-6 text-zinc-400 text-lg">
                  {t.section1.content.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
              <div className="bg-zinc-900/50 p-10 border border-zinc-800 rounded-lg">
                <h2 className="text-3xl font-bold mb-8">{t.section2.title}</h2>
                <div className="space-y-6 text-zinc-300 text-lg">
                  {t.section2.content.map((p, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-zinc-600 font-mono">/0{i+1}</span>
                      <p>{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Methodology */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16 text-center">{t.section3.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.section3.content.map((text, i) => (
                <div key={i} className="p-8 bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 transition-colors">
                  <p className="text-zinc-300 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Ecosystem */}
        <section className="py-24 bg-zinc-950">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-24 text-center">
              {t.section4.title}
            </h2>
            
            <div className="grid gap-32">
              {/* Items mapping */}
              {[t.ecosystem.canadianMuseums, t.ecosystem.innovaTickets, t.ecosystem.maiseums, t.ecosystem.inclusion].map((item, i) => (
                <div key={i} className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                    <h3 className="text-4xl font-bold mb-2">{item.title}</h3>
                    <p className="text-zinc-500 font-mono uppercase tracking-widest text-sm mb-8">{item.subtitle}</p>
                    <div className="space-y-4 text-zinc-400">
                      {item.content.map((p, idx) => <p key={idx}>{p}</p>)}
                    </div>
                  </div>
                  <div className={`aspect-video bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <div className="w-full h-full flex items-center justify-center text-zinc-800 font-black text-4xl">
                      {item.title.split(' ')[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 & 6: Global & Practice */}
        <section className="py-24 bg-black border-t border-zinc-900">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-3xl font-bold mb-8">{t.section5.title}</h2>
                <div className="space-y-4">
                  {t.section5.content.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded border border-zinc-800">
                      <ChevronRight className="w-4 h-4 text-zinc-600" />
                      <span className="text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-8">{t.section6.title}</h2>
                <div className="space-y-6 text-xl text-zinc-400">
                  {t.section6.content.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-32 bg-zinc-950 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-black mb-6">{t.contact.title}</h2>
            <p className="text-xl text-zinc-500 mb-12 max-w-2xl mx-auto">{t.contact.content}</p>
            <a 
              href="mailto:info@innova-museums.com"
              className="px-12 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              {t.contact.buttonText}
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-zinc-900 py-16">
        <div className="container mx-auto px-6">
          <p className="text-zinc-600 text-xs md:text-sm uppercase tracking-[0.2em] leading-relaxed max-w-4xl">
            {t.footer.content}
          </p>
          <div className="mt-12 pt-8 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-800 font-mono">
            <span>© 2026 INNOVA MUSEUMS LTD.</span>
            <span>SYSTEMS ARCHITECTURE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};