import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Website content sections for translation
const WEBSITE_CONTENT = {
  hero: {
    headline: "We design, build, and operate the systems that allow culture to function, scale, and endure.",
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
      "Innova Museums exists to provide that missing structure."
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
      subtitle: "The World's First Cultural Deep AI™",
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

let zaiInstance: any = null;

async function getZAIInstance() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

async function translateText(text: string, targetLanguage: string): Promise<string> {
  const zai = await getZAIInstance();

  const languagePrompt = `You are a professional translator. Translate the following text to ${targetLanguage}. Keep the meaning exactly the same but use natural, professional language in the target language. IMPORTANT: Return ONLY the plain text translation - NO JSON, NO HTML, NO markdown, NO formatting, NO explanations, NO extra text. Just the translated plain text.`;

  const completion = await zai.chat.completions.create({
    messages: [
      {
        role: 'assistant',
        content: languagePrompt
      },
      {
        role: 'user',
        content: text
      }
    ],
    thinking: { type: 'disabled' }
  });

  let translated = completion.choices[0]?.message?.content || text;

  // Clean the response - remove any HTML tags, JSON formatting, or markdown
  translated = translated
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove JSON markers
    .replace(/```json/g, '')
    .replace(/```html/g, '')
    .replace(/```/g, '')
    // Remove markdown bold/italic markers
    .replace(/\*\*/g, '')
    .replace(/__/g, '')
    // Clean up any remaining JSON-like structures
    .replace(/\\{[^}]*\\}/g, '')
    .replace(/\[[^\]]*\]/g, '')
    // Remove quotes if they wrap JSON-like content
    .replace(/^"(.*)"$/gm, '$1')
    .replace(/^'(.*)'$/gm, '$1')
    .trim();

  return translated;
}

async function translateContent(content: any, targetLanguage: string): Promise<any> {
  const zai = await getZAIInstance();

  if (Array.isArray(content)) {
    const translated = await Promise.all(
      content.map(async (item) => {
        const languagePrompt = `You are a professional translator. Translate the following text to ${targetLanguage}. Keep the meaning exactly the same but use natural, professional language in the target language. Do NOT add explanations or extra text - just provide the translation.`;

        const completion = await zai.chat.completions.create({
          messages: [
            {
              role: 'assistant',
              content: languagePrompt
            },
            {
              role: 'user',
              content: item
            }
          ],
          thinking: { type: 'disabled' }
        });
        return completion.choices[0]?.message?.content || item;
      })
    );
    return translated;
  } else if (typeof content === 'object' && content !== null) {
    const translated: any = {};
    for (const [key, value] of Object.entries(content)) {
      if (typeof value === 'string') {
        translated[key] = await translateText(value, targetLanguage);
      } else if (Array.isArray(value)) {
        translated[key] = await translateContent(value, targetLanguage);
      } else {
        translated[key] = value;
      }
    }
    return translated;
  }
  return await translateText(content, targetLanguage);
}

export async function POST(request: NextRequest) {
  try {
    const { language, sections } = await request.json();

    if (!language || !sections) {
      return NextResponse.json(
        { error: 'Language and sections are required' },
        { status: 400 }
      );
    }

    console.log(`Translating to ${language} for sections:`, sections);

    const translations: Record<string, any> = {};

    for (const section of sections) {
      if (section === 'full') {
        translations.full = WEBSITE_CONTENT;
      } else if (WEBSITE_CONTENT[section as keyof typeof WEBSITE_CONTENT]) {
        translations[section] = await translateContent(WEBSITE_CONTENT[section as keyof typeof WEBSITE_CONTENT], language);
      } else {
        translations[section] = null;
      }
    }

    return NextResponse.json({
      success: true,
      language: language,
      translations
    });
  } catch (error: any) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    availableLanguages: [
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
      'Turkish'
    ],
    sections: Object.keys(WEBSITE_CONTENT)
  });
}
