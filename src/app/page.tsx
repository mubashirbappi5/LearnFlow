import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { prisma } from '@/lib/prisma';
import { Status } from '@prisma/client';
import { Target, Laptop, Trophy, Handshake, Map, BookOpen, Terminal, Award, Rocket, Sparkles, User, Zap, CheckCircle, Play } from 'lucide-react';
import { SiReact, SiNodedotjs, SiPython, SiNextdotjs, SiTypescript, SiDocker, SiPostgresql, SiPrisma, SiLinux, SiKalilinux, SiOwasp } from 'react-icons/si';
import { FaUserSecret, FaLock, FaBug, FaAws } from 'react-icons/fa';

export default async function LandingPage() {
  const featuredCareers = await prisma.careerPath.findMany({
    where: { status: Status.PUBLISHED },
    take: 3,
    include: {
      _count: { select: { courses: true } }
    }
  });

  const faqs = [
    {
      q: "Is this course really 100% free?",
      a: "Yes! We believe education should be accessible to everyone. We curate the best free resources on the internet and organize them into structured roadmaps, so you never have to pay for a bootcamp."
    },
    {
      q: "Do I get a certificate after completion?",
      a: "Absolutely. Once you complete all module quizzes and submit the required real-world projects, you will receive a verifiable certificate of completion that you can share on LinkedIn."
    },
    {
      q: "How much time do I need to invest daily?",
      a: "It depends on your goal. Most students dedicate 2-3 hours daily and complete their career path within 4 to 6 months. Since it's self-paced, you can go faster or slower as needed."
    },
    {
      q: "Will I get help if I get stuck?",
      a: "Yes! We have an active community forum where you can ask questions, share your code, and get help from mentors and fellow learners."
    }
  ];

  const technologies = [
    { name: "React", icon: <SiReact size={24} color="#61DAFB" /> },
    { name: "Node.js", icon: <SiNodedotjs size={24} color="#339933" /> },
    { name: "Ethical Hacking", icon: <FaUserSecret size={24} color="#f87171" /> },
    { name: "Python", icon: <SiPython size={24} color="#3776AB" /> },
    { name: "Next.js", icon: <SiNextdotjs size={24} color="var(--color-text-primary)" /> },
    { name: "TypeScript", icon: <SiTypescript size={24} color="#3178C6" /> },
    { name: "Penetration Testing", icon: <FaBug size={24} color="#ef4444" /> },
    { name: "Docker", icon: <SiDocker size={24} color="#2496ED" /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={24} color="#4169E1" /> },
    { name: "Prisma", icon: <SiPrisma size={24} color="var(--color-text-primary)" /> },
    { name: "AWS", icon: <FaAws size={24} color="#FF9900" /> },
    { name: "Linux", icon: <SiLinux size={24} color="#FCC624" /> },
    { name: "Cyber Security", icon: <FaLock size={24} color="#10b981" /> }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      {/* Premium Dynamic Background Elements */}
      <div style={{ position: 'fixed', top: '-15%', left: '-15%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, var(--color-transparent-bg) 60%)', zIndex: 0, pointerEvents: 'none' }} className="animate-pulse-glow" />
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '65vw', height: '65vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, var(--color-transparent-bg) 65%)', zIndex: 0, pointerEvents: 'none', animationDelay: '2s' }} className="animate-pulse-glow" />
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '100vh', backgroundImage: 'radial-gradient(var(--color-glass-strong) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3, zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* 1. Ultra-Premium Hero Section */}
          <section style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '120px 24px 60px',
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10
          }}>
            {/* Huge Background Glow */}
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '600px', background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.25), transparent 70%)', filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }} className="animate-pulse-glow" />

            <div className="animate-slide-up-fade" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 24px', 
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                color: 'var(--color-text-primary)',
                fontSize: '0.95rem',
                fontWeight: 500,
                marginBottom: '40px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}>
                <Sparkles size={16} className="text-gradient animate-pulse" />
                <span style={{ opacity: 0.9 }}>Introducing LearnFlow 2.0</span>
                <span style={{ color: 'var(--color-brand-secondary)', opacity: 0.8 }}>&rarr;</span>
              </div>
              
              <h1 style={{ 
                fontSize: 'clamp(4rem, 8vw, 7rem)', 
                lineHeight: 1, 
                marginBottom: '32px', 
                letterSpacing: '-0.04em', 
                fontWeight: 800,
                background: 'linear-gradient(to bottom right, #ffffff 30%, #a1a1aa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                maxWidth: '1000px'
              }}>
                Master your craft.<br/>
                <span className="text-gradient">Build the future.</span>
              </h1>
              
              <p style={{ 
                fontSize: '1.25rem', 
                color: 'var(--color-text-secondary)', 
                marginBottom: '56px', 
                maxWidth: '650px', 
                lineHeight: 1.6,
                fontWeight: 400
              }}>
                The #1 free tech ecosystem. Join our structured, project-based bootcamps built entirely from world-class free resources. Master frontend, backend & security without spending thousands.
              </p>
              
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="/assessment" className="btn btn-primary" style={{ 
                  padding: '20px 48px', 
                  fontSize: '1.125rem', 
                  borderRadius: '99px', 
                  boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)', 
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}>
                  Start Your Journey
                </Link>
                <Link href="/careers" className="btn btn-secondary glass-panel hover-glow" style={{ 
                  padding: '20px 48px', 
                  fontSize: '1.125rem', 
                  borderRadius: '99px', 
                  fontWeight: 600,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  Explore Curriculums
                </Link>
              </div>
            </div>

            {/* Premium UI Mockup Presentation */}
            <div className="animate-slide-up-fade" style={{ animationDelay: '0.2s', marginTop: '100px', width: '100%', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '10%', right: '10%', height: '40px', background: 'linear-gradient(to right, transparent, var(--color-brand-primary), var(--color-brand-secondary), transparent)', filter: 'blur(30px)', opacity: 0.6 }} />
              
              <div style={{ 
                background: 'linear-gradient(to bottom, var(--color-bg-tertiary), #000)',
                border: '1px solid var(--color-glass-border)',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '24px 24px 0 0',
                padding: '16px',
                boxShadow: '0 -20px 60px rgba(0,0,0,0.8)',
                overflow: 'hidden'
              }}>
                {/* Mockup Header */}
                <div style={{ display: 'flex', gap: '8px', paddingBottom: '16px', borderBottom: '1px solid var(--color-glass)' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                </div>
                {/* Mockup Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px', paddingTop: '24px', minHeight: '300px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', opacity: 0.7 }}>
                    <div style={{ height: '32px', background: 'var(--color-glass)', borderRadius: '8px', width: '100%' }} />
                    <div style={{ height: '24px', background: 'var(--color-glass)', borderRadius: '8px', width: '80%' }} />
                    <div style={{ height: '24px', background: 'var(--color-glass)', borderRadius: '8px', width: '90%' }} />
                    <div style={{ height: '24px', background: 'var(--color-glass)', borderRadius: '8px', width: '60%' }} />
                  </div>
                  <div style={{ background: '#0a0a0b', border: '1px solid var(--color-glass)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                       <div style={{ height: '40px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '8px', width: '200px' }} />
                       <div style={{ height: '40px', background: 'var(--color-glass)', borderRadius: '8px', width: '100px' }} />
                    </div>
                    <div style={{ flex: 1, background: 'var(--color-glass)', borderRadius: '8px', width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Success Metrics */}
          <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '8px' }} className="text-gradient">50+</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>Curated Paths</div>
              </div>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '8px' }} className="text-gradient">10k+</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>Active Learners</div>
              </div>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '8px' }} className="text-gradient">30+</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>Projects to Build</div>
              </div>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '8px' }} className="text-gradient">100%</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>Free Forever</div>
              </div>
            </div>
          </section>

          {/* New AI Tutor Section */}
          <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', right: '-20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '64px', flexWrap: 'wrap-reverse', position: 'relative', zIndex: 1 }}>
              <div style={{ flex: '1 1 400px', position: 'relative' }}>
                <div className="glass-panel hover-lift" style={{ padding: '32px', borderRadius: '24px', position: 'relative', zIndex: 2, background: 'var(--color-bg-tertiary)' }}>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                       <Sparkles size={20} />
                    </div>
                    <div style={{ background: 'var(--color-bg-secondary)', padding: '16px', borderRadius: '16px', borderTopLeftRadius: 0, flex: 1, border: '1px solid var(--color-border)' }}>
                      <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--color-text-primary)', lineHeight: 1.6 }}>Hey! I noticed you are stuck on React Hooks. Would you like a simple explanation of useEffect?</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', flexDirection: 'row-reverse' }}>
                     <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-primary)', flexShrink: 0 }}>
                       <User size={20} />
                    </div>
                    <div style={{ background: 'var(--color-brand-primary)', padding: '16px', borderRadius: '16px', borderTopRightRadius: 0, color: '#fff' }}>
                      <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>Yes please! Give me a real world example.</p>
                    </div>
                  </div>
                </div>
                {/* Floating decor */}
                <div className="animate-float" style={{ position: 'absolute', top: '-30px', right: '-20px', background: 'var(--color-bg-secondary)', padding: '16px 24px', borderRadius: '16px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                  <Zap size={24} color="#f59e0b" />
                  <span style={{ fontWeight: 600 }}>Instant Answers</span>
                </div>
              </div>
              <div style={{ flex: '1 1 500px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-brand-primary)', fontWeight: 600, marginBottom: '24px', padding: '8px 24px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '99px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                  <Sparkles size={16} /> AI-Powered Learning
                </div>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '24px', lineHeight: 1.1 }}>Meet your personal<br/><span className="text-gradient">AI Tutor.</span></h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '40px', lineHeight: 1.7 }}>
                  Never get stuck again. Our integrated AI Tutor understands your curriculum, reviews your code, and explains complex concepts in a way that makes sense to you.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    "Get instant help 24/7 without waiting for mentors.",
                    "Personalized code reviews and debugging assistance.",
                    "Simplifies complex jargon into beginner-friendly terms."
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <CheckCircle size={24} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: 'var(--color-text-primary)', fontSize: '1.125rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* New Projects Showcase */}
          <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Build Real <span className="text-gradient">World Projects</span></h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                  Theory only gets you so far. Graduate with a stunning portfolio of applications that impress employers.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                {[
                  { title: "Fullstack E-Commerce", tech: "Next.js • Stripe • PostgreSQL", color: "#3b82f6", icon: <SiNextdotjs size={48} /> },
                  { title: "Real-time Chat App", tech: "React • Node.js • Socket.io", color: "#8b5cf6", icon: <SiReact size={48} /> },
                  { title: "Vulnerability Scanner", tech: "Python • Nmap • Regex", color: "#10b981", icon: <FaBug size={48} /> },
                ].map((proj, i) => (
                  <div key={i} className="card hover-lift glass-panel" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--color-glass)', borderRadius: '24px' }}>
                    <div style={{ height: '220px', background: `linear-gradient(135deg, ${proj.color}22, var(--color-bg-primary))`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                       <div style={{ color: proj.color, opacity: 0.5 }}>{proj.icon}</div>
                       <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top, var(--color-bg-tertiary), transparent)' }} />
                    </div>
                    <div style={{ padding: '32px', background: 'var(--color-bg-tertiary)' }}>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{proj.title}</h3>
                      <p style={{ color: proj.color, fontSize: '0.95rem', fontWeight: 600 }}>{proj.tech}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Tech Stack / What You Will Learn */}
          <section className="section-padding" style={{ overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Technologies You Will Learn</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>Master the most in-demand skills in the industry.</p>
            </div>
            
            <div className="marquee-container">
              <div className="marquee-content">
                {[...technologies, ...technologies].map((tech, i) => (
                  <div key={i} className="hover-glow" style={{ 
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.3s ease',
                    minWidth: '100px'
                  }} title={tech.name}>
                    <div style={{ transform: 'scale(1.5)' }}>
                      {tech.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Key Features / Why Choose Us */}
          <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Why Choose LearnFlow?</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                  We bridge the gap between expensive bootcamps and scattered YouTube tutorials by providing a cohesive, structured experience.
                </p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-glass)' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', marginBottom: '24px' }}>
                    <Target size={32} />
                  </div>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Structured Roadmap</h3>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>No more wondering what to learn next. Our roadmaps tell you exactly which concept to study, in what order, ensuring zero knowledge gaps.</p>
                </div>
                
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-glass)' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(236,72,153,0.05))', border: '1px solid rgba(236,72,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899', marginBottom: '24px' }}>
                    <Laptop size={32} />
                  </div>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Project-Based</h3>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Theory isn't enough. Build 30+ real-world projects, from simple landing pages to complex full-stack applications to build your portfolio.</p>
                </div>
                
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-glass)' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '24px' }}>
                    <Trophy size={32} />
                  </div>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Verifiable Certificates</h3>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Complete module assignments, pass the final assessment, and earn verifiable certificates to prove your skills to employers.</p>
                </div>
                
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-glass)' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', marginBottom: '24px' }}>
                    <Handshake size={32} />
                  </div>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Community Support</h3>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Join a thriving community of learners. Discuss concepts, share projects, and collaborate with peers and mentors.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Curriculum / Popular Career Paths */}
          <section className="section-padding">
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '3.5rem', marginBottom: '8px' }}>Explore Our Curriculums</h2>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>Start learning with our most requested career paths.</p>
                </div>
                <Link href="/careers" className="btn btn-secondary glass-panel hover-glow" style={{ padding: '16px 32px', borderRadius: '12px' }}>View All Paths</Link>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
                {featuredCareers.map((career, index) => (
                  <div key={career.id} className="card hover-lift glass-panel" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    backgroundColor: 'var(--color-card-bg)', 
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid var(--color-glass)',
                    padding: '40px',
                    borderRadius: '24px'
                  }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: index % 2 === 0 ? 'linear-gradient(90deg, #3b82f6, #8b5cf6)' : 'linear-gradient(90deg, #10b981, #3b82f6)', opacity: 0.8 }} />
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: index % 2 === 0 ? '#3b82f6' : '#10b981', filter: 'blur(80px)', opacity: 0.15, borderRadius: '50%', pointerEvents: 'none' }} />

                    <h3 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--color-text-primary)', position: 'relative', zIndex: 1 }}>{career.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '40px', flex: 1, lineHeight: 1.6, position: 'relative', zIndex: 1, fontSize: '1.1rem' }}>{career.description}</p>
                    
                    <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-glass)', paddingTop: '24px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {career.estimatedDuration}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                        {career._count.courses} Courses
                      </span>
                    </div>
                    
                    <Link href={`/careers/${career.slug}`} className="btn btn-primary" style={{ width: '100%', padding: '16px', borderRadius: '12px', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center', fontSize: '1.1rem' }}>
                      Start Learning <span>&rarr;</span>
                    </Link>
                  </div>
                ))}
                {featuredCareers.length === 0 && (
                  <div className="glass-panel" style={{ padding: '64px', textAlign: 'center', borderRadius: '16px', gridColumn: '1 / -1' }}>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>No career paths available yet. Admins are actively curating content.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* New Path to Success Section */}
          <section className="section-padding" style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Your Path to <span className="text-gradient">Success</span></h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                  A clear, proven pipeline to take you from absolute beginner to industry-ready professional.
                </p>
              </div>

              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
                {/* Visual Connecting Line (Desktop) */}
                <div style={{ position: 'absolute', top: '50px', left: '10%', right: '10%', height: '4px', background: 'var(--color-glass)', zIndex: 0, display: 'none' }} className="md-block">
                  <div className="path-line-active" style={{ width: '100%' }}></div>
                </div>

                {[
                  { icon: <Map size={40} color="currentColor" />, title: "Assessment", desc: "Find your ideal career path" },
                  { icon: <BookOpen size={40} color="currentColor" />, title: "Learn", desc: "Follow structured roadmaps" },
                  { icon: <Terminal size={40} color="currentColor" />, title: "Build", desc: "Create real-world projects" },
                  { icon: <Award size={40} color="currentColor" />, title: "Certify", desc: "Earn verifiable credentials" },
                  { icon: <Rocket size={40} color="currentColor" />, title: "Get Hired", desc: "Start your tech career" }
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: '1 1 150px', position: 'relative', zIndex: 1 }}>
                    <div className="path-node active hover-glow" style={{ width: '100px', height: '100px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {step.icon}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{step.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. Testimonials */}
          <section className="section-padding">
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Student <span className="text-gradient">Success Stories</span></h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                  Don't just take our word for it. See what our community has achieved.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                {[
                  { quote: "I was overwhelmed by all the tutorials out there. LearnFlow gave me the exact roadmap I needed. I landed my first frontend role in 6 months!", author: "Sarah J.", role: "Frontend Developer" },
                  { quote: "The curated resources are top-notch. I didn't have to spend a single dime to get a world-class education in full-stack development.", author: "Michael T.", role: "Software Engineer" },
                  { quote: "The structured assignments validated my skills. Showing my LearnFlow certificates and portfolio projects during interviews was a game-changer.", author: "Elena R.", role: "UI/UX Designer" }
                ].map((item, i) => (
                  <div key={i} className="card glass-panel hover-lift" style={{ padding: '40px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '24px' }}>
                    <div style={{ color: 'var(--color-brand-primary)', fontSize: '4rem', lineHeight: 1, marginBottom: '16px', opacity: 0.3, fontFamily: 'serif' }}>"</div>
                    <p style={{ fontSize: '1.125rem', color: 'var(--color-text-primary)', marginBottom: '32px', fontStyle: 'italic', lineHeight: 1.7 }}>{item.quote}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))', border: '2px solid var(--color-border)' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '1.1rem' }}>{item.author}</div>
                        <div style={{ fontSize: '0.95rem', color: 'var(--color-brand-primary)' }}>{item.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. FAQ Section */}
          <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Frequently Asked Questions</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>Everything you need to know about LearnFlow.</p>
              </div>

              <div>
                {faqs.map((faq, i) => (
                  <details key={i} className="faq-item" style={{ borderRadius: '16px', marginBottom: '24px' }}>
                    <summary className="faq-question" style={{ padding: '24px 32px', fontSize: '1.25rem' }}>
                      {faq.q}
                      <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </summary>
                    <div className="faq-answer" style={{ padding: '0 32px 32px', fontSize: '1.1rem' }}>
                      <p>{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
          
          {/* 8. Final CTA */}
          <section style={{ padding: '160px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, var(--color-bg-primary) 70%)', zIndex: 0 }} />
            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '4.5rem', marginBottom: '32px', lineHeight: 1.1, fontWeight: 800 }}>Ready to start your <br/><span className="text-gradient">tech journey?</span></h2>
              <p style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)', marginBottom: '56px' }}>
                Join thousands of students who are building their tech careers without the debt.
              </p>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/register" className="btn btn-primary" style={{ padding: '20px 48px', fontSize: '1.25rem', borderRadius: '16px', boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)', fontWeight: 600 }}>
                  Create Free Account
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)', padding: '80px 24px 40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '64px', marginBottom: '80px' }}>
            <div style={{ maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Image src="/logo.png" alt="LearnFlow Icon" width={40} height={40} style={{ objectFit: 'contain', borderRadius: '8px' }} />
                <span className="text-gradient" style={{ fontSize: '2rem', fontWeight: 700 }}>
                  LearnFlow
                </span>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Democratizing tech education by organizing the world's best free learning resources into actionable career roadmaps.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '24px', fontSize: '1.25rem' }}>Platform</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
                  <li><Link href="/careers" className="hover-white">Career Paths</Link></li>
                  <li><Link href="/assessment" className="hover-white">Assessment</Link></li>
                  <li><Link href="/login" className="hover-white">Sign In</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '24px', fontSize: '1.25rem' }}>Legal</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
                  <li><Link href="#" className="hover-white">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover-white">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '40px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1rem' }}>
            <p>&copy; {new Date().getFullYear()} LearnFlow. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
