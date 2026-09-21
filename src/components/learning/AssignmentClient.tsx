'use client';

import React, { useState } from 'react';
import { Assignment, AssignmentSubmission, SubmissionType } from '@prisma/client';
import { submitAssignment } from '@/actions/learning/assignment';

interface AssignmentClientProps {
  assignment: Assignment;
  courseSlug: string;
  existingSubmission: AssignmentSubmission | null;
}

export default function AssignmentClient({ assignment, courseSlug, existingSubmission }: AssignmentClientProps) {
  const [submissionType, setSubmissionType] = useState<SubmissionType>(existingSubmission?.submissionType || assignment.allowedTypes[0] || 'GITHUB_URL');
  const [content, setContent] = useState(existingSubmission?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    try {
      await submitAssignment(assignment.id, content, submissionType, courseSlug);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert('Failed to submit assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: '40px', padding: '32px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>
        {existingSubmission ? 'Update Your Submission' : 'Submit Your Assignment'}
      </h3>

      {success && (
        <div style={{ padding: '16px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', borderRadius: '8px', marginBottom: '24px', border: '1px solid var(--color-success)' }}>
          Assignment submitted successfully! Admin will review your work soon.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Submission Type</label>
          <div style={{ display: 'flex', gap: '16px' }}>
            {assignment.allowedTypes.map(type => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="submissionType" 
                  value={type} 
                  checked={submissionType === type}
                  onChange={() => setSubmissionType(type)}
                  style={{ accentColor: 'var(--color-brand-primary)' }}
                />
                <span style={{ fontSize: '0.875rem' }}>{type.replace('_', ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="content" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
            {submissionType === 'GITHUB_URL' ? 'GitHub Repository URL' : 
             submissionType === 'LIVE_URL' ? 'Live Project URL' : 
             'Submission Content'}
          </label>
          {submissionType === 'TEXT' ? (
            <textarea 
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your answer or code here..."
              required
              rows={6}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
            />
          ) : (
            <input 
              id="content"
              type="url"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="https://..."
              required
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
            />
          )}
        </div>

        <div>
          <button type="submit" disabled={isSubmitting || !content} className="btn btn-primary" style={{ padding: '12px 32px' }}>
            {isSubmitting ? 'Submitting...' : existingSubmission ? 'Update Submission' : 'Submit'}
          </button>
        </div>

      </form>
    </div>
  );
}
