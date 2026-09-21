'use client';

import React, { useState } from 'react';
import { Quiz, QuizQuestion } from '@prisma/client';

interface QuizClientProps {
  quiz: Quiz & { questions: QuizQuestion[] };
  courseSlug: string;
}

export default function QuizClient({ quiz, courseSlug }: QuizClientProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const question = quiz.questions[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === quiz.questions.length - 1;

  if (quiz.questions.length === 0) {
    return <div style={{ padding: '64px' }}>This quiz has no questions yet.</div>;
  }

  const handleSelectOption = (option: string) => {
    const currentSelections = selectedAnswers[question.id] || [];
    let newSelections: string[];

    if (question.type === 'MULTIPLE_CHOICE' || question.type === 'TRUE_FALSE') {
      newSelections = [option]; // Only one selection
    } else {
      // MULTIPLE_SELECT
      if (currentSelections.includes(option)) {
        newSelections = currentSelections.filter(o => o !== option);
      } else {
        newSelections = [...currentSelections, option];
      }
    }

    setSelectedAnswers({
      ...selectedAnswers,
      [question.id]: newSelections
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateScore();
    } else {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach(q => {
      const userAnswers = selectedAnswers[q.id] || [];
      const correctAnswers: string[] = JSON.parse(q.correctOptions);
      
      // Basic exact array match for multiple select, or single element match
      const isCorrect = userAnswers.length === correctAnswers.length && 
                       userAnswers.every(a => correctAnswers.includes(a));
      
      if (isCorrect) correctCount++;
    });

    const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    // In a real app, we would send the attempt to the server here using a server action
  };

  if (showResults) {
    const passed = score >= quiz.passingScore;
    return (
      <div style={{ padding: '64px 48px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Quiz Results</h2>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          border: `8px solid ${passed ? 'var(--color-success)' : 'var(--color-error)'}`,
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '24px',
          color: passed ? 'var(--color-success)' : 'var(--color-error)'
        }}>
          {score}%
        </div>
        
        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
          {passed ? 'Congratulations! You passed.' : 'Keep practicing! You did not meet the passing score.'}
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
          Passing score is {quiz.passingScore}%.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button onClick={() => { setShowResults(false); setCurrentQuestionIdx(0); setSelectedAnswers({}); }} className="btn btn-secondary">
            Retake Quiz
          </button>
          <a href={`/learn/${courseSlug}`} className="btn btn-primary">
            Back to Course
          </a>
        </div>
      </div>
    );
  }

  // Question View
  let options: string[] = [];
  try { options = JSON.parse(question.options); } catch (e) {}

  const currentSelections = selectedAnswers[question.id] || [];

  return (
    <div style={{ padding: '64px 48px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', marginBottom: '16px', fontSize: '0.875rem' }}>
          <span>Question {currentQuestionIdx + 1} of {quiz.questions.length}</span>
          <span>{question.type.replace('_', ' ')}</span>
        </div>
        <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '2px', overflow: 'hidden', marginBottom: '32px' }}>
          <div style={{ height: '100%', width: `${((currentQuestionIdx + 1) / quiz.questions.length) * 100}%`, backgroundColor: 'var(--color-brand-primary)', transition: 'width 0.3s' }}></div>
        </div>

        <h2 style={{ fontSize: '1.5rem', lineHeight: 1.4 }}>{question.question}</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelectOption(opt)}
            style={{
              padding: '16px 24px',
              textAlign: 'left',
              backgroundColor: currentSelections.includes(opt) ? 'rgba(99, 102, 241, 0.1)' : 'var(--color-bg-secondary)',
              border: `1px solid ${currentSelections.includes(opt) ? 'var(--color-brand-primary)' : 'var(--color-border)'}`,
              borderRadius: '8px',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '1.125rem'
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleNext} 
          disabled={currentSelections.length === 0}
          className="btn btn-primary"
        >
          {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
