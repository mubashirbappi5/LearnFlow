'use client';

import React, { useState } from 'react';
import { createDiscussion, addComment, markAsAnswer } from '@/actions/learning/discussion';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string | null;
  username: string | null;
}

interface Comment {
  id: string;
  content: string;
  isAnswer: boolean;
  createdAt: Date;
  user: User;
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  user: User;
  comments: Comment[];
}

export default function DiscussionSection({ 
  lessonId, 
  courseSlug, 
  initialDiscussions,
  currentUserId
}: { 
  lessonId: string, 
  courseSlug: string, 
  initialDiscussions: any[],
  currentUserId?: string
}) {
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
  const [isPosting, setIsPosting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expandedDiscussionId, setExpandedDiscussionId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const router = useRouter();

  const handlePostDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setIsPosting(true);
    try {
      await createDiscussion(lessonId, title, content, courseSlug);
      setTitle('');
      setContent('');
      router.refresh(); // Refresh to get the new discussion from server
    } catch (error) {
      console.error(error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleReply = async (e: React.FormEvent, discussionId: string) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      await addComment(discussionId, replyContent, lessonId, courseSlug);
      setReplyContent('');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAsAnswer = async (commentId: string, discussionId: string) => {
    try {
      await markAsAnswer(commentId, discussionId, lessonId, courseSlug);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: '64px', paddingTop: '64px', borderTop: '1px solid var(--color-border)' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <MessageSquare size={28} color="var(--color-brand-primary)" />
        Lesson Q&A
      </h2>

      {currentUserId && (
        <form onSubmit={handlePostDiscussion} className="glass-panel" style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'var(--color-bg-secondary)', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px' }}>Ask a Question</h3>
          <input
            type="text"
            placeholder="Question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--color-glass)', backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text-primary)', marginBottom: '16px' }}
            required
          />
          <textarea
            placeholder="Explain your question in detail..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--color-glass)', backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text-primary)', marginBottom: '16px', resize: 'vertical' }}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={isPosting} className="btn btn-primary" style={{ padding: '10px 24px', borderRadius: '8px', cursor: isPosting ? 'not-allowed' : 'pointer' }}>
              {isPosting ? 'Posting...' : 'Post Question'}
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {discussions.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '40px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '16px' }}>
            No questions asked yet. Be the first to start a discussion!
          </div>
        ) : (
          discussions.map((discussion) => (
            <div key={discussion.id} className="glass-panel" style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'var(--color-bg-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{discussion.title}</h4>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} />
                  {new Date(discussion.createdAt).toLocaleDateString()}
                </div>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>{discussion.content}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Asked by {discussion.user.name || 'Anonymous'} {discussion.user.username && <span style={{ color: 'var(--color-brand-primary)' }}>@{discussion.user.username}</span>}
                </div>
                <button 
                  onClick={() => setExpandedDiscussionId(expandedDiscussionId === discussion.id ? null : discussion.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-brand-primary)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <MessageSquare size={16} />
                  {discussion.comments.length} {discussion.comments.length === 1 ? 'Reply' : 'Replies'}
                </button>
              </div>

              {expandedDiscussionId === discussion.id && (
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--color-glass)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    {discussion.comments.map((comment) => (
                      <div key={comment.id} style={{ 
                        padding: '16px', 
                        borderRadius: '12px', 
                        backgroundColor: comment.isAnswer ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-input-bg)',
                        border: comment.isAnswer ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                        position: 'relative'
                      }}>
                        {comment.isAnswer && (
                          <div style={{ position: 'absolute', top: '16px', right: '16px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                            <CheckCircle size={14} />
                            ACCEPTED ANSWER
                          </div>
                        )}
                        <p style={{ color: 'var(--color-text-primary)', marginBottom: '12px', lineHeight: 1.5, paddingRight: comment.isAnswer ? '120px' : '0' }}>{comment.content}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                          <div style={{ color: 'var(--color-text-secondary)' }}>
                            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{comment.user.name || 'Anonymous'}</span>
                            {' • '}{new Date(comment.createdAt).toLocaleDateString()}
                          </div>
                          {currentUserId === discussion.userId && !comment.isAnswer && (
                            <button 
                              onClick={() => handleMarkAsAnswer(comment.id, discussion.id)}
                              style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              Mark as Answer
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {currentUserId && (
                    <form onSubmit={(e) => handleReply(e, discussion.id)} style={{ display: 'flex', gap: '12px' }}>
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        style={{ flex: 1, padding: '10px 16px', borderRadius: '20px', border: '1px solid var(--color-glass)', backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text-primary)' }}
                        required
                      />
                      <button type="submit" className="btn btn-primary" style={{ borderRadius: '20px', padding: '10px 24px' }}>
                        Reply
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
