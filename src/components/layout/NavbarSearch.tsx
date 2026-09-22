'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NavbarSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Handle Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('navbar-search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{ 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        width: isFocused ? '280px' : '220px',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div style={{
        position: 'absolute',
        left: '12px',
        color: isFocused ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none',
        transition: 'color 0.3s ease'
      }}>
        <Search size={16} />
      </div>
      
      <input 
        id="navbar-search-input"
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search courses..." 
        style={{ 
          width: '100%',
          padding: '10px 16px 10px 36px', 
          borderRadius: '9999px', 
          border: isFocused ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid var(--color-glass-strong)', 
          backgroundColor: isFocused ? 'var(--color-bg-primary)' : 'var(--color-glass)', 
          color: 'var(--color-text-primary)',
          fontSize: '0.875rem',
          outline: 'none',
          boxShadow: isFocused ? '0 0 0 3px rgba(99, 102, 241, 0.15)' : 'none',
          transition: 'all 0.3s ease',
        }} 
      />

      <div style={{
        position: 'absolute',
        right: '12px',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none',
        opacity: isFocused || query ? 0 : 1,
        transition: 'opacity 0.2s ease'
      }}>
        <kbd style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-glass-strong)',
          borderRadius: '4px',
          padding: '2px 6px',
          fontFamily: 'monospace'
        }}>
          Ctrl K
        </kbd>
      </div>
    </form>
  );
}
