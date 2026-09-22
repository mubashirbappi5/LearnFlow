'use client';

import React, { useTransition } from 'react';
import { toggleBookmark } from '@/actions/learning/bookmarks';

export default function BookmarkButton({ lessonId, isBookmarked }: { lessonId: string, isBookmarked: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleBookmark(lessonId);
    });
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={isPending}
      title={isBookmarked ? "Remove Bookmark" : "Bookmark Lesson"}
      style={{
        background: isBookmarked ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${isBookmarked ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
        color: isBookmarked ? '#60a5fa' : '#9ca3af',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 600,
        transition: 'all 0.2s',
        opacity: isPending ? 0.5 : 1
      }}
      className="hover-lift"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      {isBookmarked ? "Bookmarked" : "Save Lesson"}
    </button>
  );
}
