import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // If user is Admin, they shouldn't be here normally, but let's allow it or redirect
  if (session.user.role === 'ADMIN') {
    // redirect('/admin');
  }

  // Fetch user profile and enrolled career
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: {
      careerGoal: true
    }
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome back, {session.user.name || session.user.email?.split('@')[0]}</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            Track your progress and continue your learning journey.
          </p>
        </div>

        {!profile?.careerGoal ? (
          <div className="card" style={{ textAlign: 'center', padding: '64px 24px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>You haven't enrolled in a Career Path yet.</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Take our career assessment to get a personalized recommendation, or explore our career paths manually.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link href="/assessment" className="btn btn-primary">Take Assessment</Link>
              <Link href="/careers" className="btn btn-secondary">Explore Careers</Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <section className="card">
                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Your Learning Path: <span className="text-gradient">{profile.careerGoal.title}</span></h2>
                
                {/* Progress Bar */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
                    <span>Overall Progress</span>
                    <span>0%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `0%`, backgroundColor: 'var(--color-brand-primary)' }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <Link href={`/careers/${profile.careerGoal.slug}`} className="btn btn-primary">Continue Learning</Link>
                </div>
              </section>

              <section>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Recent Activity</h3>
                <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                  You haven't completed any lessons yet. Time to get started!
                </div>
              </section>
            </div>

            {/* Sidebar Area */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Your Profile</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Role</span>
                    <span>{session.user.role}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Joined</span>
                    <span>Just now</span>
                  </div>
                </div>
                <button className="btn btn-secondary w-full" style={{ marginTop: '24px', width: '100%' }}>Edit Profile</button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
