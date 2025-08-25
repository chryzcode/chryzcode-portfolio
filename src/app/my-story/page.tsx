"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, GraduationCap, Code, Users, BookOpen, Globe } from "lucide-react"
import Link from "next/link"

export default function MyStory() {
  const storySections = [
    {
      title: "Early Beginnings",
      content: "My journey into technology began with a simple curiosity about how websites worked. Growing up in Nigeria, I was fascinated by the digital world and how code could bring ideas to life. What started as a hobby quickly became a passion that would shape my entire career.",
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "The Learning Years",
      content: "I spent countless hours teaching myself programming, starting with HTML and CSS, then moving to JavaScript and more complex technologies. Every project was a learning opportunity, and every failure taught me something valuable about problem-solving and persistence.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "First Professional Steps",
      content: "My first freelance project was a simple website for a local business. The client was thrilled with the result, and that moment of satisfaction confirmed that I was on the right path. From there, I began taking on more complex projects and building my portfolio.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Blockchain Discovery",
      content: "When I discovered blockchain technology, it felt like finding a whole new world of possibilities. The idea of decentralized applications and smart contracts fascinated me. I dove deep into Solidity, Web3, and DeFi protocols, expanding my skill set significantly.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Building chryzcode",
      content: "After years of freelancing and building for others, I decided to create my own brand - chryzcode. This represents not just my technical skills, but my commitment to delivering exceptional digital experiences that solve real problems.",
      icon: <Code className="w-6 h-6" />
    }
  ]

  const personalDetails = [
    { label: "Full Name", value: "Olanrewaju Alaba", icon: <Users className="w-4 h-4" /> },
    { label: "Location", value: "Lagos, Nigeria", icon: <MapPin className="w-4 h-4" /> },
    { label: "Experience", value: "5+ Years", icon: <Calendar className="w-4 h-4" /> },
    { label: "Education", value: "Computer Science", icon: <GraduationCap className="w-4 h-4" /> }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">chryzcode</Link>
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-light mb-6"
          >
            My <span className="text-white">Story</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            The journey of how I became a creative technologist and built chryzcode
          </motion.p>
        </div>
      </section>

      {/* Personal Details */}
      <section className="py-16 px-8 bg-zinc-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {personalDetails.map((detail, index) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center p-6 bg-zinc-900/50 border border-zinc-800/50 rounded-xl"
              >
                <div className="flex justify-center mb-3 text-white/60">
                  {detail.icon}
                </div>
                <div className="text-sm text-gray-400 mb-1">{detail.label}</div>
                <div className="text-lg font-semibold text-white">{detail.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {storySections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white">
                    {section.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">{section.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{section.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="py-20 px-8 bg-zinc-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-6">
              My <span className="text-white">Philosophy</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide my work and shape my approach to technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation First",
                description: "I believe in exploring cutting-edge technologies and finding creative solutions to complex problems. Every project is an opportunity to push boundaries and discover new possibilities."
              },
              {
                title: "User-Centric Design",
                description: "Technology should serve people, not the other way around. I start every project by understanding the user's needs and creating intuitive, engaging experiences that make a difference."
              },
              {
                title: "Quality & Performance",
                description: "I write clean, maintainable code that performs exceptionally well and scales with your business. Good code is not just functional—it's elegant and efficient."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="p-6 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-center"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light mb-6">
              Ready to <span className="text-white">Work Together?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life and create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-none font-medium tracking-wide transition-all duration-300 border border-white"
              >
                Get In Touch
              </Link>
              <Link
                href="/#work"
                className="px-8 py-4 border border-white/30 hover:border-white text-white font-medium tracking-wide transition-all duration-300"
              >
                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
