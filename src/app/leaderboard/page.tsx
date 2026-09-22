import React from 'react';
import { prisma } from '@/lib/prisma';
import { Trophy, Medal, Award, Flame } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';

export default async function LeaderboardPage() {
  const topUsers = await prisma.user.findMany({
    where: { xp: { gt: 0 } },
    orderBy: { xp: 'desc' },
    take: 10,
    select: {
      id: true,
      name: true,
      username: true,
      xp: true,
    }
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
      <Navbar />
      
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))', color: '#f59e0b', marginBottom: '24px' }}>
            <Trophy size={40} />
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '16px' }}>Global Leaderboard</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Complete lessons and pass quizzes to earn XP and climb the ranks. Show the world your dedication to learning.
          </p>
        </div>

        <div className="glass-panel" style={{ backgroundColor: 'var(--color-bg-secondary)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--color-glass)' }}>
          {topUsers.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              No XP earned yet. Start learning to get on the leaderboard!
            </div>
          ) : (
            <div>
              {topUsers.map((user, index) => (
                <div key={user.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '24px', 
                  borderBottom: index < topUsers.length - 1 ? '1px solid var(--color-glass)' : 'none',
                  backgroundColor: index === 0 ? 'rgba(245, 158, 11, 0.05)' : index === 1 ? 'rgba(156, 163, 175, 0.05)' : index === 2 ? 'rgba(180, 83, 9, 0.05)' : 'transparent'
                }}>
                  <div style={{ width: '48px', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    {index === 0 ? <Trophy size={28} color="#f59e0b" /> : index === 1 ? <Medal size={28} color="#9ca3af" /> : index === 2 ? <Award size={28} color="#b45309" /> : `#${index + 1}`}
                  </div>
                  
                  <div style={{ flex: 1, marginLeft: '24px' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      <Link href={`/u/${user.username || user.id}`} className="hover-white" style={{ color: 'inherit', textDecoration: 'none' }}>
                        {user.name || 'Anonymous User'}
                      </Link>
                    </div>
                    {user.username && (
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>@{user.username}</div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
                    <Flame size={20} color="#f59e0b" />
                    {user.xp} XP
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
