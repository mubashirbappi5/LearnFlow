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
  
  // State for controlling animations
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep((prev) => (prev + 1) as Step);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        calculateResult();
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep((prev) => (prev - 1) as Step);
        setIsAnimating(false);
      }, 300);
    }
  };

  const calculateResult = () => {
    // Basic recommendation logic: 
    // In a real app this would match tags/skills. Here we just pick the first one or a relevant one.
    const match = careers.find(c => c.title.toLowerCase().includes('frontend')) || careers[0];
    setRecommendedCareer(match);
    setStep(4);
  };

  const optionsStep1 = [
    { label: 'Absolute Beginner', desc: 'No coding experience', icon: '🌱' },
    { label: 'Some Experience', desc: 'I know basic HTML/CSS', icon: '🛠️' },
    { label: 'Intermediate', desc: 'I can build simple apps', icon: '🚀' }
  ];

  const optionsStep2 = [
    { label: 'Frontend', desc: 'Websites & User Interfaces', icon: '🎨' },
    { label: 'Backend', desc: 'Servers & Databases', icon: '⚙️' },
    { label: 'Mobile', desc: 'iOS & Android Applications', icon: '📱' }
  ];

  const optionsStep3 = [
    { label: 'Casual', desc: 'Less than 5 hours/week', icon: '☕' },
    { label: 'Part-time', desc: '5-15 hours/week', icon: '⏱️' },
    { label: 'Full-time', desc: '20+ hours/week', icon: '🔥' }
  ];

  return (
    <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', borderRadius: '24px', padding: '40px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Blur */}
      <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--color-brand-primary)', filter: 'blur(80px)', opacity: 0.2, zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Progress Bar */}
        {step < 4 && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              <span>Step {step} of 3</span>
              <span>{Math.round((step / 3) * 100)}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(step / 3) * 100}%`, background: 'linear-gradient(90deg, var(--color-brand-primary), var(--color-brand-secondary))', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
            </div>
          </div>
        )}

        <div style={{ transition: 'opacity 0.3s ease, transform 0.3s ease', opacity: isAnimating ? 0 : 1, transform: isAnimating ? 'translateY(10px)' : 'translateY(0)' }}>
          
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '12px', fontWeight: 700 }}>What is your current experience level?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '1.125rem' }}>Don't worry, we have paths designed for absolute beginners.</p>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                {optionsStep1.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setExperience(opt.label)}
                    className="hover-lift"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '24px',
                      backgroundColor: experience === opt.label ? 'rgba(99, 102, 241, 0.1)' : 'var(--color-bg-tertiary)',
                      border: `1px solid ${experience === opt.label ? 'var(--color-brand-primary)' : 'rgba(255,255,255,0.05)'}`,
                      borderRadius: '16px',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>{opt.icon}</div>
                    <div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: experience === opt.label ? 'var(--color-brand-primary)' : 'var(--color-text-primary)' }}>{opt.label}</div>
                      <div style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>{opt.desc}</div>
                    </div>
                    {experience === opt.label && (
                      <div style={{ marginLeft: 'auto', color: 'var(--color-brand-primary)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '12px', fontWeight: 700 }}>What are you most interested in building?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '1.125rem' }}>This helps us recommend the most relevant curriculum.</p>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                {optionsStep2.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setInterest(opt.label)}
                    className="hover-lift"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '24px',
                      backgroundColor: interest === opt.label ? 'rgba(99, 102, 241, 0.1)' : 'var(--color-bg-tertiary)',
                      border: `1px solid ${interest === opt.label ? 'var(--color-brand-primary)' : 'rgba(255,255,255,0.05)'}`,
                      borderRadius: '16px',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>{opt.icon}</div>
                    <div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: interest === opt.label ? 'var(--color-brand-primary)' : 'var(--color-text-primary)' }}>{opt.label}</div>
                      <div style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>{opt.desc}</div>
                    </div>
                    {interest === opt.label && (
                      <div style={{ marginLeft: 'auto', color: 'var(--color-brand-primary)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '12px', fontWeight: 700 }}>How much time can you commit weekly?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '1.125rem' }}>We'll adjust the roadmap schedule to fit your lifestyle.</p>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                {optionsStep3.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setTime(opt.label)}
                    className="hover-lift"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '24px',
                      backgroundColor: time === opt.label ? 'rgba(99, 102, 241, 0.1)' : 'var(--color-bg-tertiary)',
                      border: `1px solid ${time === opt.label ? 'var(--color-brand-primary)' : 'rgba(255,255,255,0.05)'}`,
                      borderRadius: '16px',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>{opt.icon}</div>
                    <div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: time === opt.label ? 'var(--color-brand-primary)' : 'var(--color-text-primary)' }}>{opt.label}</div>
                      <div style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>{opt.desc}</div>
                    </div>
                    {time === opt.label && (
                      <div style={{ marginLeft: 'auto', color: 'var(--color-brand-primary)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && recommendedCareer && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div className="animate-float" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))', border: '2px solid rgba(16, 185, 129, 0.4)', color: 'var(--color-success)', marginBottom: '32px', boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', fontWeight: 700 }}>Your Perfect Match Found!</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '40px', fontSize: '1.25rem' }}>Based on your answers, we have curated the perfect learning path for you.</p>
              
              <div className="card hover-glow" style={{ textAlign: 'left', marginBottom: '40px', background: 'linear-gradient(180deg, var(--color-bg-tertiary), var(--color-bg-secondary))', border: '1px solid var(--color-brand-primary)', borderRadius: '20px', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <h3 style={{ fontSize: '1.75rem', color: 'var(--color-text-primary)', margin: 0 }}>{recommendedCareer.title}</h3>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '1.125rem', lineHeight: 1.6 }}>{recommendedCareer.description}</p>
                
                <div style={{ display: 'flex', gap: '24px', fontSize: '1rem', color: 'var(--color-text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {recommendedCareer.estimatedDuration}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    100% Free
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href={`/careers/${recommendedCareer.slug}`} className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.125rem', borderRadius: '12px' }}>
                  Start Learning Now
                </Link>
                <button onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setStep(1); setExperience(''); setInterest(''); setTime('');
                      setIsAnimating(false);
                    }, 300);
                  }} className="btn btn-secondary glass-panel" style={{ padding: '16px 32px', fontSize: '1.125rem', borderRadius: '12px' }}>
                  Retake Assessment
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {step < 4 && (
            <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                onClick={handleBack} 
                disabled={step === 1 || isAnimating}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: step === 1 ? 'var(--color-text-muted)' : 'var(--color-text-secondary)', 
                  cursor: step === 1 ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'color 0.2s'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                Back
              </button>
              
              <button 
                onClick={handleNext}
                disabled={(step === 1 && !experience) || (step === 2 && !interest) || (step === 3 && !time) || isAnimating}
                className="btn btn-primary"
                style={{
                  padding: '12px 32px',
                  borderRadius: '12px',
                  opacity: ((step === 1 && !experience) || (step === 2 && !interest) || (step === 3 && !time)) ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {step === 3 ? 'Reveal My Path' : 'Continue'}
                {step < 3 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
