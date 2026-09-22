import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function LibraryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session.user.id },
    include: { lesson: { include: { module: { include: { course: true } } } } },
    orderBy: { createdAt: 'desc' }
  });

  const notes = await prisma.userNote.findMany({
    where: { userId: session.user.id },
    include: { lesson: { include: { module: { include: { course: true } } } } },
    orderBy: { updatedAt: 'desc' }
  });

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(145deg, #0a0a0f 0%, #11111a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>
      
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>My Library</h1>
            <p style={{ color: '#9ca3af', fontSize: '1.125rem' }}>Your saved bookmarks and personal notes.</p>
          </div>
          <Link href="/dashboard" className="hover-white" style={{ color: '#60a5fa', fontWeight: 600 }}>&larr; Back to Dashboard</Link>
        </div>

        <div style={{ display: 'grid', gap: '48px' }}>
          {/* Bookmarks */}
          <section>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              Bookmarked Lessons
            </h2>
            
            {bookmarks.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(30,30,40,0.4)', borderRadius: '16px', color: '#9ca3af' }}>
                You haven't bookmarked any lessons yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {bookmarks.map(b => b.lesson && (
                  <Link 
                    key={b.id} 
                    href={`/learn/${b.lesson.module.course.slug}/lesson/${b.lesson.id}`}
                    className="hover-lift"
                    style={{ 
                      display: 'block', 
                      padding: '24px', 
                      background: 'rgba(30,30,40,0.6)', 
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      textDecoration: 'none',
                      color: 'white'
                    }}
                  >
                    <div style={{ fontSize: '0.875rem', color: '#60a5fa', marginBottom: '8px', fontWeight: 600 }}>{b.lesson.module.course.title}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{b.lesson.title}</div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Notes */}
          <section>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              My Notes
            </h2>
            
            {notes.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(30,30,40,0.4)', borderRadius: '16px', color: '#9ca3af' }}>
                You haven't taken any notes yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {notes.map(n => (
                  <div key={n.id} style={{ 
                    padding: '24px', 
                    background: 'rgba(30,30,40,0.6)', 
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Link href={`/learn/${n.lesson.module.course.slug}/lesson/${n.lesson.id}`} className="hover-white" style={{ color: 'white', textDecoration: 'none', marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.75rem', color: '#a78bfa', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>{n.lesson.module.course.title}</div>
                      <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>{n.lesson.title}</div>
                    </Link>
                    <div style={{ 
                      flex: 1, 
                      padding: '16px', 
                      background: 'rgba(0,0,0,0.2)', 
                      borderRadius: '8px', 
                      color: '#d1d5db',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {n.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
