'use client';

import React, { useState, useTransition } from 'react';
import { saveNote, deleteNote } from '@/actions/learning/notes';

export default function NotesSection({ lessonId, initialNote }: { lessonId: string, initialNote: string }) {
  const [note, setNote] = useState(initialNote);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!note.trim()) {
      handleDelete();
      return;
    }
    startTransition(async () => {
      await saveNote(lessonId, note);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteNote(lessonId);
      setNote('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div style={{
      background: 'var(--color-bg-secondary)',
      backdropFilter: 'blur(12px)',
      border: '1px solid var(--color-glass)',
      borderRadius: '24px',
      padding: '32px',
      marginTop: '64px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          Your Notes
        </h3>
        {saved && <span style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: 600 }}>Saved successfully!</span>}
      </div>
      
      <textarea 
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type your notes here... (They are saved automatically to your dashboard)"
        style={{
          width: '100%',
          minHeight: '200px',
          background: 'var(--color-input-bg)',
          border: '1px solid var(--color-glass-strong)',
          borderRadius: '16px',
          padding: '24px',
          color: 'var(--color-text-primary)',
          fontSize: '1rem',
          lineHeight: 1.6,
          resize: 'vertical',
          outline: 'none',
          marginBottom: '24px'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        {initialNote && (
          <button 
            onClick={handleDelete}
            disabled={isPending}
            style={{
              background: 'transparent',
              color: '#ef4444',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '12px 24px'
            }}
          >
            Clear Note
          </button>
        )}
        <button 
          onClick={handleSave}
          disabled={isPending || note === initialNote}
          className="btn btn-primary"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            border: 'none',
            padding: '12px 32px',
            borderRadius: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: isPending || note === initialNote ? 0.5 : 1
          }}
        >
          {isPending ? 'Saving...' : 'Save Note'}
        </button>
      </div>
    </div>
  );
}
