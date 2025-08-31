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
    canonical: "https://chryzcode.netlify.app"
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
        url: "https://res.cloudinary.com/chryzhub/image/upload/v1756671778/website-image_dadlju.png",
        width: 2876,
        height: 1590,
        alt: "Olanrewaju Alaba - Full Stack Developer & Blockchain Expert | chryzcode Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Olanrewaju Alaba - Full Stack Developer & Blockchain Expert | chryzcode",
    description: "Olanrewaju Alaba is a freelance full-stack developer with 5+ years of experience in frontend, backend, blockchain development, and smart contracts.",
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
