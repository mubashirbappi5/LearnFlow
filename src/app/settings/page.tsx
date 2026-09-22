import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updateProfile } from '@/actions/user/profile';
import { Status } from '@prisma/client';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id }
  });

  const careers = await prisma.careerPath.findMany({
    where: { status: Status.PUBLISHED },
    orderBy: { title: 'asc' }
  });

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'var(--color-bg-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>
      
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '800px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>Profile Settings</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '40px', fontSize: '1.125rem' }}>Update your personal information and learning goals.</p>

        <form action={updateProfile} style={{ 
          background: 'var(--color-bg-secondary)', 
          backdropFilter: 'blur(12px)', 
          padding: '40px', 
          borderRadius: '24px', 
          border: '1px solid var(--color-glass)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Full Name</label>
              <input 
                type="text" 
                name="name" 
                defaultValue={session.user.name || ''} 
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'var(--color-input-bg)', border: '1px solid var(--color-glass-strong)', color: 'var(--color-text-primary)', fontSize: '1rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Username (for public profile)</label>
              <input 
                type="text" 
                name="username" 
                defaultValue={(session.user as any).username || ''} 
                placeholder="johndoe"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'var(--color-input-bg)', border: '1px solid var(--color-glass-strong)', color: 'var(--color-text-primary)', fontSize: '1rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Email Address</label>
            <input 
              type="email" 
              value={session.user.email!} 
              disabled
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'var(--color-input-bg)', border: '1px solid var(--color-glass)', color: 'var(--color-text-secondary)', fontSize: '1rem', cursor: 'not-allowed' }}
            />
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '6px' }}>Email cannot be changed.</p>
          </div>

          <div style={{ height: '1px', background: 'var(--color-glass-strong)', margin: '16px 0' }} />

          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Learning Preferences</h3>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Primary Career Goal</label>
            <select 
              name="careerGoalId" 
              defaultValue={profile?.careerGoalId || ''}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'var(--color-input-bg)', border: '1px solid var(--color-glass-strong)', color: 'var(--color-text-primary)', fontSize: '1rem' }}
            >
              <option value="">Select a career path</option>
              {careers.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Skill Level</label>
              <select 
                name="skillLevel" 
                defaultValue={profile?.skillLevel || 'Beginner'}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'var(--color-input-bg)', border: '1px solid var(--color-glass-strong)', color: 'var(--color-text-primary)', fontSize: '1rem' }}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Daily Study Hours</label>
              <input 
                type="number" 
                name="dailyStudyHours" 
                min="0" max="24"
                defaultValue={profile?.dailyStudyHours || 2} 
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'var(--color-input-bg)', border: '1px solid var(--color-glass-strong)', color: 'var(--color-text-primary)', fontSize: '1rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>What is your main learning goal?</label>
            <textarea 
              name="learningGoal"
              rows={3}
              defaultValue={profile?.learningGoal || ''}
              placeholder="e.g. I want to build my own startup, get a job at FAANG, etc."
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'var(--color-input-bg)', border: '1px solid var(--color-glass-strong)', color: 'var(--color-text-primary)', fontSize: '1rem', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1.125rem', borderRadius: '12px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', boxShadow: '0 4px 14px rgba(59,130,246,0.4)', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
