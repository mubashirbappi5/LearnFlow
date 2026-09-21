import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Hero Section */}
        <section style={{ 
          padding: '120px 24px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          background: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.15) 0%, transparent 40%)'
        }}>
          <div style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.04em' }}>
              Your career doesn't need an <span className="text-gradient">expensive course.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '40px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Choose your goal and follow a structured learning path built entirely from high-quality, free learning resources.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/assessment" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
                Find My Career Path
              </Link>
              <Link href="/careers" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
                Explore Careers
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '80px 24px', backgroundColor: 'var(--color-bg-secondary)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>How LearnFlow Works</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>A complete roadmap from beginner to professional, completely free.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div className="card" style={{ textAlign: 'center', alignItems: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px' }}>
                  1
                </div>
                <h3 style={{ marginBottom: '12px' }}>Take the Assessment</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>Tell us about your current skills, interests, and time commitment to get a personalized roadmap.</p>
              </div>
              <div className="card" style={{ textAlign: 'center', alignItems: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px' }}>
                  2
                </div>
                <h3 style={{ marginBottom: '12px' }}>Follow the Path</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>Learn sequentially through curated modules, video embeds, and written documentation.</p>
              </div>
              <div className="card" style={{ textAlign: 'center', alignItems: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px' }}>
                  3
                </div>
                <h3 style={{ marginBottom: '12px' }}>Prove Your Skills</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>Complete practical assignments and quizzes to earn a verifiable certificate of completion.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid var(--color-border)', padding: '40px 24px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
        <p>&copy; {new Date().getFullYear()} LearnFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}
