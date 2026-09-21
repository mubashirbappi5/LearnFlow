import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Split Hero Section */}
        <section style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          alignItems: 'center',
          minHeight: '80vh',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <div style={{ padding: '64px 48px', maxWidth: '800px' }}>
            <div style={{ 
              display: 'inline-block',
              padding: '6px 16px', 
              borderRadius: '9999px',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              color: 'var(--color-brand-primary)',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '24px',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
              Launch Your Tech Career Today
            </div>
            
            <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.04em' }}>
              Your career doesn't need an <span className="text-gradient">expensive course.</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '40px', maxWidth: '600px' }}>
              Stop paying thousands for bootcamps. Choose your goal and follow a structured learning path built entirely from high-quality, free internet resources, curated by industry experts.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/assessment" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
                Find My Career Path
              </Link>
              <Link href="/careers" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
                Explore Careers
              </Link>
            </div>
            
            <div style={{ marginTop: '48px', display: 'flex', gap: '32px', color: 'var(--color-text-secondary)' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>100%</strong>
                <span>Free Resources</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>Structured</strong>
                <span>Step-by-step paths</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>Verified</strong>
                <span>Skill Certificates</span>
              </div>
            </div>
          </div>
          
          <div style={{ position: 'relative', height: '100%', minHeight: '500px', width: '100%' }}>
            <Image 
              src="/hero.jpg" 
              alt="Abstract 3D learning platform illustration" 
              fill 
              style={{ objectFit: 'cover', borderLeft: '1px solid var(--color-border)' }}
              priority
            />
            {/* Overlay gradient for readability if needed on mobile */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--color-bg-primary) 0%, transparent 100%)', opacity: 0.3 }} />
          </div>
        </section>

        {/* Featured Career Paths */}
        <section style={{ padding: '96px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Popular Career Paths</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>Start learning with our most requested curriculums.</p>
              </div>
              <Link href="/careers" className="btn btn-secondary">View All Paths</Link>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
              {featuredCareers.map((career) => (
                <div key={career.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--color-text-primary)' }}>{career.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', flex: 1 }}>{career.description}</p>
                  
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.875rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '24px', marginBottom: '24px' }}>
                    <span>⏱ {career.estimatedDuration}</span>
                    <span>📚 {career._count.courses} Courses</span>
                  </div>
                  
                  <Link href={`/careers/${career.slug}`} className="btn btn-primary" style={{ width: '100%' }}>
                    Start Learning
                  </Link>
                </div>
              ))}
              {featuredCareers.length === 0 && (
                <div style={{ padding: '48px', textAlign: 'center', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px', gridColumn: '1 / -1' }}>
                  <p style={{ color: 'var(--color-text-secondary)' }}>No career paths available yet. Admins are actively curating content.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '96px 24px', backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '700px', margin: '0 auto 64px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Why Choose LearnFlow?</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
                We bridge the gap between expensive bootcamps and scattered YouTube tutorials by providing a cohesive, structured experience.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div className="card" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
                  🎯
                </div>
                <h3 style={{ marginBottom: '12px', fontSize: '1.25rem' }}>Curated Roadmaps</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>No more wondering what to learn next. Our roadmaps tell you exactly which concept to study, in what order, ensuring zero knowledge gaps.</p>
              </div>
              <div className="card" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--color-brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
                  💸
                </div>
                <h3 style={{ marginBottom: '12px', fontSize: '1.25rem' }}>100% Free Content</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>We don't create paid courses. We embed and link to the best free content from MDN, FreeCodeCamp, YouTube, and official documentation.</p>
              </div>
              <div className="card" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
                  🏆
                </div>
                <h3 style={{ marginBottom: '12px', fontSize: '1.25rem' }}>Practical Validation</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>Reading isn't enough. We test your knowledge with module quizzes and real-world project assignments that you build and deploy.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section style={{ padding: '120px 24px', textAlign: 'center', background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 60%)' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Ready to start learning?</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '40px' }}>
              Join thousands of students who are building their tech careers without the debt.
            </p>
            <Link href="/register" className="btn btn-primary" style={{ padding: '16px 48px', fontSize: '1.25rem' }}>
              Create Free Account
            </Link>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)', padding: '64px 24px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '48px', marginBottom: '64px' }}>
          <div style={{ maxWidth: '300px' }}>
            <div className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>LearnFlow</div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              Democratizing tech education by organizing the world's best free learning resources into actionable career roadmaps.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '16px' }}>Platform</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                <li><Link href="/careers" className="hover-white">Career Paths</Link></li>
                <li><Link href="/assessment" className="hover-white">Assessment</Link></li>
                <li><Link href="/login" className="hover-white">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '16px' }}>Legal</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                <li><Link href="#" className="hover-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '32px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          <p>&copy; {new Date().getFullYear()} LearnFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
