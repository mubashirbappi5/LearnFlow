import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { prisma } from '@/lib/prisma';
import { Status } from '@prisma/client';

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

  const technologies = ["React", "Node.js", "MongoDB", "Express", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "PostgreSQL", "Prisma"];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      {/* Dynamic Background Elements */}
      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, rgba(10,10,11,0) 70%)', zIndex: 0, pointerEvents: 'none' }} className="animate-pulse-glow" />
      <div style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, rgba(10,10,11,0) 70%)', zIndex: 0, pointerEvents: 'none' }} className="animate-pulse-glow" style={{ animationDelay: '2s' } as any} />

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
            <div style={{ maxWidth: '700px' }}>
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
                #1 Free Learning Platform
              </div>
              
              <h1 style={{ fontSize: '5rem', lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-0.04em' }}>
                Become a <span className="text-gradient">Top-Tier Developer</span> from scratch.
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
            
            {/* Vector Graphic Hero Area */}
            <div style={{ position: 'relative', height: '100%', minHeight: '500px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="100%" height="100%" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '600px' }} className="animate-float">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="15" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Central Core */}
                <circle cx="300" cy="300" r="120" fill="url(#grad1)" filter="url(#glow)" />
                <circle cx="300" cy="300" r="118" fill="var(--color-bg-primary)" />
                <path d="M280 270 L340 300 L280 330 Z" fill="url(#grad1)" />
                
                {/* Orbiting Elements */}
                <g className="animate-float-delayed">
                  <rect x="100" y="150" width="80" height="80" rx="16" fill="url(#grad2)" transform="rotate(15 140 190)" filter="url(#glow)"/>
                  <rect x="102" y="152" width="76" height="76" rx="14" fill="var(--color-bg-tertiary)" transform="rotate(15 140 190)" />
                  <path d="M120 190 L160 190" stroke="var(--color-brand-secondary)" strokeWidth="4" strokeLinecap="round" transform="rotate(15 140 190)"/>
                  <path d="M120 205 L145 205" stroke="var(--color-brand-secondary)" strokeWidth="4" strokeLinecap="round" transform="rotate(15 140 190)"/>
                </g>

                <g className="animate-float">
                  <circle cx="480" cy="200" r="45" fill="url(#grad1)" filter="url(#glow)"/>
                  <circle cx="480" cy="200" r="42" fill="var(--color-bg-secondary)"/>
                  <text x="480" y="210" fill="url(#grad1)" fontSize="32" fontWeight="bold" textAnchor="middle">&lt;/&gt;</text>
                </g>

                <g className="animate-float-delayed" style={{ animationDelay: '1s' } as any}>
                  <rect x="380" y="420" width="120" height="70" rx="12" fill="url(#grad2)" filter="url(#glow)"/>
                  <rect x="382" y="422" width="116" height="66" rx="10" fill="var(--color-bg-primary)"/>
                  <circle cx="410" cy="455" r="10" fill="var(--color-brand-primary)"/>
                  <path d="M430 455 L480 455" stroke="var(--color-text-secondary)" strokeWidth="4" strokeLinecap="round"/>
                </g>

                <g className="animate-float" style={{ animationDelay: '2s' } as any}>
                  <polygon points="150,450 180,400 210,450" fill="url(#grad1)" filter="url(#glow)"/>
                  <polygon points="154,448 180,405 206,448" fill="var(--color-bg-tertiary)"/>
                </g>
                
                {/* Connecting Lines */}
                <path d="M180 190 Q240 240 240 300" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" fill="none"/>
                <path d="M435 220 Q360 260 360 300" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" fill="none"/>
                <path d="M400 420 Q360 360 360 300" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" fill="none"/>
                <path d="M190 420 Q240 360 240 300" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" fill="none"/>
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
                  <div key={i} className="tech-item hover-glow">
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-brand-primary)' }}></div>
                    {tech}
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
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
                    🎯
                  </div>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Structured Roadmap</h3>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>No more wondering what to learn next. Our roadmaps tell you exactly which concept to study, in what order, ensuring zero knowledge gaps.</p>
                </div>
                
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(236,72,153,0.05))', border: '1px solid rgba(236,72,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
                    💻
                  </div>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Project-Based</h3>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Theory isn't enough. Build 30+ real-world projects, from simple landing pages to complex full-stack applications to build your portfolio.</p>
                </div>
                
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
                    🏆
                  </div>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Verifiable Certificates</h3>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Complete module assignments, pass the final assessment, and earn verifiable certificates to prove your skills to employers.</p>
                </div>
                
                <div className="card glass-panel hover-lift" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
                    🤝
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
                {featuredCareers.map((career) => (
                  <div key={career.id} className="card hover-glow glass-panel" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-secondary)' }}>
                    <h3 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--color-text-primary)' }}>{career.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', flex: 1, lineHeight: 1.6 }}>{career.description}</p>
                    
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.875rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '24px', marginBottom: '24px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {career.estimatedDuration}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                        {career._count.courses} Courses
                      </span>
                    </div>
                    
                    <Link href={`/careers/${career.slug}`} className="btn btn-primary" style={{ width: '100%', padding: '16px', borderRadius: '8px' }}>
                      Start Learning
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
              <div className="text-gradient" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '24px' }}>LearnFlow</div>
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
