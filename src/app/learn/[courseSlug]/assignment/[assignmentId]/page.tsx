import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Status } from '@prisma/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AssignmentClient from '@/components/learning/AssignmentClient';

export default async function AssignmentPage({ params }: { params: Promise<{ courseSlug: string, assignmentId: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const assignment = await prisma.assignment.findUnique({
    where: { id: resolvedParams.assignmentId },
    include: { module: true }
  });

  if (!assignment || assignment.status !== Status.PUBLISHED) {
    notFound();
  }

  // Fetch user's existing submission if any
  const existingSubmission = await prisma.assignmentSubmission.findUnique({
    where: {
      userId_assignmentId: {
        userId: session.user.id,
        assignmentId: assignment.id,
      }
    }
  });

  return (
    <div style={{ padding: '64px 48px', maxWidth: '900px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <span style={{ color: 'var(--color-brand-primary)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {assignment.module.title}
        </span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '8px', marginBottom: '16px' }}>{assignment.title}</h1>
      </div>
      
      <div style={{ display: 'grid', gap: '32px' }}>
        
        {/* Instructions */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>Instructions</h2>
          <div className="markdown-body" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {assignment.instructions}
            </ReactMarkdown>
          </div>
        </div>

        {/* Requirements */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>Requirements</h2>
          <div className="markdown-body" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {assignment.requirements}
            </ReactMarkdown>
          </div>
        </div>

        {/* Helpful Resources */}
        {assignment.helpfulResources && (
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>Helpful Resources</h2>
            <div className="markdown-body" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {assignment.helpfulResources}
              </ReactMarkdown>
            </div>
          </div>
        )}

      </div>

      {/* Submission Form Component */}
      <AssignmentClient 
        assignment={assignment} 
        courseSlug={resolvedParams.courseSlug} 
        existingSubmission={existingSubmission} 
      />

    </div>
  );
}
