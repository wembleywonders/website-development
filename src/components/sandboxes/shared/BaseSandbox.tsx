// src/components/sandboxes/shared/BaseSandbox.tsx
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './BaseSandbox.module.css';

interface BaseSandboxProps {
  // Programme info
  programmeSlug: string;
  programmeName: string;
  icon: string;
  title: string;
  subtitle: string;
  
  // The actual specialized tool
  children: ReactNode;
  
  // Optional CTA customization
  ctaTitle?: string;
  ctaDescription?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  ctaNote?: string;
}

const BaseSandbox: React.FC<BaseSandboxProps> = ({
  programmeSlug,
  programmeName,
  icon,
  title,
  subtitle,
  children,
  ctaTitle = `Ready to make this real?`,
  ctaDescription,
  primaryCtaText = 'Join Programme',
  primaryCtaUrl = '/membership',
  secondaryCtaText = 'Learn More',
  secondaryCtaUrl,
  ctaNote,
}) => {
  return (
    <div className={styles.sandboxPage}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/programmes">Programmes</Link>
        <span className={styles.separator}>/</span>
        <Link to={`/programmes/${programmeSlug}`}>{programmeName}</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.current}>Sandbox</span>
      </nav>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.icon}>{icon}</span>
          {title}
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>

      {/* Tool Container - This is where the specialized component goes */}
      <div className={styles.toolContainer}>
        {children}
      </div>

      {/* Footer CTA */}
      <footer className={styles.footer}>
        <div className={styles.cta}>
          <h3>{ctaTitle}</h3>
          {ctaDescription && <p>{ctaDescription}</p>}
          
          <div className={styles.ctaButtons}>
            <Link to={primaryCtaUrl} className={styles.ctaPrimary}>
              {primaryCtaText}
            </Link>
            {secondaryCtaUrl && (
              <Link to={secondaryCtaUrl} className={styles.ctaSecondary}>
                {secondaryCtaText}
              </Link>
            )}
          </div>
          
          {ctaNote && <p className={styles.ctaNote}>{ctaNote}</p>}
        </div>
      </footer>
    </div>
  );
};

export default BaseSandbox;
