import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthPages.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const successMessage = location.state?.message;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const authResponse = await login({
        email: formData.email,
        password: formData.password,
      });
      
      // Successful login - redirect to intended page or dashboard
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (error: any) {
      // Handle different error types
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          'Login failed. Please check your credentials and try again.';
      
      setErrors({
        form: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      
      {/* Background Effects */}
      <div className="auth-bg-overlay" />
      <div className="auth-bg-gradient" />

      {/* Main Content */}
      <div className="auth-container">
        
        {/* Header */}
        <div className="auth-header">
          <img
            src="/logo.png"
            alt="Wembley Wonders"
            className="auth-logo"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling;
              if (fallback) (fallback as HTMLElement).style.display = 'flex';
            }}
          />
          <div className="auth-logo-fallback">🏆</div>
          
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">
            Sign in to continue your journey with Wembley Wonders
          </p>
        </div>

        {/* Form Section */}
        <div className="auth-form-wrapper">
          
          {/* Alert Messages */}
          {(successMessage || errors.form) && (
            <div className="auth-alerts">
              {successMessage && (
                <div className="alert alert-success">
                  <span className="alert-icon">✅</span>
                  {successMessage}
                </div>
              )}

              {errors.form && (
                <div className="alert alert-error">
                  <span className="alert-icon">⚠️</span>
                  {errors.form}
                </div>
              )}
            </div>
          )}

          {/* Main Form */}
          <div className="auth-form-card">
            <form onSubmit={handleSubmit} className="auth-form">
              
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="form-error">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && (
                  <p className="form-error">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="checkbox-input"
                  />
                  <span>Remember me</span>
                </label>
                
                <Link
                  to="/reset-password"
                  className="forgot-password-link"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <>
                    <span className="button-spinner" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>

          {/* Sign Up Link */}
          <div className="auth-alternate">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="alternate-link">
                Sign up
              </Link>
            </p>
          </div>

          {/* Community Benefits */}
          <div className="auth-benefits">
            <h3 className="benefits-title">
              Join Wembley Wonders Community
            </h3>
            
            <div className="benefits-grid">
              <div className="benefit-item">
                <span className="benefit-icon">📅</span>
                <span className="benefit-text">Events & Workshops</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📚</span>
                <span className="benefit-text">Learning Programs</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <span className="benefit-text">Career Support</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🤝</span>
                <span className="benefit-text">Mentorship</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;