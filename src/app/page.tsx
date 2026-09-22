import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { prisma } from '@/lib/prisma';
import { Status } from '@prisma/client';
import { Target, Laptop, Trophy, Handshake, Map, BookOpen, Terminal, Award, Rocket } from 'lucide-react';
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
      {/* Dynamic Background Elements */}
      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, var(--color-transparent-bg) 70%)', zIndex: 0, pointerEvents: 'none' }} className="animate-pulse-glow" />
      <div style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, var(--color-transparent-bg) 70%)', zIndex: 0, pointerEvents: 'none', animationDelay: '2s' }} className="animate-pulse-glow" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* 1. Hero Section */}
          <section style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            alignItems: 'center',
            minHeight: '90vh',
            padding: '40px 24px',
            maxWidth: '1400px',
            margin: '0 auto',
            gap: '64px'
          }}>
            <div style={{ maxWidth: '700px' }} className="animate-slide-up-fade">
              <div style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px', 
                borderRadius: '9999px',
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                color: 'var(--color-brand-primary)',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '32px',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.1)'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-brand-primary)' }} className="animate-pulse-glow" />
                #1 Free Tech Ecosystem
              </div>
              
              <h1 style={{ fontSize: '5rem', lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-0.04em' }}>
                Master <span className="text-gradient">Frontend, Backend & Security</span>.
              </h1>
              
              <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '48px', maxWidth: '600px', lineHeight: 1.7 }}>
                Join our structured, project-based bootcamps built entirely from world-class free resources. Get industry-ready without spending thousands.
              </p>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link href="/assessment" className="btn btn-primary" style={{ padding: '18px 36px', fontSize: '1.125rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)' }}>
                  Start Your Journey
                </Link>
                <Link href="/careers" className="btn btn-secondary glass-panel hover-glow" style={{ padding: '18px 36px', fontSize: '1.125rem', borderRadius: '12px' }}>
                  Explore Curriculums
                </Link>
              </div>
            </div>
            
            {/* New Tech Ecosystem Vector Graphic */}
            <div style={{ position: 'relative', height: '100%', minHeight: '500px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="100%" height="100%" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '600px' }}>
                <defs>
                  <linearGradient id="gradBackend" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="gradFrontend" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="gradSecurity" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="heavyGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="25" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Connecting Grid / Web */}
                <g className="animate-dash-draw" stroke="var(--color-glass-strong)" strokeWidth="1.5" strokeDasharray="5 5">
                  <path d="M300 300 L150 150" />
                  <path d="M300 300 L450 150" />
                  <path d="M300 300 L150 450" />
                  <path d="M300 300 L450 450" />
                  <circle cx="300" cy="300" r="150" />
                  <circle cx="300" cy="300" r="220" />
                </g>

                {/* Central Server / Backend Node */}
                <g className="animate-pulse-heavy">
                  <circle cx="300" cy="300" r="70" fill="url(#gradBackend)" filter="url(#heavyGlow)" />
                  <circle cx="300" cy="300" r="65" fill="var(--color-bg-secondary)" />
                  {/* Database Icon */}
                  <path d="M270 290 Q300 310 330 290" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M270 310 Q300 330 330 310" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M270 270 Q300 290 330 270 Q300 250 270 270 Z" stroke="#10b981" strokeWidth="4" fill="none" />
                </g>

                {/* Orbiting Elements container */}
                <g className="animate-orbit-spin">
                  {/* Frontend Node */}
                  <g transform="translate(150, 150) rotate(-45)">
                    <rect x="-40" y="-40" width="80" height="80" rx="16" fill="url(#gradFrontend)" filter="url(#heavyGlow)"/>
                    <rect x="-38" y="-38" width="76" height="76" rx="14" fill="var(--color-bg-secondary)"/>
                    {/* UI Icon */}
                    <path d="M-20 -10 L-20 20 L20 20 L20 -10 Z" stroke="#3b82f6" strokeWidth="3" fill="none"/>
                    <path d="M-20 -10 L20 -10" stroke="#3b82f6" strokeWidth="3"/>
                    <circle cx="-10" cy="-20" r="3" fill="#3b82f6" />
                  </g>

                  {/* Security Node */}
                  <g transform="translate(450, 450) rotate(135)">
                    <polygon points="0,-40 35,-15 35,25 0,50 -35,25 -35,-15" fill="url(#gradSecurity)" filter="url(#heavyGlow)"/>
                    <polygon points="0,-36 32,-14 32,23 0,46 -32,23 -32,-14" fill="var(--color-bg-secondary)"/>
                    {/* Shield/Lock Icon */}
                    <rect x="-12" y="0" width="24" height="18" rx="2" stroke="#ef4444" strokeWidth="3" fill="none"/>
                    <path d="M-8 0 V-8 Q-8 -15 0 -15 Q8 -15 8 -8 V0" stroke="#ef4444" strokeWidth="3" fill="none"/>
                  </g>

                  {/* API Data Packets */}
                  <circle cx="300" cy="80" r="8" fill="#f59e0b" filter="url(#heavyGlow)" />
                  <circle cx="80" cy="300" r="8" fill="#3b82f6" filter="url(#heavyGlow)" />
                  <circle cx="520" cy="300" r="8" fill="#10b981" filter="url(#heavyGlow)" />
                  <circle cx="300" cy="520" r="8" fill="#ef4444" filter="url(#heavyGlow)" />
                </g>
              </svg>
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

          {/* 3. Tech Stack / What You Will Learn */}
          <section className="section-padding" style={{ overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Technologies You Will Learn</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>Master the most in-demand skills in the industry.</p>
            </div>
            
            <div className="marquee-container">
              <div className="marquee-content">
                {/* Double the array for seamless infinite scroll */}
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
                <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Why Choose LearnFlow?</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                  We bridge the gap between expensive bootcamps and scattered YouTube tutorials by providing a cohesive, structured experience.
                </p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-glass)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', marginBottom: '24px' }}>
                    <Target size={28} />
                  </div>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Structured Roadmap</h3>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>No more wondering what to learn next. Our roadmaps tell you exactly which concept to study, in what order, ensuring zero knowledge gaps.</p>
                </div>
                
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-glass)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(236,72,153,0.05))', border: '1px solid rgba(236,72,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899', marginBottom: '24px' }}>
                    <Laptop size={28} />
                  </div>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Project-Based</h3>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Theory isn't enough. Build 30+ real-world projects, from simple landing pages to complex full-stack applications to build your portfolio.</p>
                </div>
                
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-glass)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '24px' }}>
                    <Trophy size={28} />
                  </div>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Verifiable Certificates</h3>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Complete module assignments, pass the final assessment, and earn verifiable certificates to prove your skills to employers.</p>
                </div>
                
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-glass)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', marginBottom: '24px' }}>
                    <Handshake size={28} />
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
                  <h2 style={{ fontSize: '3rem', marginBottom: '8px' }}>Explore Our Curriculums</h2>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>Start learning with our most requested career paths.</p>
                </div>
                <Link href="/careers" className="btn btn-secondary glass-panel hover-glow" style={{ padding: '16px 32px' }}>View All Paths</Link>
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
                    padding: '32px',
                    borderRadius: '24px'
                  }}>
                    {/* Animated top border line */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: index % 2 === 0 ? 'linear-gradient(90deg, #3b82f6, #8b5cf6)' : 'linear-gradient(90deg, #10b981, #3b82f6)', opacity: 0.8 }} />
                    {/* Subtle Background Glow */}
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: index % 2 === 0 ? '#3b82f6' : '#10b981', filter: 'blur(80px)', opacity: 0.15, borderRadius: '50%', pointerEvents: 'none' }} />

                    <h3 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--color-text-primary)', position: 'relative', zIndex: 1 }}>{career.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', flex: 1, lineHeight: 1.6, position: 'relative', zIndex: 1 }}>{career.description}</p>
                    
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.875rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-glass)', paddingTop: '24px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {career.estimatedDuration}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                        {career._count.courses} Courses
                      </span>
                    </div>
                    
                    <Link href={`/careers/${career.slug}`} className="btn btn-primary" style={{ width: '100%', padding: '16px', borderRadius: '12px', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
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
          <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Your Path to Success</h2>
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
                  { icon: <Map size={36} color="currentColor" />, title: "Assessment", desc: "Find your ideal career path" },
                  { icon: <BookOpen size={36} color="currentColor" />, title: "Learn", desc: "Follow structured roadmaps" },
                  { icon: <Terminal size={36} color="currentColor" />, title: "Build", desc: "Create real-world projects" },
                  { icon: <Award size={36} color="currentColor" />, title: "Certify", desc: "Earn verifiable credentials" },
                  { icon: <Rocket size={36} color="currentColor" />, title: "Get Hired", desc: "Start your tech career" }
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: '1 1 150px', position: 'relative', zIndex: 1 }}>
                    <div className="path-node active hover-glow" style={{ width: '80px', height: '80px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {step.icon}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{step.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. Testimonials */}
          <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Student Success Stories</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                  Don't just take our word for it. See what our community has achieved.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                {[
                  { quote: "I was overwhelmed by all the tutorials out there. LearnFlow gave me the exact roadmap I needed. I landed my first frontend role in 6 months!", author: "Sarah J.", role: "Frontend Developer" },
                  { quote: "The curated resources are top-notch. I didn't have to spend a single dime to get a world-class education in full-stack development.", author: "Michael T.", role: "Software Engineer" },
                  { quote: "The structured assignments validated my skills. Showing my LearnFlow certificates and portfolio projects during interviews was a game-changer.", author: "Elena R.", role: "UI/UX Designer" }
                ].map((item, i) => (
                  <div key={i} className="card glass-panel hover-lift" style={{ padding: '40px 32px', backgroundColor: 'var(--color-bg-tertiary)' }}>
                    <div style={{ color: 'var(--color-brand-primary)', fontSize: '3rem', lineHeight: 1, marginBottom: '16px', opacity: 0.5 }}>"</div>
                    <p style={{ fontSize: '1.125rem', color: 'var(--color-text-primary)', marginBottom: '32px', fontStyle: 'italic', lineHeight: 1.6 }}>{item.quote}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.author}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{item.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. FAQ Section */}
          <section className="section-padding">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Frequently Asked Questions</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>Everything you need to know about LearnFlow.</p>
              </div>

              <div>
                {faqs.map((faq, i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-question">
                      {faq.q}
                      <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </summary>
                    <div className="faq-answer">
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
              <h2 style={{ fontSize: '4rem', marginBottom: '32px', lineHeight: 1.1 }}>Ready to start your <br/><span className="text-gradient">tech journey?</span></h2>
              <p style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)', marginBottom: '56px' }}>
                Join thousands of students who are building their tech careers without the debt.
              </p>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/register" className="btn btn-primary" style={{ padding: '20px 48px', fontSize: '1.25rem', borderRadius: '12px', boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)' }}>
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
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                Democratizing tech education by organizing the world's best free learning resources into actionable career roadmaps.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '24px', fontSize: '1.125rem' }}>Platform</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                  <li><Link href="/careers" className="hover-white">Career Paths</Link></li>
                  <li><Link href="/assessment" className="hover-white">Assessment</Link></li>
                  <li><Link href="/login" className="hover-white">Sign In</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '24px', fontSize: '1.125rem' }}>Legal</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
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
