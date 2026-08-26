"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Navigation from "@/components/Navigation"
import CustomCursor from "@/components/CustomCursor"

import { 
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Code2,
  Quote,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  X,
  Youtube,
  Star,
  CheckCircle,
  FileText,
  Terminal,
  Database,
  Layers,
  Cpu,
  HelpCircle,
  BookOpen
} from "lucide-react"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [scrollYProgress, setScrollYProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showBackgroundAnimations, setShowBackgroundAnimations] = useState(false)
  const [activeProjectTab, setActiveProjectTab] = useState<'featured' | 'additional'>('featured')
  const [expandedProjectDetails, setExpandedProjectDetails] = useState<string | null>(null)
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    purpose: 'Job Opportunity',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  // Track scroll position to update active navigation highlights
  useEffect(() => {
    if (typeof window === "undefined") return

    let ticking = false
    let lastScrollY = 0

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY || 0
          const windowHeight = window.innerHeight || 0

          if (Math.abs(scrollY - lastScrollY) < 10) {
            ticking = false
            return
          }
          lastScrollY = scrollY

          const documentHeight = document.documentElement?.scrollHeight || 0
          const progress = documentHeight > windowHeight ? scrollY / (documentHeight - windowHeight) : 0
          setScrollYProgress(progress)

          let newSection = 0
          if (sectionsRef.current) {
            sectionsRef.current.forEach((section, index) => {
              if (!section) return
              const rect = section.getBoundingClientRect()
              if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.4) {
                newSection = index
              }
            })
          }
          setCurrentSection(newSection)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackgroundAnimations(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          to: 'alabaolanrewaju13@gmail.com'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setContactForm({ name: '', email: '', purpose: 'Job Opportunity', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Refined Skills Categorization
  const skillCategories = [
    {
      title: "Backend Engineering",
      icon: <Database size={16} className="text-white" />,
      skills: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Node.js", "Express.js", "FastAPI", "REST APIs"]
    },
    {
      title: "Frontend Engineering",
      icon: <Code2 size={16} className="text-white" />,
      skills: ["TypeScript", "React", "Next.js", "JavaScript", "Tailwind CSS"]
    },
    {
      title: "Cloud & Infrastructure",
      icon: <Cpu size={16} className="text-white" />,
      skills: ["AWS", "Docker", "Vercel", "Render", "DigitalOcean", "Git", "CI/CD"]
    },
    {
      title: "Payments & SaaS",
      icon: <Terminal size={16} className="text-white" />,
      skills: ["Stripe", "Payment Systems", "Subscriptions", "Webhooks", "API Integrations"]
    },
    {
      title: "AI & Blockchain",
      icon: <Layers size={16} className="text-white" />,
      skills: ["OpenAI", "AI Applications", "Solidity", "Smart Contracts", "Web3"]
    }
  ]

  // Curation of Engineering Focus (Competencies)
  const competencies = [
    {
      title: "Backend Engineering",
      description: "Building reliable APIs, backend services, authentication systems, business logic, and database-driven applications.",
      stack: "Python · Django · DRF · PostgreSQL",
      icon: <Database size={24} className="text-white" />
    },
    {
      title: "Full-Stack Applications",
      description: "Building production web applications from backend architecture and APIs through responsive React and Next.js interfaces.",
      stack: "React · Next.js · TypeScript",
      icon: <Layers size={24} className="text-white" />
    },
    {
      title: "Payments & SaaS",
      description: "Building checkout flows, subscription systems, payment integrations, webhooks, and SaaS functionality around real business requirements.",
      stack: "Stripe · Payments · Subscriptions · Webhooks",
      icon: <Terminal size={24} className="text-white" />
    },
    {
      title: "AI & Automation",
      description: "Integrating AI and automation into applications, APIs, and business workflows to create practical product experiences.",
      stack: "Python · OpenAI · APIs · Automation",
      icon: <Cpu size={24} className="text-white" />
    },
    {
      title: "Cloud & DevOps",
      description: "Deploying and maintaining production applications using cloud platforms, containers, CI/CD, and modern deployment workflows.",
      stack: "AWS · Docker · Vercel · Render",
      icon: <Code2 size={24} className="text-white" />
    },
    {
      title: "Blockchain",
      description: "Building blockchain applications and smart-contract integrations for payments, asset management, and decentralized applications.",
      stack: "Solidity · Smart Contracts · Web3",
      icon: <Layers size={24} className="text-white" />
    }
  ]

  // Curated list of Projects
  const featuredProjects = [
    {
      id: "clearpeak",
      title: "ClearPeak Trading",
      category: "SaaS / Trading Analytics",
      description: "Problem → Professional traders lacked a unified performance analytics system with high-probability indicators. Engineering → Built a scalable SaaS platform using Next.js, PostgreSQL, Prisma, Stripe, and Auth.js, with webhook-driven state machines for payment cycles. Result → Enabled real-time trade logs and visual statistics while protecting proprietary calculations under strict API guards.",
      details: {
        architecture: `Client (Next.js) ──► Serverless APIs ──► Prisma (ORM) ──► PostgreSQL (Neon DB)
                               │
                               └──► Stripe API (Webhooks) ──► DB Sync`,
        challenges: [
          "Secure execution and isolation of mathematical models for trade analysis.",
          "Preventing double-billing and data drift under race conditions via transactional Postgres updates.",
          "Processing high-frequency Webhook payloads securely and idempotently."
        ],
        decisions: [
          "Chose PostgreSQL with Prisma for type-safe relational mappings and reliable transactions.",
          "Implemented signature-verified Stripe webhooks paired with database locks for reliable payment processing."
        ]
      },
      technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL", "Neon"],
      link: "https://www.clearpeaktrading.com/",
      github: "",
      image: "/clearpeak-trading-proj.png"
    },
    {
      id: "nexapay",
      title: "NexaPay",
      category: "FinTech / Blockchain",
      description: "Problem → Accepting Web3 crypto payments is fragmented and lacks unified dashboard management. Engineering → Architected an interface mapping custom EVM smart contracts (Solidity) to Next.js clients using Ethers.js. Result → Delivered a secure system with real-time txn verification, minimizing decentralized payment friction.",
      details: {
        architecture: `EVM Blockchain (Ethereum/Sepolia) ──► Smart Contracts (Solidity)
                                                      ▲
                                                      │ (Ethers.js provider)
      Client (Next.js & TypeScript) ──────────────────┘`,
        challenges: [
          "Ensuring transaction integrity across asynchronous block confirmations.",
          "Preventing security vulnerabilities in payment-routing smart contracts."
        ],
        decisions: [
          "Used Hardhat to test gas optimization and contract invariants prior to testnet deployment.",
          "Leveraged OpenZeppelin standards for secure, audited contract foundations."
        ]
      },
      technologies: ["Next.js", "TypeScript", "Solidity", "Blockchain", "Smart Contracts", "Ethers.js"],
      link: "https://nexapay.vercel.app/",
      github: "",
      image: "/nexapay-proj.png"
    },
    {
      id: "mla-draft",
      title: "AI-powered MLA Draft Tool",
      category: "AI / SaaS",
      description: "Problem → Academic formatting standards are tedious to structure dynamically under user parameters. Engineering → Integrated OpenAI APIs with an automated Next.js workflow, persisting user logs in MongoDB. Result → Generated comprehensive, correctly cited MLA papers with automatic conversion to downloadable Microsoft Word (.docx) files.",
      details: {
        architecture: `Client (Next.js) ──► API Route (Edge) ──► OpenAI API (GPT-4)
                                  │
                                  ├──► MongoDB (Session Logs)
                                  └──► DOCX Engine (Docx.js Conversion)`,
        challenges: [
          "Streaming large LLM content blocks reliably into formatted files without client-side memory leakage.",
          "Maintaining semantic structural validity in generated files."
        ],
        decisions: [
          "Leveraged serverless API routes to delegate document generation processes and keep client payloads minimal.",
          "Created a key-value caching layer to prevent duplicate, expensive AI completions."
        ]
      },
      technologies: ["Next.js", "MongoDB", "Stripe", "OpenAI API", "Vercel"],
      link: "https://aja-pro-tools.vercel.app/",
      github: "",
      image: "/ai_powered_mla_proj.png"
    },
    {
      id: "travel-leaf",
      title: "Travel Leaf API",
      category: "Backend / API",
      description: "Problem → Third-party integrations in travel platforms require high latency management, rate limiting, and robust authentication. Engineering → Built a Node.js/Express REST API utilizing Passport.js (JWT/OAuth), MongoDB schemas, Cloudinary media storage, and security middlewares. Result → Shipped a secure backend system with clean Swagger documentation, structured rate limiting, and secure sessions.",
      technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "Passport.js", "Stripe", "Cloudinary"],
      link: "",
      github: "https://github.com/chryzcode",
      image: "/travel-leaf-api-proj.png"
    },
    {
      id: "ycsyh",
      title: "YCSYH",
      category: "E-commerce / Payments",
      description: "Problem → Digital beat storefronts suffer from download link leakage and unfulfilled purchases. Engineering → Developed a clean TypeScript/Next.js store leveraging Stripe sessions and automated PDF invoice/license generators. Result → Protected intellectual assets with expiring, pre-signed content delivery links triggered upon webhook verification.",
      technologies: ["Next.js", "Stripe", "TypeScript", "File Delivery", "PDF Generation"],
      link: "https://www.heardmusicycsyh.com/",
      github: "",
      image: "/ycsyh-proj.png"
    },
    {
      id: "mathpoint",
      title: "MathPoint",
      category: "E-Learning",
      description: "Problem → Gamified mathematics learning tools require responsive client interfaces alongside secure database synchronization. Engineering → Developed user dashboard and progress systems in Next.js, syncing metrics into MongoDB. Result → Created a high-performing pedagogical portal supporting customized worksheets and lesson logs.",
      technologies: ["TypeScript", "Next.js", "MongoDB", "Tailwind CSS", "Stripe"],
      link: "https://math-point.vercel.app/",
      github: "",
      image: "/mathpoint-proj.png"
    },
    {
      id: "fwc26",
      title: "FWC26 Website",
      category: "Business Consulting / SaaS",
      description: "Problem → Organizing multi-channel lead pipelines for high-traffic events requires extensive manual triage. Engineering → Consolidated Stripe checkout hooks, Mailchimp lists, Calendly event triggers, and OpenAI chatbots under a Next.js hub. Result → Automated prospect inquiries and booking workflows for FIFA World Cup 2026 local consultants.",
      technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Calendly", "OpenAI API", "Mailchimp"],
      link: "https://fwc26-project.vercel.app/",
      github: "",
      image: "/fwc26-proj.png"
    }
  ]

  const additionalProjects = [
    { title: "AssetFlow", technologies: ["Next.js", "Firebase", "Solidity", "Tailwind CSS"], link: "https://assetflow-site.vercel.app/" },
    { title: "CVBuild", technologies: ["Python", "Django", "DRF", "PostgreSQL", "jQuery"], link: "https://cvbuild.onrender.com/" },
    { title: "Shopit", technologies: ["Django", "PostgreSQL", "Paystack", "Flutterwave"], link: "https://shopit-t07j.onrender.com/" },
    { title: "PenPages", technologies: ["React.js", "MongoDB", "Express.js", "Node.js"], link: "https://penpages.netlify.app/" },
    { title: "E-Learn", technologies: ["TypeScript", "Next.js", "MongoDB", "Stripe"], link: "https://e-learn-app.vercel.app/" },
    { title: "Topspot", technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Stripe"], link: "https://properties.topspothub.com/" },
    { title: "TokenForge", technologies: ["Solidity", "Hardhat", "Ethers.js", "React"], link: "https://token-forge-app.vercel.app/" },
    { title: "Next Play Recovery", technologies: ["Next.js", "TypeScript", "MongoDB", "OpenAI API"], link: "https://www.nextplayrecovery.com/" }
  ]

  // Experience timeline data matching the resume
  const experience = [
    {
      role: "Lead Engineer",
      company: "Instasew",
      period: "2024 – Present",
      bullets: [
        "Led backend architecture and feature delivery for a scalable global marketplace, integrating logistics, payments, negotiation workflows, and enterprise operations.",
        "Built real-time DHL shipping integration and manual tracking for non-integrated carriers.",
        "Architected a 'Preferred Designer' negotiation system with dynamic bid recalculations and enhanced recommendation algorithms.",
        "Overhauled payout systems, integrating Stripe, PayPal, BNPL, and custom wallets with real-time reconciliation.",
        "Developed enterprise-tier user flows, tiered permissions, and admin dashboards for order and fulfillment management.",
        "Implemented secure onboarding with identity verification, real-time messaging, and AWS S3 media management."
      ]
    },
    {
      role: "Backend Engineer",
      company: "InstinctHub",
      period: "Nov 2023 – May 2024",
      bullets: [
        "Led backend development, building robust APIs, securing infrastructure, and designing core database layers.",
        "Integrated payment gateways (Paystack, PayPal) and USSD systems via Africa's Talking platforms for accessible transactions.",
        "Shipped features like 'Scoreboard' for the core EdTech application, improving student interaction and platform metrics."
      ]
    },
    {
      role: "Backend Engineer (Contract)",
      company: "Bizconnect",
      period: "2024",
      bullets: [
        "Built background automated systems enabling users to extract LinkedIn data, manage lead targets, and schedule email campaigns.",
        "Integrated secure subscription checkouts via Stripe, mapping role-based access permissions dynamically across the database.",
        "Hosted infrastructure components on AWS, tuning configurations for scalability and load protection."
      ]
    }
  ]

  // How I Work methodologies
  const methodologies = [
    {
      step: "01",
      title: "Understand",
      description: "I clarify the business requirements, performance constraints, user profiles, and technical requirements before writing any code."
    },
    {
      step: "02",
      title: "Design",
      description: "I define the system architecture, database models, API specs, security middleware, and integration strategies."
    },
    {
      step: "03",
      title: "Build",
      description: "I develop modular code, implement robust test coverage, verify security protocols, and integrate third-party dependencies."
    },
    {
      step: "04",
      title: "Ship",
      description: "I deploy applications to reliable cloud platforms, configure monitoring tools, document APIs, and iterate based on telemetry."
    }
  ]

  // Curated 3 strongest Testimonials
  const testimonials = [
    {
      name: "DynastyCorp",
      location: "Canada",
      content: "It was a pleasure working with Olanrewaju. He demonstrated strong communication skills and a great ability to follow direction. Most importantly, we collaborated effectively to achieve our vision."
    },
    {
      name: "merrelhurd",
      location: "United Kingdom",
      content: "I couldn't be happier with the work. Communication was clear, professional, and consistent. They went above and beyond to solve unexpected challenges, explained solutions clearly, and made sure everything worked exactly as promised. Highly recommended."
    },
    {
      name: "SirRelbert",
      location: "United States",
      content: "Was able to solve my coding problem with my smart contract. Very knowledgeable, would recommend him and will continue to use him for future projects. Thank you."
    }
  ]



  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Olanrewaju Alaba",
            "alternateName": "chryzcode",
            "jobTitle": "Backend & Full-Stack Software Engineer",
            "description": "Backend-focused software engineer with 5+ years of experience building web applications, APIs, SaaS platforms, and production systems using Python, Django, PostgreSQL, and cloud infrastructure.",
            "url": "https://chryzcode.netlify.app/",
            "sameAs": [
              "https://github.com/chryzcode",
              "https://www.linkedin.com/in/olanrewaju-alaba",
              "https://x.com/chryzcode"
            ],
            "knowsAbout": [
              "Backend Engineering",
              "Full Stack Development",
              "Python",
              "Django",
              "Django Rest Framework",
              "PostgreSQL",
              "Node.js",
              "Next.js",
              "TypeScript",
              "Stripe Integrations",
              "API Security",
              "Cloud Infrastructure"
            ]
          })
        }}
      />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <h1 className="text-3xl font-mono text-white tracking-widest uppercase mb-2">chryzcode</h1>
              <p className="text-zinc-500 text-sm font-mono">Initializing engineering portfolio...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden relative z-0 cursor-none selection:bg-white selection:text-black">
        <Navigation />

        {/* Parallax Background Grid */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute inset-0 bg-black" />
          {showBackgroundAnimations && (
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '80px 80px'
                }}
              />
            </div>
          )}
        </div>

        {/* HERO SECTION */}
        <section id="home" className="relative min-h-screen flex flex-col justify-between px-6 py-20 md:px-12">
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto pt-16">
              
              {/* Online / Hiring Status Indicator */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }} 
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs tracking-wider uppercase font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Open to Backend & Full-Stack Opportunities
                </div>
              </motion.div>
              
              {/* Specialized Core Identity */}
              <motion.h1 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight mb-6 font-sans text-white leading-none uppercase"
              >
                Backend / Full-Stack<br />
                <span className="text-zinc-500 font-light">Software Engineer</span>
              </motion.h1>

              {/* Systems Positioning Copy */}
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed font-mono"
              >
                I build production web applications, APIs, and backend systems using Python, Django, PostgreSQL, and modern cloud infrastructure — with experience across payments, SaaS, AI, and blockchain.
              </motion.p>

              {/* Action Anchors */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center font-mono"
              >
                <a 
                  href="#work"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 text-sm font-semibold tracking-wider uppercase"
                >
                  View My Work
                  <ArrowUpRight size={16} />
                </a>
                
                <a 
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-4 border border-zinc-700 hover:border-white text-white hover:bg-zinc-900 transition-all flex items-center justify-center gap-2 text-sm tracking-wider uppercase"
                >
                  Get In Touch
                </a>
              </motion.div>
            </div>
          </div>

          {/* Scroll Down Callout */}
          <div 
            className="relative z-10 flex flex-col items-center gap-3 text-zinc-500 hover:text-white transition-colors duration-300 font-mono text-[10px] tracking-widest uppercase cursor-pointer mt-8"
            onClick={() => {
              const target = document.getElementById('about');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Scroll to explore</span>
            <div className="w-[18px] h-[30px] border border-zinc-700 rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ 
                  y: [0, 8, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-1 h-1.5 bg-zinc-400 rounded-full"
              />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <motion.section 
          id="about" 
          ref={(el) => { if (el) sectionsRef.current[0] = el as HTMLDivElement }} 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 bg-zinc-950/20 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">01 // Profile</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">About Me</h3>
            </div>
            
            <div className="lg:col-span-2 space-y-6 text-zinc-400 text-base md:text-lg leading-relaxed font-sans">
              <p>
                I'm <strong className="text-white font-medium">Olanrewaju Alaba — Chryzcode</strong>, a backend-focused full-stack software engineer with 5+ years of experience building web applications, APIs, SaaS platforms, and production systems.
              </p>
              <p>
                My core backend stack is <strong className="text-white font-medium">Python, Django, Django REST Framework, PostgreSQL</strong>, and API development, with experience deploying and maintaining applications across cloud platforms.
              </p>
              <p>
                I also work with React, Next.js, TypeScript, Node.js, MongoDB, Stripe, and modern frontend tooling, allowing me to build products end-to-end. Much of my work has involved systems around payments, subscriptions, e-commerce, authentication, AI-powered applications, blockchain, and third-party API integrations.
              </p>
              <p>
                I'm particularly interested in backend architecture, reliable APIs, data-intensive applications, cloud infrastructure, and building software that can move from an idea into a real production environment.
              </p>
              
              <div className="pt-4 font-mono">
                <Link 
                  href="/my-story"
                  className="inline-flex items-center gap-2 text-white hover:text-zinc-300 border-b border-white pb-1 text-sm tracking-wider uppercase transition-colors"
                >
                  Read My Full Story
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CORE SKILLS SECTION */}
        <motion.section 
          id="skills" 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">02 // Capabilities</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">Skills & Expertise</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {skillCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-zinc-950/60 border border-zinc-900 hover:border-zinc-700 transition-all duration-300 rounded-none flex flex-col justify-between hover:shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-zinc-900">
                      <div className="w-8 h-8 bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-white">
                        {category.icon}
                      </div>
                      <h4 className="text-xs font-mono text-zinc-300 uppercase tracking-widest font-semibold leading-tight">
                        {category.title}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="px-2.5 py-1 text-xs font-mono bg-zinc-900/30 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-900/80 transition-all duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* WHAT I DO SECTION (ENGINEERING FOCUS) */}
        <motion.section 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 bg-zinc-950/10"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">03 // Competencies</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">Engineering Focus</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {competencies.map((comp, idx) => (
                <div key={idx} className="p-8 bg-zinc-950 border border-zinc-900 hover:border-zinc-750 transition-all duration-300">
                  <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-zinc-800 mb-6">
                    {comp.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-white uppercase">{comp.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">{comp.description}</p>
                  <div className="font-mono text-xs text-zinc-500 pt-3 border-t border-zinc-900">
                    {comp.stack}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* WORK / PROJECTS SECTION */}
        <motion.section 
          id="work" 
          ref={(el) => { if (el) sectionsRef.current[1] = el as HTMLDivElement }}
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">04 // Portfolio</h2>
                <h3 className="text-4xl font-normal text-white uppercase tracking-tight">Selected Work</h3>
              </div>

              {/* Tabs selector */}
              <div className="flex bg-zinc-900 border border-zinc-800 p-1 font-mono text-xs uppercase tracking-widest">
                <button 
                  onClick={() => setActiveProjectTab('featured')}
                  className={`px-4 py-2 font-semibold ${activeProjectTab === 'featured' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                >
                  Featured Projects ({featuredProjects.length})
                </button>
                <button 
                  onClick={() => setActiveProjectTab('additional')}
                  className={`px-4 py-2 font-semibold ${activeProjectTab === 'additional' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                >
                  Additional Work ({additionalProjects.length})
                </button>
              </div>
            </div>

            {activeProjectTab === 'featured' ? (
              <div className="grid grid-cols-1 gap-12">
                {featuredProjects.map((project, index) => {
                  const isExpanded = expandedProjectDetails === project.id
                  return (
                    <div 
                      key={project.id}
                      className="bg-zinc-950 border border-zinc-900 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
                    >
                      {/* Left: Metadata & Descriptions */}
                      <div className="p-8 lg:col-span-7 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-mono tracking-wider text-zinc-500 uppercase">{project.category}</span>
                            <div className="flex gap-4">
                              {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1">
                                  Live <ExternalLink size={12} />
                                </a>
                              )}
                              {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1">
                                  Repo <Github size={12} />
                                </a>
                              )}
                            </div>
                          </div>
                          
                          <h4 className="text-2xl font-normal text-white mb-6 uppercase">{project.title}</h4>
                          
                          {/* Project description parsed as Problem, Engineering, Result block */}
                          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed font-sans pr-4 mb-6">
                            {project.description.split("Engineering").map((part, pIdx) => {
                              if (pIdx === 0) {
                                return (
                                  <p key={pIdx}>
                                    <strong className="text-white uppercase font-mono text-xs block mb-1">Problem:</strong>
                                    {part.replace("Problem →", "").trim()}
                                  </p>
                                )
                              }
                              
                              const nestedParts = part.split("Result")
                              return (
                                <div key={pIdx} className="space-y-4">
                                  <p>
                                    <strong className="text-white uppercase font-mono text-xs block mb-1">Engineering:</strong>
                                    {nestedParts[0].replace("→", "").trim()}
                                  </p>
                                  {nestedParts[1] && (
                                    <p>
                                      <strong className="text-white uppercase font-mono text-xs block mb-1">Result:</strong>
                                      {nestedParts[1].replace("→", "").trim()}
                                    </p>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="px-2.5 py-1 bg-zinc-900 text-zinc-400 text-xs font-mono border border-zinc-800">
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Architecture & Decision toggle */}
                          {project.details && (
                            <button
                              onClick={() => setExpandedProjectDetails(isExpanded ? null : project.id)}
                              className="w-full text-left font-mono text-xs uppercase tracking-widest text-zinc-300 hover:text-white border-t border-zinc-900 pt-4 flex items-center justify-between"
                            >
                              {isExpanded ? "Hide Architecture & Decisions" : "Inspect Architecture & Key Decisions"}
                              <span>{isExpanded ? "▲" : "▼"}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right: Preview Visual */}
                      <div className="lg:col-span-5 relative bg-zinc-900 border-t lg:border-t-0 lg:border-l border-zinc-900 aspect-video lg:aspect-auto overflow-hidden group">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover object-top filter grayscale contrast-110 opacity-75 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[4000ms] ease-in-out" 
                        />
                      </div>

                      {/* Expandable Architecture & Challenges Panel */}
                      {project.details && isExpanded && (
                        <div className="col-span-12 p-8 bg-zinc-950 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs text-zinc-400">
                          <div>
                            <h5 className="text-white font-bold uppercase mb-4 tracking-wider flex items-center gap-2">
                              <Terminal size={14} /> System Architecture
                            </h5>
                            <pre className="bg-zinc-900 p-4 border border-zinc-800 overflow-x-auto text-zinc-300 leading-relaxed font-mono">
                              {project.details.architecture}
                            </pre>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <h5 className="text-white font-bold uppercase mb-2 tracking-wider">Engineering Challenges</h5>
                              <ul className="list-disc pl-4 space-y-2">
                                {project.details.challenges.map((challenge, cIdx) => (
                                  <li key={cIdx}>{challenge}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-white font-bold uppercase mb-2 tracking-wider">Key Decisions</h5>
                              <ul className="list-disc pl-4 space-y-2">
                                {project.details.decisions.map((decision, dIdx) => (
                                  <li key={dIdx}>{decision}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              // Lower prominence layout for additional projects
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {additionalProjects.map((p, idx) => (
                  <div key={idx} className="p-6 bg-zinc-950 border border-zinc-900 flex flex-col justify-between h-48">
                    <div>
                      <h4 className="text-lg font-normal text-white uppercase mb-2">{p.title}</h4>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.technologies.map(t => (
                          <span key={t} className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 border border-zinc-900">{t}</span>
                        ))}
                      </div>
                    </div>
                    <a 
                      href={p.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white"
                    >
                      Visit Site <ArrowUpRight size={12} />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* EXPERIENCE SECTION */}
        <motion.section 
          id="experience" 
          ref={(el) => { if (el) sectionsRef.current[2] = el as HTMLDivElement }}
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 bg-zinc-950/20 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">05 // Employment</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">Work Experience</h3>
            </div>
            
            <div className="lg:col-span-2 space-y-12 font-sans text-sm md:text-base">
              {experience.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-zinc-800 pl-6 relative">
                  {/* Bullet indicator node */}
                  <div className="absolute w-3.5 h-3.5 bg-black border border-white rounded-full -left-[8px] top-1.5" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 font-mono">
                    <div>
                      <h4 className="text-lg font-bold text-white uppercase tracking-wide">{exp.role}</h4>
                      <div className="text-zinc-400 text-sm">{exp.company}</div>
                    </div>
                    <div className="text-xs text-zinc-500">{exp.period}</div>
                  </div>
                  
                  <ul className="space-y-3.5 text-zinc-400 list-disc pl-4 leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* HOW I WORK SECTION (Replacing FAQ) */}
        <motion.section 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">06 // Methodology</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">How I Work</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodologies.map((method, idx) => (
                <div key={idx} className="p-8 bg-zinc-950 border border-zinc-900 flex flex-col justify-between h-64">
                  <div className="font-mono text-3xl text-zinc-800 font-bold">{method.step}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white uppercase mb-2 font-mono">{method.title}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* TESTIMONIALS SECTION */}
        <motion.section 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 bg-zinc-950/20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">07 // Endorsements</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">What People Say</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="p-8 bg-zinc-950 border border-zinc-900 flex flex-col justify-between h-80 font-sans">
                  <div>
                    <div className="flex gap-1 mb-4 text-white">
                      {[...Array(5)].map((_, sIdx) => <Star key={sIdx} size={14} className="fill-current" />)}
                    </div>
                    <blockquote className="text-zinc-300 text-sm leading-relaxed italic">
                      "{t.content}"
                    </blockquote>
                  </div>
                  <div className="font-mono text-xs pt-4 border-t border-zinc-900">
                    <span className="text-white block font-bold uppercase">{t.name}</span>
                    <span className="text-zinc-500">{t.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.section 
          id="contact" 
          ref={(el) => { if (el) sectionsRef.current[3] = el as HTMLDivElement }}
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center lg:text-left">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">08 // Communication</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">Let's Build</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column info */}
              <div className="lg:col-span-5 space-y-8 font-mono">
                <p className="text-zinc-400 text-base leading-relaxed font-sans">
                  I'm open to backend and full-stack engineering opportunities, interesting product collaborations, and selected contract work.
                </p>

                <div className="grid grid-cols-[100px_1fr] gap-y-4 gap-x-2 text-sm border-t border-zinc-900 pt-6">
                  <span className="text-zinc-500">EMAIL //</span>
                  <a href="mailto:alabaolanrewaju13@gmail.com" className="text-white hover:text-zinc-300 break-all">alabaolanrewaju13@gmail.com</a>
                  
                  <span className="text-zinc-500">GITHUB //</span>
                  <a href="https://github.com/chryzcode" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 break-all">github.com/chryzcode</a>
                  
                  <span className="text-zinc-500">LINKEDIN //</span>
                  <a href="https://www.linkedin.com/in/olanrewaju-alaba" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 break-all">linkedin.com/in/olanrewaju-alaba</a>
                  
                  <span className="text-zinc-600 font-semibold">TWITTER //</span>
                  <a href="https://x.com/chryzcode" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white break-all">@chryzcode</a>
                  
                  <span className="text-zinc-600 font-semibold">YOUTUBE //</span>
                  <a href="https://www.youtube.com/@chryzcode" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white break-all">@chryzcode</a>
                </div>
              </div>

              {/* Right Column Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleContactSubmit} className="p-8 bg-zinc-950 border border-zinc-900 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-500 uppercase">Name</label>
                      <input 
                        type="text" 
                        required 
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors font-mono" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-500 uppercase">Email</label>
                      <input 
                        type="email" 
                        required 
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors font-mono" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Reason for reaching out</label>
                    <select 
                      value={contactForm.purpose}
                      onChange={(e) => setContactForm(prev => ({ ...prev, purpose: e.target.value }))}
                      className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors font-mono"
                    >
                      <option value="Job Opportunity">Job Opportunity</option>
                      <option value="Contract Work">Contract Work</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Project">Project</option>
                      <option value="Technical Discussion">Technical Discussion</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Message</label>
                    <textarea 
                      rows={5} 
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors font-mono" 
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 text-xs font-mono">
                      ✓ Message sent successfully. I will get back to you shortly.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-xs font-mono">
                      ✗ Error delivering message. Please reach out via email directly.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-black hover:bg-zinc-200 transition-colors font-mono text-xs uppercase tracking-widest font-bold"
                  >
                    {isSubmitting ? 'Delivering...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="border-t border-zinc-900 bg-zinc-950 py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold text-white mb-1">chryzcode</div>
              <p className="text-zinc-500 text-xs font-mono">Systems engineering & full-stack development.</p>
            </div>

            <div className="text-zinc-500 text-xs font-mono">
              © {new Date().getFullYear()} chryzcode. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Back to Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-white text-black hover:bg-zinc-200 flex items-center justify-center transition-colors"
        >
          <ChevronDown size={20} className="rotate-180" />
        </button>

        <CustomCursor />
      </div>
    </>
  )
}
