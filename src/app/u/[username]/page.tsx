import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { Trophy, Award, Flame, BookOpen } from 'lucide-react';

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  
  // Find by username or by ID as fallback
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: resolvedParams.username },
        { id: resolvedParams.username }
      ]
    },
    include: {
      profile: {
        include: { careerGoal: true }
      },
      certificates: {
        include: { course: true },
        orderBy: { issuedAt: 'desc' }
      },
      lessonProgress: {
        where: { status: 'COMPLETED' }
      }
    }
  });

  if (!user) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
      <Navbar />
      
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Profile Header */}
        <div className="glass-panel" style={{ 
          padding: '40px', 
          borderRadius: '24px', 
          backgroundColor: 'var(--color-bg-secondary)', 
          border: '1px solid var(--color-glass)',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            fontWeight: 800,
            color: '#fff',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
          }}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '4px' }}>{user.name || 'Anonymous User'}</h1>
            {user.username && <div style={{ fontSize: '1.25rem', color: 'var(--color-brand-primary)', marginBottom: '12px' }}>@{user.username}</div>}
            
            <div style={{ display: 'flex', gap: '24px', color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Flame size={18} color="#f59e0b" />
                <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{user.xp}</span> XP Earned
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={18} color="#3b82f6" />
                <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{user.lessonProgress.length}</span> Lessons Completed
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="#8b5cf6" />
                <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{user.certificates.length}</span> Certificates
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          {/* Left Column: About */}
          <div>
            <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-glass)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>About</h2>
              
              {user.profile ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {user.profile.careerGoal && (
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Career Goal</div>
                      <div style={{ fontWeight: 600 }}>{user.profile.careerGoal.title}</div>
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Skill Level</div>
                    <div style={{ fontWeight: 600 }}>{user.profile.skillLevel}</div>
                  </div>
                  {user.profile.learningGoal && (
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Bio / Objective</div>
                      <div style={{ lineHeight: 1.5 }}>{user.profile.learningGoal}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ color: 'var(--color-text-secondary)' }}>This user hasn't set up their profile yet.</div>
              )}
            </div>
          </div>

          {/* Right Column: Achievements */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Trophy size={28} color="#f59e0b" />
              Certificates & Achievements
            </h2>

            {user.certificates.length === 0 ? (
              <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', backgroundColor: 'var(--color-bg-secondary)', border: '1px dashed var(--color-glass-strong)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                No certificates earned yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {user.certificates.map(cert => (
                  <div key={cert.id} className="glass-panel hover-lift" style={{ 
                    padding: '24px', 
                    borderRadius: '16px', 
                    backgroundColor: 'var(--color-bg-secondary)', 
                    border: '1px solid var(--color-glass)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-brand-primary)', fontWeight: 600, marginBottom: '4px' }}>CERTIFICATE OF COMPLETION</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>{cert.course.title}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        Issued on {new Date(cert.issuedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '50%', 
                      background: 'rgba(139, 92, 246, 0.1)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#8b5cf6'
                    }}>
                      <Award size={32} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
