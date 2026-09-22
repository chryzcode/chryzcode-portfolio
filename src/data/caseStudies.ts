export interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  category: string
  role: string
  timeline: string
  status: string
  overview: string
  systemSummary: string
  keyContributions: string[]
  architectureDiagram: string
  challenges: {
    challenge: string
    solution: string
  }[]
  keyDecisions: string[]
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featuredImage?: string
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  instasew: {
    slug: "instasew",
    title: "Instasew",
    subtitle: "Fashion Marketplace Platform & Backend Architecture",
    category: "Marketplace / Backend Engineering",
    role: "Backend / Full-Stack Engineer",
    timeline: "2024 – Present",
    status: "Production Platform (~200 Users)",
    overview: "Instasew is a global fashion marketplace platform designed to bridge the gap between bespoke fashion designers, end clients, and international logistics providers. The platform requires high-reliability transaction workflows, complex order state machines, escrow-backed wallet payouts, real-time messaging, and multi-carrier shipping logistics.",
    systemSummary: "A multi-sided marketplace platform with a Python/Django backend handling catalog management, negotiation and bidding workflows, transactional escrow wallets, DHL shipping integration, and background processing via Redis & Celery.",
    keyContributions: [
      "Owned backend architecture and production delivery for the marketplace platform.",
      "Built and maintained Django and Django REST Framework services, ensuring clean RESTful API standards.",
      "Designed PostgreSQL relational schemas, indexes, and transactional guarantees for orders, bids, and user roles.",
      "Implemented asynchronous background processing using Redis and Celery for order status automation, reminders, and notifications.",
      "Engineered a dynamic 'Preferred Designer' bidding and negotiation engine with automated fee recalculations.",
      "Overhauled financial systems, integrating Stripe, PayPal, BNPL, and custom ledger wallets with balance reconciliation.",
      "Integrated DHL real-time shipping rate calculation, label generation, and manual carrier tracking fallback.",
      "Supported AWS production infrastructure and testing environments, maintaining system reliability for ~200 active users."
    ],
    architectureDiagram: `Client (Web / Mobile App)
          │
          ▼  HTTPS / TLS
┌─────────────────────────────────────────┐
│     AWS CloudFront / Nginx Proxy        │
└───────────────────┬─────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Django REST Framework API Application  │
│  (Auth, Orders, Bids, Escrow, Wallets)  │
└───────┬───────────┬───────────┬─────────┘
        │           │           │
        ▼           ▼           ▼
┌──────────────┐ ┌────────┐ ┌───────────────────────┐
│  PostgreSQL  │ │ Redis  │ │ Third-Party Services  │
│  (ACID DB)   │ │ Queue  │ │ • Stripe & PayPal     │
└──────────────┘ └────┬───┘ │ • DHL Shipping API    │
                      │     │ • AWS S3 Media Bucket │
                      ▼     └───────────────────────┘
          ┌───────────────────────┐
          │ Celery Async Workers  │
          │ (Payouts, Webhooks)   │
          └───────────────────────┘`,
    challenges: [
      {
        challenge: "Handling complex multi-party order lifecycle states (Draft -> Bid -> Escrow Locked -> Production -> Shipped -> Completed -> Payout Released) without race conditions.",
        solution: "Implemented an explicit database-backed finite state machine (FSM) utilizing PostgreSQL row-level locks (SELECT FOR UPDATE) on critical order transitions to prevent concurrent mutation."
      },
      {
        challenge: "Third-party courier API latencies (DHL tracking and rate quoting) degrading client response times.",
        solution: "Decoupled shipping quote refreshes and webhook event tracking into asynchronous Celery background tasks with Redis result caching, reducing synchronous API response times by over 60%."
      },
      {
        challenge: "Financial integrity across multi-currency deposits, platform commissions, and delayed creator payouts.",
        solution: "Architected a double-entry ledger database pattern for internal user wallets, separating available balance from escrowed funds and verifying zero-sum consistency prior to executing automated payouts."
      }
    ],
    keyDecisions: [
      "Selected Django and Django REST Framework for robust ORM data validation, mature security middlewares, and rapid schema modeling.",
      "Used Celery with Redis for background tasks to keep user-facing request cycles snappy and resilient to external API failures.",
      "Deployed on AWS with isolated S3 private buckets and pre-signed URLs to protect sensitive user verification and contract documents."
    ],
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Redis",
      "Celery",
      "AWS S3",
      "AWS EC2",
      "Stripe",
      "PayPal",
      "DHL API",
      "Docker"
    ]
  },
  nexapay: {
    slug: "nexapay",
    title: "NexaPay",
    subtitle: "Cross-Chain Blockchain Payment Platform",
    category: "FinTech / Web3 Engineering",
    role: "Blockchain & Full-Stack Engineer (Personal Project)",
    timeline: "2024",
    status: "Live Web3 Application",
    overview: "NexaPay is a decentralized payment gateway engineered to resolve the fragmentation in crypto checkout experiences. By unifying multiple EVM blockchains into a cohesive client interface and smart-contract payment router, NexaPay allows merchants and users to settle payments across chains with transparent fee structures and instant on-chain verification.",
    systemSummary: "A Web3 payment application built with Next.js, TypeScript, Solidity smart contracts, Ethers.js, and Stargate cross-chain liquidity routing, featuring a built-in platform transaction fee model.",
    keyContributions: [
      "Architected and built the full web application using Next.js and TypeScript with modular wallet connection handling.",
      "Authored, tested, and deployed Solidity smart contracts managing transaction routing, escrow, and fee distribution.",
      "Integrated blockchain wallet interactions supporting MetaMask, Coinbase Wallet, and WalletConnect via Ethers.js.",
      "Implemented cross-chain payment functionality and liquidity transfers leveraging the Stargate protocol router.",
      "Executed contract unit testing, gas optimization, and invariant verification using Hardhat.",
      "Configured deployments across Sepolia testnet and EVM mainnets with comprehensive transaction event listeners.",
      "Implemented a real-time platform fee model that collects protocol revenue trustlessly during contract settlement."
    ],
    architectureDiagram: `User Wallet (MetaMask / WalletConnect)
                    │
                    ▼ Ethers.js Provider
┌───────────────────────────────────────────────┐
│     Next.js / TypeScript Web Application      │
│     (Transaction Builder & Order Session)     │
└───────────────────────┬───────────────────────┘
                        │
                        ▼ RPC / Web3 Call
┌───────────────────────────────────────────────┐
│      NexaPay Router Contract (Solidity)       │
│      ├── Transaction Verification             │
│      ├── Platform Fee Deduction (On-Chain)    │
│      └── Merchant Vault Transfer              │
└───────────────────────┬───────────────────────┘
                        │
                        ▼ Cross-Chain Bridge
┌───────────────────────────────────────────────┐
│       Stargate Protocol (LayerZero EVM)       │
│       (Cross-Chain Liquidity & Settlement)    │
└───────────────────────────────────────────────┘`,
    challenges: [
      {
        challenge: "Preventing transaction slippage and failed bridge transfers when cross-chain gas spikes occur mid-swap.",
        solution: "Configured Stargate router calls with configurable gas limits, slippage bounds, and client-side balance pre-checks prior to triggering the contract method."
      },
      {
        challenge: "Asynchronous block confirmation latency causing indeterminate UI states for users.",
        solution: "Engineered a reactive state listener tracking transaction hashes across mempool broadcast, first confirmation, and finality with optimistic visual feedback."
      },
      {
        challenge: "Security vulnerabilities and reentrancy risks in payment distribution contracts.",
        solution: "Followed OpenZeppelin battle-tested contracts, enforced the Checks-Effects-Interactions pattern, and implemented ReentrancyGuard on all payable external entrypoints."
      }
    ],
    keyDecisions: [
      "Used Solidity with Hardhat for comprehensive contract test coverage, gas profiling, and simulated network forks.",
      "Leveraged Stargate for interoperability to enable cross-chain payments without requiring merchants to maintain liquidity pools on every single chain.",
      "Built the frontend with Next.js and TypeScript for strict typing of contract ABIs and transaction inputs."
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Solidity",
      "Web3",
      "Smart Contracts",
      "Stargate",
      "Ethers.js",
      "Hardhat",
      "OpenZeppelin",
      "Tailwind CSS"
    ],
    liveUrl: "https://nexapay.vercel.app/",
    featuredImage: "/nexapay-proj.png"
  },
  clearpeak: {
    slug: "clearpeak",
    title: "ClearPeak Trading",
    subtitle: "Trading Analytics SaaS Platform",
    category: "SaaS / Full-Stack Engineering",
    role: "Full-Stack Engineer (Personal Project)",
    timeline: "2024",
    status: "Live Production SaaS",
    overview: "ClearPeak Trading is a subscription-based financial analytics SaaS offering proprietary performance indicators, automated trade journaling, and paid access to analytical tools. Built for scalability, data isolation, and smooth monetization, ClearPeak provides traders with actionable metrics while ensuring secure subscriber authentication.",
    systemSummary: "A high-performance SaaS web application built with Next.js, Auth.js, Prisma ORM, PostgreSQL, Stripe Subscriptions with idempotent webhook processing, and Brevo transactional emails.",
    keyContributions: [
      "Built the entire SaaS application from scratch using Next.js (App Router) and TypeScript.",
      "Implemented authentication and access control workflows using Auth.js (OAuth and credentials sessions).",
      "Modeled relational database schemas, migrations, and transactional queries using Prisma and PostgreSQL (Neon).",
      "Integrated Stripe billing, supporting recurring plans, monthly/annual toggles, and customer portal session redirection.",
      "Engineered idempotent Stripe webhook handling to maintain subscriber entitlement state across billing events.",
      "Implemented comprehensive lifecycle event listeners for subscription creation, trials, invoice payment, and cancellations.",
      "Integrated Brevo API to trigger transactional welcome emails, billing receipts, and plan change notifications."
    ],
    architectureDiagram: `Trader Browser / Client
          │
          ▼ HTTPS
┌───────────────────────────────────────────────┐
│     Next.js Application (App Router)          │
│     ├── Auth.js (Protected Routes & Sessions) │
│     └── Server Actions & Analytics APIs       │
└───────┬───────────────────────────┬───────────┘
        │                           │
        ▼ Prisma Client             ▼ REST API
┌──────────────────────────┐ ┌───────────────────────────┐
│   PostgreSQL Database    │ │   Stripe Billing Engine   │
│   (Neon Serverless)      │ │   (Checkout & Subscriptions)
│   • Users & Sessions     │ └─────────────┬─────────────┘
│   • Subscriptions & Logs │               │ Webhooks
│   • Trade Journals       │               ▼ (HMAC Verified)
└──────────────────────────┘ ┌───────────────────────────┐
                             │ Next.js Webhook Handler   │
                             │ (State Sync & Entitlement)│
                             └─────────────┬─────────────┘
                                           │
                                           ▼ REST
                             ┌───────────────────────────┐
                             │ Brevo Email API           │
                             └───────────────────────────┘`,
    challenges: [
      {
        challenge: "Guaranteeing idempotent webhook processing when Stripe retries deliveries during transient network delays.",
        solution: "Created an EventLog table in PostgreSQL to record each incoming Stripe event ID inside a database transaction, rejecting already-processed events before modifying user entitlement records."
      },
      {
        challenge: "Protecting proprietary trading indicator calculations from unauthorized client extraction.",
        solution: "Kept all core mathematical calculations on the server inside isolated serverless API endpoints protected by session and subscription guard middleware."
      },
      {
        challenge: "Database connection limits under serverless Next.js edge and lambda function scaling.",
        solution: "Configured Prisma with Neon serverless connection pooling (pgBouncer), preventing connection pool exhaustion under sudden traffic bursts."
      }
    ],
    keyDecisions: [
      "Selected PostgreSQL with Prisma for type-safe database schemas and predictable schema migrations.",
      "Chose Stripe Customer Portal to offload credit card updates, invoicing, and tax handling directly to Stripe's secure infrastructure.",
      "Utilized Brevo API for transactional email delivery decoupled from web server execution."
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Auth.js",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Brevo",
      "Tailwind CSS",
      "Vercel"
    ],
    liveUrl: "https://www.clearpeaktrading.com/",
    featuredImage: "/clearpeak-trading-proj.png"
  }
}
