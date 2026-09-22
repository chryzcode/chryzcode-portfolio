import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chryzcode.netlify.app/'),
  title: "Olanrewaju Alaba - Backend / Full-Stack Software Engineer | chryzcode",
  description: "Olanrewaju Alaba (chryzcode) is a backend and full-stack software engineer with 5+ years of experience building practical, production-focused software, APIs, SaaS platforms, and marketplaces using Python, Django, PostgreSQL, AWS, and Next.js.",
  keywords: [
    "Olanrewaju Alaba",
    "chryzcode",
    "Backend Engineer",
    "Full-Stack Engineer",
    "Python Developer",
    "Django Developer",
    "Django REST Framework",
    "PostgreSQL",
    "AWS",
    "Redis",
    "Celery",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "API Development",
    "Stripe Integrations",
    "SaaS Architecture",
    "Marketplace Architecture",
    "Solidity",
    "Web3"
  ].join(", "),
  authors: [{ name: "Olanrewaju Alaba" }, { name: "chryzcode" }],
  creator: "Olanrewaju Alaba",
  publisher: "chryzcode",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://chryzcode.netlify.app"
  },
  openGraph: {
    title: "Olanrewaju Alaba - Backend / Full-Stack Software Engineer | chryzcode",
    description: "Backend / Full-Stack Software Engineer building practical, production-focused software using Python, Django, PostgreSQL, AWS, and Next.js.",
    type: "website",
    locale: "en_US",
    siteName: "chryzcode Portfolio",
    url: "https://chryzcode.netlify.app/",
    images: [
      {
        url: "https://res.cloudinary.com/chryzhub/image/upload/v1756671778/website-image_dadlju.png",
        width: 2876,
        height: 1590,
        alt: "Olanrewaju Alaba - Backend / Full-Stack Software Engineer | chryzcode Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Olanrewaju Alaba - Backend / Full-Stack Software Engineer | chryzcode",
    description: "Backend / Full-Stack Software Engineer building practical, production-focused software using Python, Django, PostgreSQL, AWS, and Next.js.",
    images: ["https://res.cloudinary.com/chryzhub/image/upload/v1756671778/website-image_dadlju.png"]
  },
  category: "technology",
  other: {
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical resources for faster LCP */}
        <link rel="preload" href="/website-image.png" as="image" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://cal.com" />
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://www.linkedin.com" />
        <link rel="preconnect" href="https://x.com" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* Additional social media meta tags */}
        <meta property="og:image:width" content="2876" />
        <meta property="og:image:height" content="1590" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:secure_url" content="https://res.cloudinary.com/chryzhub/image/upload/v1756671778/website-image_dadlju.png" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
