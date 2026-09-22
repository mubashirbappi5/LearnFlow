import React from 'react';
import { prisma } from '@/lib/prisma';
import { Flame } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function StreakWidget() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { currentStreak: true }
  });

  if (!user || user.currentStreak === 0) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      border: '1px solid rgba(245, 158, 11, 0.2)',
      borderRadius: '999px',
      color: '#f59e0b',
      fontWeight: 700,
      fontSize: '0.875rem'
    }} title={`${user.currentStreak} Day Streak`}>
      <Flame size={18} fill="#f59e0b" />
      {user.currentStreak}
    </div>
  );
}
