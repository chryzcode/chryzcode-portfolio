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
  title: "Olanrewaju Alaba - Full Stack Developer & Blockchain Expert | chryzcode",
  description: "Olanrewaju Alaba is a freelance full-stack developer with 5+ years of experience in frontend, backend, blockchain development, and smart contracts. Expert in React, Node.js, Solidity, and Web3 technologies.",
  keywords: [
    "Olanrewaju Alaba",
    "chryzcode",
    "full stack developer",
    "frontend developer",
    "backend developer", 
    "blockchain developer",
    "smart contracts",
    "freelance developer",
    "React developer",
    "Node.js developer",
    "Solidity developer",
    "Django developer",
    "Django Rest Framework developer",
    "TypeScript developer",
    "Tailwind CSS developer",
    "Framer Motion developer",
    "Next.js developer",
    "React developer",
    "Python developer",
    "PostgreSQL developer",
    "Web3 developer",
    "DeFi developer",
    "smart contract developer",
    "freelance software engineer",
    "Nigeria developer",
    "Lagos developer",
    "blockchain freelancer",
    "full stack freelancer",
    "web development services"
  ].join(", "),
  authors: [{ name: "Olanrewaju Alaba" }, { name: "chryzcode" }],
  creator: "Olanrewaju Alaba",
  publisher: "chryzcode",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://chryzcode.netlify.app/"
  },
  openGraph: {
    title: "Olanrewaju Alaba - Full Stack Developer & Blockchain Expert | chryzcode",
    description: "Olanrewaju Alaba is a freelance full-stack developer with 5+ years of experience in frontend, backend, blockchain development, and smart contracts. Expert in React, Node.js, Solidity, and Web3 technologies.",
    type: "website",
    locale: "en_US",
    siteName: "chryzcode Portfolio",
    url: "https://chryzcode.netlify.app/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Olanrewaju Alaba - Full Stack Developer & Blockchain Expert"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Olanrewaju Alaba - Full Stack Developer & Blockchain Expert | chryzcode",
    description: "Olanrewaju Alaba is a freelance full-stack developer with 5+ years of experience in frontend, backend, blockchain development, and smart contracts.",
    creator: "@chryzcode",
    site: "@chryzcode"
  },
  verification: {
    google: "", // Add your Google Search Console verification code here
    yandex: "", // Add your Yandex Webmaster verification code here
    yahoo: "" // Add your Yahoo Site Explorer verification code here
  },
  category: "technology",
  classification: "Portfolio Website",
  other: {
    "google-site-verification": "", // Add your Google Search Console verification code here
    "msvalidate.01": "" // Add your Bing Webmaster Tools verification code here
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
        <link rel="preload" href="/api/placeholder/1200/800/1a1a1a/6366f1?text=AI+Analytics" as="image" />
        <link rel="preload" href="/api/placeholder/1200/800/1a1a1a/8b5cf6?text=DeFi+Protocol" as="image" />
        <link rel="preload" href="/api/placeholder/1200/800/1a1a1a/ec4899?text=Collaboration+Tool" as="image" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://cal.com" />
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://www.linkedin.com" />
        <link rel="preconnect" href="https://x.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
