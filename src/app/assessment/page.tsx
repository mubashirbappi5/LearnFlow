import React from 'react';
import Navbar from '@/components/layout/Navbar';
import AssessmentFlow from '@/components/assessment/AssessmentFlow';
import { prisma } from '@/lib/prisma';
import { Status } from '@prisma/client';

export default async function AssessmentPage() {
  const careers = await prisma.careerPath.findMany({
    where: { status: Status.PUBLISHED }
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Career Assessment</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            Answer a few quick questions to discover your ideal career path.
          </p>
        </div>

        <AssessmentFlow careers={careers} />
      </main>
    </div>
  );
}
