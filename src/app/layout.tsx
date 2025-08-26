import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
