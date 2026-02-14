import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthPages.css';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [searchParams] = useSearchParams();
  
  // Capture intent from URL (?intent=creator, ?intent=learner, etc.)
  const intent = searchParams.get('intent') || 'general';
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Intent-specific messaging
  const intentMessages = {
    creator: {
      title: "Join as Creator",
      subtitle: "Start earning from your work",
      benefits: [
        "Access creator tools immediately",
        "Keep 55% of every sale",
        "Publish your first product today",
        "Join community of 30+ creators"
      ]
    },
    learner: {
      title: "Start Learning",
      subtitle: "Free workshops and skill-building",
      benefits: [
        "Access all workshop recordings",
        "Join live learning sessions",
        "Track your progress",
        "Build your portfolio"
      ]
    },
    volunteer: {
      title: "Join Our Community",
      subtitle: "Become a Champion, Connector, or Curator",
      benefits: [
        "Make real community impact",
        "Develop new skills",
        "Meet like-minded people",
        "Shape our future together"
      ]
    },
    general: {
      title: "Create Your Account",
      subtitle: "Join Wembley Wonders CIC",
      benefits: [
        "Access all community resources",
        "Join workshops and events",
        "Connect with creators",
        "Start building your portfolio"
      ]
    }
  };

  const currentIntent = intentMessages[intent as keyof typeof intentMessages] || intentMessages.general;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms acceptance
    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = 'You must accept the terms to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call register function from AuthContext
            const result = await register({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              password: formData.password
            });

      // Store token
      localStorage.setItem('ww-token', result.token);

      // Redirect to workspace with intent
      const workspaceUrl = import.meta.env.VITE_WORKSPACE_URL || 'http://localhost:5174';
      window.location.href = `${workspaceUrl}/onboarding?intent=${intent}`;

    } catch (error: any) {
      setErrors({ 
        submit: error.message || 'Registration failed. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Animated Background */}
      <div className="auth-background">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      {/* Auth Container */}
      <div className="auth-container">
        {/* Left Side - Form */}
        <div className="auth-form-section">
          <div className="auth-logo">
            <img src="/wembley-logo.png" alt="Wembley Wonders" />
            <h1>Wembley Wonders</h1>
          </div>

          <div className="auth-header">
            <h2>{currentIntent.title}</h2>
            <p className="auth-subtitle">{currentIntent.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Name Fields */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="At least 8 characters"
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Terms Acceptance */}
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleChange}
                  className={errors.acceptedTerms ? 'error' : ''}
                />
                <span>
                  I accept the{' '}
                  <Link to="/terms" target="_blank">Terms & Conditions</Link>
                  {' '}and{' '}
                  <Link to="/privacy" target="_blank">Privacy Policy</Link>
                </span>
              </label>
              {errors.acceptedTerms && (
                <span className="error-message">{errors.acceptedTerms}</span>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="alert alert-error">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/auth/login" className="auth-link">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="auth-benefits-section">
          <div className="benefits-content">
            <h3>What You'll Get</h3>
            <ul className="benefits-list">
              {currentIntent.benefits.map((benefit, index) => (
                <li key={index} className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="benefits-stats">
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">Active Creators</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">£14k+</span>
                <span className="stat-label">Earned by Community</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Community-Owned</span>
              </div>
            </div>

            <div className="benefits-quote">
              <p>
                "This isn't just another platform. It's a community that actually 
                shares power and profit with its members."
              </p>
              <cite>— Sarah, Creator since 2024</cite>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .auth-background,
          .auth-benefits-section {
            display: none;
          }
          .auth-form-section {
            max-width: 100%;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
