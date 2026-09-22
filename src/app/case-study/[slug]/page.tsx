import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Terminal, CheckCircle2, ShieldCheck, Layers, Cpu, Database } from "lucide-react"
import { CASE_STUDIES } from "@/data/caseStudies"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = CASE_STUDIES[slug]

  if (!study) {
    return {
      title: "Case Study Not Found | chryzcode",
    }
  }

  return {
    title: `${study.title} — Case Study | Olanrewaju Alaba`,
    description: study.overview,
    openGraph: {
      title: `${study.title} — Technical Case Study`,
      description: study.overview,
      images: study.featuredImage ? [study.featuredImage] : [],
    }
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = CASE_STUDIES[slug]

  if (!study) {
    notFound()
  }

  const allSlugs = Object.keys(CASE_STUDIES)
  const currentIndex = allSlugs.indexOf(slug)
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length]
  const nextStudy = CASE_STUDIES[nextSlug]

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Top Header / Breadcrumb Bar */}
      <header className="border-b border-zinc-900 bg-black/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/#work" 
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-white transition-colors uppercase"
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>

          <div className="flex items-center gap-4">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-mono font-semibold tracking-wider hover:bg-zinc-200 transition-colors uppercase"
              >
                Live App <ExternalLink size={12} />
              </a>
            )}
            {study.githubUrl && (
              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-zinc-800 text-zinc-300 text-xs font-mono tracking-wider hover:border-white hover:text-white transition-colors uppercase"
              >
                Repository <Github size={12} />
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Project Header */}
        <section className="mb-16">
          <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono uppercase tracking-widest mb-6">
            Case Study // {study.category}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase tracking-tight mb-4">
            {study.title}
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-400 font-light max-w-3xl leading-relaxed mb-8">
            {study.subtitle}
          </p>

          {/* Quick Metrics / Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-zinc-950 border border-zinc-900 font-mono text-xs">
            <div>
              <span className="text-zinc-500 uppercase block mb-1">Role / Ownership</span>
              <span className="text-white font-medium">{study.role}</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase block mb-1">Timeline</span>
              <span className="text-white font-medium">{study.timeline}</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase block mb-1">Status</span>
              <span className="text-emerald-400 font-medium">{study.status}</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase block mb-1">Architecture Scope</span>
              <span className="text-white font-medium">{study.category.split('/')[0]}</span>
            </div>
          </div>
        </section>

        {/* Featured Preview Visual if present */}
        {study.featuredImage && (
          <section className="mb-16 border border-zinc-900 bg-zinc-950 overflow-hidden">
            <img 
              src={study.featuredImage} 
              alt={study.title}
              className="w-full h-auto max-h-[500px] object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700" 
            />
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* System Overview */}
            <section>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
                <Database size={14} /> 01 // System Overview
              </h2>
              <h3 className="text-2xl font-normal text-white uppercase mb-4">What The System Does</h3>
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-sans mb-4">
                {study.overview}
              </p>
              <div className="p-4 bg-zinc-950 border-l-2 border-white text-zinc-400 text-sm font-mono">
                {study.systemSummary}
              </div>
            </section>

            {/* Architecture Diagram */}
            <section>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
                <Terminal size={14} /> 02 // Architecture & Data Flow
              </h2>
              <h3 className="text-2xl font-normal text-white uppercase mb-4">End-to-End System Design</h3>
              <div className="bg-zinc-950 p-6 border border-zinc-900 overflow-x-auto">
                <pre className="font-mono text-xs text-zinc-300 leading-relaxed">
                  {study.architectureDiagram}
                </pre>
              </div>
            </section>

            {/* Key Contributions / What I Built */}
            <section>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
                <ShieldCheck size={14} /> 03 // Engineering Ownership
              </h2>
              <h3 className="text-2xl font-normal text-white uppercase mb-4">What I Personally Built</h3>
              <div className="space-y-3">
                {study.keyContributions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-zinc-950/60 border border-zinc-900/80">
                    <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm font-sans leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Engineering Challenges & Solutions */}
            <section>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
                <Cpu size={14} /> 04 // Technical Problems Solved
              </h2>
              <h3 className="text-2xl font-normal text-white uppercase mb-6">Engineering Challenges & Solutions</h3>
              <div className="space-y-6">
                {study.challenges.map((c, idx) => (
                  <div key={idx} className="p-6 bg-zinc-950 border border-zinc-900">
                    <div className="mb-4">
                      <span className="text-xs font-mono uppercase text-zinc-500 block mb-1">Challenge 0{idx + 1}</span>
                      <h4 className="text-white text-base font-semibold">{c.challenge}</h4>
                    </div>
                    <div className="pt-4 border-t border-zinc-900">
                      <span className="text-xs font-mono uppercase text-emerald-400 block mb-1">Engineering Solution</span>
                      <p className="text-zinc-400 text-sm leading-relaxed">{c.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Decisions */}
            <section>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
                <Layers size={14} /> 05 // Trade-offs
              </h2>
              <h3 className="text-2xl font-normal text-white uppercase mb-4">Key Architectural Decisions</h3>
              <ul className="space-y-3 list-disc pl-5 text-zinc-400 text-sm leading-relaxed">
                {study.keyDecisions.map((dec, idx) => (
                  <li key={idx} className="pl-1">{dec}</li>
                ))}
              </ul>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 bg-zinc-950 border border-zinc-900 sticky top-24">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4 pb-2 border-b border-zinc-900">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {study.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4 pb-2 border-b border-zinc-900">
                Explore Other Work
              </h4>
              <div className="space-y-2 font-mono text-xs">
                {allSlugs.map((sSlug) => {
                  const s = CASE_STUDIES[sSlug]
                  const isActive = sSlug === slug
                  return (
                    <Link
                      key={sSlug}
                      href={`/case-study/${sSlug}`}
                      className={`block p-3 border transition-colors ${
                        isActive 
                          ? 'border-white bg-zinc-900 text-white font-bold' 
                          : 'border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <div className="uppercase">{s.title}</div>
                      <div className="text-[10px] text-zinc-500">{s.category}</div>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900">
                <Link
                  href="/#contact"
                  className="w-full block text-center py-3 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors"
                >
                  Discuss This System
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Next Case Study Banner */}
        {nextStudy && (
          <section className="mt-20 pt-12 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                Next Case Study
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-white uppercase">
                {nextStudy.title}
              </h3>
              <p className="text-zinc-500 text-sm font-mono">{nextStudy.subtitle}</p>
            </div>
            <Link
              href={`/case-study/${nextSlug}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white hover:bg-white hover:text-black font-mono text-xs uppercase tracking-widest transition-colors"
            >
              Read Next <ArrowLeft size={14} className="rotate-180" />
            </Link>
          </section>
        )}
      </main>
    </div>
  )
}
