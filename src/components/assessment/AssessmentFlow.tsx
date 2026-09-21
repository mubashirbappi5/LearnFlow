'use client';

import React, { useState } from 'react';
import { CareerPath } from '@prisma/client';
import Link from 'next/link';

type Step = 1 | 2 | 3 | 4;

interface AssessmentFlowProps {
  careers: CareerPath[];
}

export default function AssessmentFlow({ careers }: AssessmentFlowProps) {
  const [step, setStep] = useState<Step>(1);
  const [experience, setExperience] = useState('');
  const [interest, setInterest] = useState('');
  const [time, setTime] = useState('');
  const [recommendedCareer, setRecommendedCareer] = useState<CareerPath | null>(null);

  const handleNext = () => {
    if (step < 3) setStep((prev) => (prev + 1) as Step);
    else calculateResult();
  };

  const calculateResult = () => {
    // Basic recommendation logic: 
    // In a real app this would match tags/skills. Here we just pick the first one or a relevant one.
    // If they chose 'Frontend' related things, recommend Frontend Developer.
    const match = careers.find(c => c.title.toLowerCase().includes('frontend')) || careers[0];
    setRecommendedCareer(match);
    setStep(4);
  };

  return (
    <div className="glass-panel p-8 max-w-2xl mx-auto mt-16 animate-fade-in">
      {/* Progress Bar */}
      {step < 4 && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(step / 3) * 100}%`, backgroundColor: 'var(--color-brand-primary)', transition: 'width 0.3s ease' }}></div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-in">
          <h2 style={{ fontSize: '1.875rem', marginBottom: '8px' }}>What is your current experience level?</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>Don't worry, we have paths for absolute beginners.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Absolute Beginner (No coding experience)', 'Some Experience (I know basic HTML/CSS)', 'Intermediate (I can build simple apps)'].map((opt) => (
              <button
                key={opt}
                onClick={() => setExperience(opt)}
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  backgroundColor: experience === opt ? 'rgba(99, 102, 241, 0.1)' : 'var(--color-bg-secondary)',
                  border: `1px solid ${experience === opt ? 'var(--color-brand-primary)' : 'var(--color-border)'}`,
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h2 style={{ fontSize: '1.875rem', marginBottom: '8px' }}>What are you most interested in building?</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>This helps us recommend the right career path.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Websites and User Interfaces (Frontend)', 'Servers and Databases (Backend)', 'Mobile Applications (iOS/Android)'].map((opt) => (
              <button
                key={opt}
                onClick={() => setInterest(opt)}
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  backgroundColor: interest === opt ? 'rgba(99, 102, 241, 0.1)' : 'var(--color-bg-secondary)',
                  border: `1px solid ${interest === opt ? 'var(--color-brand-primary)' : 'var(--color-border)'}`,
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <h2 style={{ fontSize: '1.875rem', marginBottom: '8px' }}>How much time can you commit weekly?</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>We'll tailor your roadmap's schedule.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Less than 5 hours', '5-10 hours', '10-20 hours', '20+ hours (Full time)'].map((opt) => (
              <button
                key={opt}
                onClick={() => setTime(opt)}
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  backgroundColor: time === opt ? 'rgba(99, 102, 241, 0.1)' : 'var(--color-bg-secondary)',
                  border: `1px solid ${time === opt ? 'var(--color-brand-primary)' : 'var(--color-border)'}`,
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && recommendedCareer && (
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', fontSize: '2rem', marginBottom: '24px' }}>
            ✓
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Your Recommended Path</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>Based on your answers, we think you'd be a great fit for:</p>
          
          <div className="card" style={{ textAlign: 'left', marginBottom: '32px', border: '1px solid var(--color-brand-primary)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--color-brand-primary)' }}>{recommendedCareer.title}</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>{recommendedCareer.description}</p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              <span>⏱ Estimated: {recommendedCareer.estimatedDuration}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href={`/careers/${recommendedCareer.slug}`} className="btn btn-primary">
              View Roadmap
            </Link>
            <button onClick={() => setStep(1)} className="btn btn-secondary">
              Retake Assessment
            </button>
          </div>
        </div>
      )}

      {step < 4 && (
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={() => setStep(prev => prev - 1 as Step)} 
            disabled={step === 1}
            className="btn btn-secondary"
            style={{ opacity: step === 1 ? 0.5 : 1, cursor: step === 1 ? 'not-allowed' : 'pointer' }}
          >
            Back
          </button>
          <button 
            onClick={handleNext}
            disabled={(step === 1 && !experience) || (step === 2 && !interest) || (step === 3 && !time)}
            className="btn btn-primary"
          >
            {step === 3 ? 'Get Results' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
}
