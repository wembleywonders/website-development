import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import './PracticeAssessmentPage.css';

interface Question {
  id: string;
  category: 'community_knowledge' | 'communication_skills' | 'problem_solving' | 'digital_literacy' | 'leadership_potential';
  type: 'multiple_choice' | 'short_answer' | 'scenario' | 'rating_scale';
  question: string;
  options?: string[];
  correctAnswer?: string;
  sampleAnswer?: string;
  points: number;
  timeLimit?: number; // in seconds
}

interface AssessmentState {
  currentQuestion: number;
  answers: Record<string, string>;
  timeRemaining: number;
  isActive: boolean;
  showResults: boolean;
  score: number;
  categoryScores: Record<string, { earned: number; total: number }>;
}

const PracticeAssessmentPage: React.FC = () => {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentQuestion: 0,
    answers: {},
    timeRemaining: 0,
    isActive: false,
    showResults: false,
    score: 0,
    categoryScores: {
      community_knowledge: { earned: 0, total: 0 },
      communication_skills: { earned: 0, total: 0 },
      problem_solving: { earned: 0, total: 0 },
      digital_literacy: { earned: 0, total: 0 },
      leadership_potential: { earned: 0, total: 0 }
    }
  });

  const questions: Question[] = [
    {
      id: 'ck1',
      category: 'community_knowledge',
      type: 'multiple_choice',
      question: 'What is the approximate population of Wembley?',
      options: ['75,000-85,000', '100,000-110,000', '120,000-130,000', '150,000-160,000'],
      correctAnswer: '120,000-130,000',
      points: 5
    },
    {
      id: 'ck2',
      category: 'community_knowledge',
      type: 'multiple_choice',
      question: 'Which of these is a key challenge facing the Wembley community?',
      options: ['Housing affordability', 'Transport connectivity', 'Cultural diversity', 'Educational opportunities'],
      correctAnswer: 'Housing affordability',
      points: 5
    },
    {
      id: 'cs1',
      category: 'communication_skills',
      type: 'scenario',
      question: 'You need to explain a complex budget proposal to a diverse group of community members with varying levels of English proficiency and educational backgrounds. How would you approach this communication challenge?',
      sampleAnswer: 'Use multiple communication methods: visual aids with charts and infographics, simple language avoiding jargon, provide materials in multiple languages, allow time for questions, and use analogies that relate to everyday experiences. Consider having interpreters available and follow up with written summaries.',
      points: 10
    },
    {
      id: 'cs2',
      category: 'communication_skills',
      type: 'short_answer',
      question: 'Describe three strategies for facilitating a productive discussion when community members have strongly opposing views.',
      sampleAnswer: '1) Establish ground rules for respectful dialogue 2) Use active listening techniques and reflect back what you hear 3) Focus on shared values and common goals 4) Break into smaller groups if needed 5) Time-box discussions to prevent domination',
      points: 10
    },
    {
      id: 'ps1',
      category: 'problem_solving',
      type: 'scenario',
      question: 'A community garden project has received complaints from neighbors about noise, parking issues, and maintenance problems. The garden coordinator is overwhelmed and considering shutting down the project. How would you approach this situation?',
      sampleAnswer: 'First, gather specific information about complaints and speak with all stakeholders. Facilitate a mediation meeting between garden users and concerned neighbors. Develop practical solutions like designated parking areas, quiet hours, and maintenance schedules. Consider recruiting additional volunteers to support the coordinator and establish clear guidelines for garden use.',
      points: 15
    },
    {
      id: 'ps2',
      category: 'problem_solving',
      type: 'multiple_choice',
      question: 'When prioritizing community projects with limited resources, what should be the PRIMARY consideration?',
      options: ['Project cost and feasibility', 'Number of people who will benefit', 'Alignment with community-identified needs', 'Potential for media attention'],
      correctAnswer: 'Alignment with community-identified needs',
      points: 10
    },
    {
      id: 'dl1',
      category: 'digital_literacy',
      type: 'multiple_choice',
      question: 'What is the most important consideration when creating online content for community engagement?',
      options: ['Professional design quality', 'Accessibility for all users', 'Search engine optimization', 'Social media shareability'],
      correctAnswer: 'Accessibility for all users',
      points: 5
    },
    {
      id: 'dl2',
      category: 'digital_literacy',
      type: 'short_answer',
      question: 'How would you help elderly community members who are struggling with digital exclusion?',
      sampleAnswer: 'Provide one-on-one or small group training sessions, use familiar language and relate to their interests, start with basic skills they need most, provide written guides they can refer to, establish buddy systems with tech-savvy volunteers, and ensure ongoing support rather than one-off training.',
      points: 10
    },
    {
      id: 'lp1',
      category: 'leadership_potential',
      type: 'scenario',
      question: 'You\'re leading a project team where one member consistently misses deadlines and another member is becoming frustrated and considering leaving the project. How do you handle this situation?',
      sampleAnswer: 'Address the issue promptly and directly. Meet privately with the underperforming member to understand barriers and provide support or adjust responsibilities. Acknowledge the frustrated member\'s concerns and work together on solutions. If necessary, redistribute tasks or find additional team members. Focus on clear communication, realistic expectations, and maintaining team morale.',
      points: 15
    },
    {
      id: 'lp2',
      category: 'leadership_potential',
      type: 'rating_scale',
      question: 'Rate your confidence in facilitating a community meeting with 30+ participants (1 = Not confident, 5 = Very confident)',
      options: ['1 - Not confident at all', '2 - Somewhat nervous', '3 - Moderately confident', '4 - Quite confident', '5 - Very confident'],
      points: 5
    }
  ];

  const totalTimeLimit = 30 * 60; // 30 minutes in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (assessmentState.isActive && assessmentState.timeRemaining > 0) {
      timer = setTimeout(() => {
        setAssessmentState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (assessmentState.isActive && assessmentState.timeRemaining <= 0) {
      handleSubmitAssessment();
    }
    return () => clearTimeout(timer);
  }, [assessmentState.isActive, assessmentState.timeRemaining]);

  const startAssessment = () => {
    setAssessmentState({
      currentQuestion: 0,
      answers: {},
      timeRemaining: totalTimeLimit,
      isActive: true,
      showResults: false,
      score: 0,
      categoryScores: {
        community_knowledge: { earned: 0, total: 0 },
        communication_skills: { earned: 0, total: 0 },
        problem_solving: { earned: 0, total: 0 },
        digital_literacy: { earned: 0, total: 0 },
        leadership_potential: { earned: 0, total: 0 }
      }
    });
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAssessmentState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  };

  const nextQuestion = () => {
    if (assessmentState.currentQuestion < questions.length - 1) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  };

  const previousQuestion = () => {
    if (assessmentState.currentQuestion > 0) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  };

  const handleSubmitAssessment = () => {
    const { score, categoryScores } = calculateScore();
    setAssessmentState(prev => ({
      ...prev,
      isActive: false,
      showResults: true,
      score,
      categoryScores
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    const categoryScores: Record<string, { earned: number; total: number }> = {
      community_knowledge: { earned: 0, total: 0 },
      communication_skills: { earned: 0, total: 0 },
      problem_solving: { earned: 0, total: 0 },
      digital_literacy: { earned: 0, total: 0 },
      leadership_potential: { earned: 0, total: 0 }
    };

    questions.forEach(question => {
      const userAnswer = assessmentState.answers[question.id];
      categoryScores[question.category].total += question.points;

      if (userAnswer) {
        if (question.type === 'multiple_choice' && userAnswer === question.correctAnswer) {
          categoryScores[question.category].earned += question.points;
          totalScore += question.points;
        } else if (question.type === 'rating_scale') {
          // For rating scales, give partial credit based on thoughtful response
          categoryScores[question.category].earned += Math.floor(question.points * 0.8);
          totalScore += Math.floor(question.points * 0.8);
        } else if ((question.type === 'short_answer' || question.type === 'scenario') && userAnswer.length > 50) {
          // For open-ended questions, give credit for substantial responses
          categoryScores[question.category].earned += Math.floor(question.points * 0.8);
          totalScore += Math.floor(question.points * 0.8);
        }
      }
    });

    return { score: totalScore, categoryScores };
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return '#48bb78';
    if (percentage >= 60) return '#ed8936';
    return '#e53e3e';
  };

  const getCategoryName = (category: string) => {
    const names = {
      community_knowledge: 'Community Knowledge',
      communication_skills: 'Communication Skills',
      problem_solving: 'Problem Solving',
      digital_literacy: 'Digital Literacy',
      leadership_potential: 'Leadership Potential'
    };
    return names[category as keyof typeof names] || category;
  };

  const currentQuestion = questions[assessmentState.currentQuestion];
  const totalPossibleScore = questions.reduce((sum, q) => sum + q.points, 0);
  const scorePercentage = (assessmentState.score / totalPossibleScore) * 100;

  if (!assessmentState.isActive && !assessmentState.showResults) {
    return (
      <div className="practice-assessment-page">
        
        <div className="assessment-container">
          <section className="assessment-intro">
            <div className="intro-content">
              <h1>Practice Assessment</h1>
              <p className="intro-subtitle">
                Test your readiness for the official Connector assessment with this practice version covering all key competency areas.
              </p>
              
              <div className="assessment-overview">
                <h2>Assessment Overview</h2>
                <div className="overview-grid">
                  <div className="overview-item">
                    <span className="overview-icon">⏱️</span>
                    <div>
                      <h3>30 Minutes</h3>
                      <p>Total time limit</p>
                    </div>
                  </div>
                  <div className="overview-item">
                    <span className="overview-icon">❓</span>
                    <div>
                      <h3>{questions.length} Questions</h3>
                      <p>Mixed question types</p>
                    </div>
                  </div>
                  <div className="overview-item">
                    <span className="overview-icon">🎯</span>
                    <div>
                      <h3>5 Skill Areas</h3>
                      <p>Comprehensive evaluation</p>
                    </div>
                  </div>
                  <div className="overview-item">
                    <span className="overview-icon">📊</span>
                    <div>
                      <h3>Detailed Feedback</h3>
                      <p>Personalized results</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="skill-areas">
                <h2>What You'll Be Assessed On</h2>
                <div className="skills-grid">
                  <div className="skill-card">
                    <h3>🏘️ Community Knowledge</h3>
                    <p>Understanding of Wembley's demographics, challenges, and opportunities</p>
                  </div>
                  <div className="skill-card">
                    <h3>💬 Communication Skills</h3>
                    <p>Ability to engage effectively with diverse community members</p>
                  </div>
                  <div className="skill-card">
                    <h3>🧩 Problem Solving</h3>
                    <p>Analytical thinking and practical approaches to community challenges</p>
                  </div>
                  <div className="skill-card">
                    <h3>💻 Digital Literacy</h3>
                    <p>Basic digital skills for modern community engagement</p>
                  </div>
                  <div className="skill-card">
                    <h3>⭐ Leadership Potential</h3>
                    <p>Capacity for growth into community leadership roles</p>
                  </div>
                </div>
              </div>

              <div className="assessment-tips">
                <h2>Success Tips</h2>
                <div className="tips-list">
                  <div className="tip">
                    <span className="tip-icon">📚</span>
                    <div>
                      <h4>Review the Assessment Guide</h4>
                      <p>Make sure you've read through our preparation materials</p>
                    </div>
                  </div>
                  <div className="tip">
                    <span className="tip-icon">🎯</span>
                    <div>
                      <h4>Focus on Practical Solutions</h4>
                      <p>Think about real-world applications and community-centered approaches</p>
                    </div>
                  </div>
                  <div className="tip">
                    <span className="tip-icon">💭</span>
                    <div>
                      <h4>Think Before You Answer</h4>
                      <p>Take time to consider your responses, especially for scenario questions</p>
                    </div>
                  </div>
                  <div className="tip">
                    <span className="tip-icon">⏰</span>
                    <div>
                      <h4>Manage Your Time</h4>
                      <p>Keep an eye on the clock and don't spend too long on any single question</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="start-assessment">
                <button onClick={startAssessment} className="btn btn-primary btn-large">
                  Start Practice Assessment
                </button>
                <p className="disclaimer">
                  This is a practice assessment. Your responses will not be saved or shared.
                </p>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }

  if (assessmentState.showResults) {
    return (
      <div className="practice-assessment-page">
        
        <div className="assessment-container">
          <section className="results-section">
            <div className="results-header">
              <h1>Assessment Results</h1>
              <div className="overall-score">
                <div 
                  className="score-circle"
                  style={{ borderColor: getScoreColor(scorePercentage) }}
                >
                  <span className="score-percentage">{Math.round(scorePercentage)}%</span>
                  <span className="score-label">Overall Score</span>
                </div>
                <div className="score-details">
                  <p>You scored {assessmentState.score} out of {totalPossibleScore} points</p>
                  <p className="score-interpretation">
                    {scorePercentage >= 80 ? 'Excellent! You\'re well-prepared for the official assessment.' :
                     scorePercentage >= 60 ? 'Good progress! Focus on the areas highlighted below.' :
                     'Keep studying! Review the recommended resources and try again.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="category-breakdown">
              <h2>Skill Area Breakdown</h2>
              <div className="categories-grid">
                {Object.entries(assessmentState.categoryScores).map(([category, scores]) => {
                  const percentage = scores.total > 0 ? (scores.earned / scores.total) * 100 : 0;
                  return (
                    <div key={category} className="category-result">
                      <h3>{getCategoryName(category)}</h3>
                      <div className="category-score">
                        <div className="score-bar">
                          <div 
                            className="score-fill"
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: getScoreColor(percentage)
                            }}
                          />
                        </div>
                        <span className="category-percentage">{Math.round(percentage)}%</span>
                      </div>
                      <p className="category-feedback">
                        {scores.earned} / {scores.total} points
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="recommendations">
              <h2>Personalized Recommendations</h2>
              <div className="recommendations-content">
                {scorePercentage >= 80 ? (
                  <div className="recommendation excellent">
                    <h3>🌟 Excellent Performance</h3>
                    <p>You're demonstrating strong competency across all areas. You should feel confident about taking the official assessment.</p>
                    <ul>
                      <li>Schedule your official assessment when you're ready</li>
                      <li>Consider reviewing the Connector Handbook to prepare for your role</li>
                      <li>Think about which community projects interest you most</li>
                    </ul>
                  </div>
                ) : scorePercentage >= 60 ? (
                  <div className="recommendation good">
                    <h3>📈 Good Foundation</h3>
                    <p>You have a solid foundation but could benefit from additional preparation in some areas.</p>
                    <ul>
                      <li>Focus on your lowest-scoring categories</li>
                      <li>Review the Assessment Guide and sample scenarios</li>
                      <li>Consider taking this practice assessment again after studying</li>
                    </ul>
                  </div>
                ) : (
                  <div className="recommendation needs-work">
                    <h3>📚 More Preparation Needed</h3>
                    <p>You would benefit from additional study before taking the official assessment.</p>
                    <ul>
                      <li>Review the Community Overview and Assessment Guide thoroughly</li>
                      <li>Practice with the sample scenarios</li>
                      <li>Consider attending a preparation workshop</li>
                      <li>Retake this practice assessment to track your progress</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="next-steps">
              <h2>Next Steps</h2>
              <div className="actions-grid">
                <Link to="/assessment-guide" className="action-card">
                  <h3>📖 Study More</h3>
                  <p>Review the comprehensive assessment preparation guide</p>
                </Link>
                <Link to="/practice-assessment" className="action-card">
                  <h3>🎭 Practice Scenarios</h3>
                  <p>Work through additional practice scenarios</p>
                </Link>
                <Link to="/community/overview" className="action-card">
                  <h3>🏘️ Learn About Wembley</h3>
                  <p>Deepen your understanding of our community</p>
                </Link>
                <Link to="/schedule-assessment" className="action-card">
                  <h3>📅 Schedule Official Assessment</h3>
                  <p>Ready to take the real assessment?</p>
                </Link>
              </div>
            </div>

            <div className="retake-section">
              <button onClick={startAssessment} className="btn btn-secondary">
                Retake Practice Assessment
              </button>
              <p>You can retake this practice assessment as many times as you'd like.</p>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="practice-assessment-page">
      
      <div className="assessment-container">
        <section className="assessment-active">
          <div className="assessment-header">
            <div className="progress-info">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((assessmentState.currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="progress-text">
                Question {assessmentState.currentQuestion + 1} of {questions.length}
              </span>
            </div>
            
            <div className="time-remaining">
              <span className="time-icon">⏱️</span>
              <span className={`time-text ${assessmentState.timeRemaining < 300 ? 'warning' : ''}`}>
                {formatTime(assessmentState.timeRemaining)}
              </span>
            </div>
          </div>

          <div className="question-section">
            <div className="question-meta">
              <span className="category-badge">
                {getCategoryName(currentQuestion.category)}
              </span>
              <span className="points-badge">{currentQuestion.points} points</span>
            </div>
            
            <h2 className="question-text">{currentQuestion.question}</h2>
            
            <div className="answer-section">
              {currentQuestion.type === 'multiple_choice' && (
                <div className="multiple-choice-options">
                  {currentQuestion.options?.map((option, index) => (
                    <label key={index} className="option-label">
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={assessmentState.answers[currentQuestion.id] === option}
                        onChange={() => handleAnswer(currentQuestion.id, option)}
                      />
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'rating_scale' && (
                <div className="rating-scale-options">
                  {currentQuestion.options?.map((option, index) => (
                    <label key={index} className="rating-option">
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={assessmentState.answers[currentQuestion.id] === option}
                        onChange={() => handleAnswer(currentQuestion.id, option)}
                      />
                      <span className="rating-text">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {(currentQuestion.type === 'short_answer' || currentQuestion.type === 'scenario') && (
                <div className="text-answer-section">
                  <textarea
                    className="answer-textarea"
                    placeholder="Type your answer here..."
                    value={assessmentState.answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                    rows={currentQuestion.type === 'scenario' ? 8 : 4}
                  />
                  <div className="character-count">
                    {(assessmentState.answers[currentQuestion.id] || '').length} characters
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="navigation-section">
            <button
              onClick={previousQuestion}
              disabled={assessmentState.currentQuestion === 0}
              className="btn btn-secondary"
            >
              Previous
            </button>
            
            <div className="question-indicators">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`question-indicator ${
                    index === assessmentState.currentQuestion ? 'current' : 
                    assessmentState.answers[questions[index].id] ? 'answered' : 'unanswered'
                  }`}
                />
              ))}
            </div>
            
            {assessmentState.currentQuestion < questions.length - 1 ? (
              <button onClick={nextQuestion} className="btn btn-primary">
                Next
              </button>
            ) : (
              <button onClick={handleSubmitAssessment} className="btn btn-success">
                Submit Assessment
              </button>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PracticeAssessmentPage;