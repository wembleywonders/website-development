import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageTemplate.module.css';

interface PageTemplateProps {
  pageTitle: string;
  pageStrapline: string;
  pageGuide?: string;
  showMaya?: boolean;
  children: React.ReactNode;
  pageType?: 'standard' | 'shop' | 'programme' | 'programmes' | 'community' | 'framework' | 'sandbox';
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  pageTitle,
  pageStrapline,
  pageGuide,
  showMaya = false,
  children,
  pageType = 'standard'
}) => {
  const getPageTypeClass = (): string => {
    return `${styles.pageTemplate} ${styles[`pageTemplate${pageType.charAt(0).toUpperCase() + pageType.slice(1)}`] || ''}`;
  };

  const renderContextualSidebar = (): JSX.Element => {
    const baseNavigation = (
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>Quick Navigation</h3>
        <nav className={styles.sidebarNav}>
          <Link to="/get-started" className={styles.sidebarLink}>Get Started</Link>
          <Link to="/programmes" className={styles.sidebarLink}>Programmes</Link>
          <Link to="/workshops" className={styles.sidebarLink}>Workshops</Link>
          <Link to="/shop" className={styles.sidebarLink}>Shop</Link>
          <Link to="/community" className={styles.sidebarLink}>Community Hubs</Link>
        </nav>
      </div>
    );

    const mayaHelp = (
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>Need Help?</h3>
        <div className={styles.contactInfo}>
          <p>0208 902 9991</p>
          <Link to="/maya" className={styles.mayaHelpLink}>
            <span className={styles.mayaIcon}>🤖</span>
            Chat with Maya
          </Link>
        </div>
      </div>
    );

    // Maya Widget - moved to sidebar
    const mayaWidget = showMaya && (
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>Maya Assistant</h3>
        <div className={styles.mayaSection}>
          <div className={styles.mayaContent}>
            <div className={styles.mayaAvatar}>🤖</div>
            <div className={styles.mayaText}>
              <p><strong>Maya:</strong> "I'm here to help guide your journey."</p>
            </div>
          </div>
        </div>
      </div>
    );

    switch (pageType) {
      case 'sandbox':
        return (
          <div className={styles.sidebarDefault}>
            {mayaWidget}
            {baseNavigation}
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Programme Sandboxes</h3>
              <nav className={styles.sidebarNav}>
                <Link to="/programmes/kaywanas-court/sandbox" className={styles.sidebarLink}>Kaywana's Court</Link>
                <Link to="/programmes/pageturners/sandbox" className={styles.sidebarLink}>Pageturners</Link>
                <Link to="/programmes/trubble-n-bass/sandbox" className={styles.sidebarLink}>Trubble n Bass</Link>
                <Link to="/programmes/stemgeneers/sandbox" className={styles.sidebarLink}>STEMgeneers</Link>
                <Link to="/programmes/techreneurs/sandbox" className={styles.sidebarLink}>TECHreneurs</Link>
                <Link to="/programmes/gtechcasters/sandbox" className={styles.sidebarLink}>G-Tech Casters</Link>
                <Link to="/programmes/auntie-anansis-kitchen/sandbox" className={styles.sidebarLink}>Auntie Anansi's Kitchen</Link>
                <Link to="/programmes/bright-sparks/sandbox" className={styles.sidebarLink}>Bright Sparks</Link>
                <Link to="/programmes/silk-stilettos/sandbox" className={styles.sidebarLink}>Silk Stilettos</Link>
              </nav>
            </div>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Take Action</h3>
              <div className={styles.sidebarCta}>
                <Link to="/membership" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
                  Join as Member
                </Link>
                <Link to="/programmes" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
                  View All Programmes
                </Link>
              </div>
            </div>
            {mayaHelp}
          </div>
        );

      case 'shop':
        return (
          <div className={styles.sidebarDefault}>
            {mayaWidget}
            {baseNavigation}
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Shop Categories</h3>
              <nav className={styles.sidebarNav}>
                <a href="/shop#props" className={styles.sidebarLink}>Props</a>
                <a href="/shop#stripes" className={styles.sidebarLink}>Stripes</a>
                <a href="/shop#linkups" className={styles.sidebarLink}>Link-Ups</a>
                <a href="/shop#gear" className={styles.sidebarLink}>Wonder Gear</a>
              </nav>
            </div>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Take Action</h3>
              <div className={styles.sidebarCta}>
                <Link to="/get-started" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
                  Join Community
                </Link>
                <Link to="/programmes" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
                  View Programmes
                </Link>
              </div>
            </div>
            {mayaHelp}
          </div>
        );

      case 'programme':
        return (
          <div className={styles.sidebarDefault}>
            {mayaWidget}
            {baseNavigation}
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Programmes</h3>
              <nav className={styles.sidebarNav}>
                <Link to="/programmes/kaywanas-court" className={styles.sidebarLink}>Kaywana's Court</Link>
                <Link to="/programmes/pageturners" className={styles.sidebarLink}>Pageturners</Link>
                <Link to="/raydyo" className={styles.sidebarLink}>Raydyo</Link>
                <Link to="/joystick" className={styles.sidebarLink}>Joystick</Link>
              </nav>
            </div>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Take Action</h3>
              <div className={styles.sidebarCta}>
                <Link to="/apply?type=volunteer" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
                  Apply Now
                </Link>
                <Link to="/workshops" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
                  Try a Workshop
                </Link>
              </div>
            </div>
            {mayaHelp}
          </div>
        );

      case 'programmes':
        return (
          <div className={styles.sidebarDefault}>
            {mayaWidget}
            {baseNavigation}
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>5C Framework</h3>
              <nav className={styles.sidebarNav}>
                <Link to="/workshop-calendar?framework=CONNECT" className={styles.sidebarLink}>Connect</Link>
                <Link to="/workshop-calendar?framework=CREATE" className={styles.sidebarLink}>Create</Link>
                <Link to="/workshop-calendar?framework=CULTIVATE" className={styles.sidebarLink}>Cultivate</Link>
                <Link to="/workshop-calendar?framework=COMPETE" className={styles.sidebarLink}>Compete</Link>
                <Link to="/workshop-calendar?framework=CELEBRATE" className={styles.sidebarLink}>Celebrate</Link>
              </nav>
            </div>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Workshop System</h3>
              <nav className={styles.sidebarNav}>
                <Link to="/workshop-calendar" className={styles.sidebarLink}>Full Calendar</Link>
                <Link to="/workshop-calendar?type=programme" className={styles.sidebarLink}>Programmes</Link>
                <Link to="/workshop-calendar?type=workshop" className={styles.sidebarLink}>Workshops</Link>
                <Link to="/workshop-calendar?type=event" className={styles.sidebarLink}>Events</Link>
                <Link to="/workshop-calendar?type=drop-in" className={styles.sidebarLink}>Drop-ins</Link>
              </nav>
            </div>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Take Action</h3>
              <div className={styles.sidebarCta}>
                <Link to="/get-started" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
                  Book Workshop
                </Link>
                <Link to="/programmes" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
                  View Programmes
                </Link>
              </div>
            </div>
            {mayaHelp}
          </div>
        );

      case 'community':
        return (
          <div className={styles.sidebarDefault}>
            {mayaWidget}
            {baseNavigation}
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Community Support</h3>
              <nav className={styles.sidebarNav}>
                <Link to="/community" className={styles.sidebarLink}>Community Hubs</Link>
                <Link to="/community" className={styles.sidebarLink}>Mutual Aid</Link>
                <Link to="/contact" className={styles.sidebarLink}>Family Support</Link>
              </nav>
            </div>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Take Action</h3>
              <div className={styles.sidebarCta}>
                <Link to="/get-started" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
                  Join Community
                </Link>
                <Link to="/volunteers" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
                  Volunteer
                </Link>
              </div>
            </div>
            {mayaHelp}
          </div>
        );

      case 'framework':
        return (
          <div className={styles.sidebarDefault}>
            {mayaWidget}
            {baseNavigation}
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>5C Framework</h3>
              <nav className={styles.sidebarNav}>
                <Link to="/community" className={styles.sidebarLink}>Connect</Link>
                <Link to="/programmes" className={styles.sidebarLink}>Cultivate</Link>
                <Link to="/about" className={styles.sidebarLink}>Change</Link>
                <Link to="/sessions" className={styles.sidebarLink}>Compete</Link>
                <Link to="/maya" className={styles.sidebarLink}>Maya (Crisis Support)</Link>
              </nav>
            </div>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Take Action</h3>
              <div className={styles.sidebarCta}>
                <Link to="/get-started" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
                  Get Started
                </Link>
                <Link to="/programmes" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
                  View Programmes
                </Link>
              </div>
            </div>
            {mayaHelp}
          </div>
        );

      default:
        return (
          <div className={styles.sidebarDefault}>
            {mayaWidget}
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Quick Actions</h3>
              <div className={styles.sidebarCta}>
                <Link to="/about" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
                  Building Community Wealth
                </Link>
                <Link to="/get-started" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
                  Start Your Journey
                </Link>
                <Link to="/membership" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
                  Member Benefits
                </Link>
              </div>
            </div>
            {baseNavigation}
            {mayaHelp}
          </div>
        );
    }
  };

  return (
    <div className={getPageTypeClass()}>
      {/* Main Page Header */}
      <div className={styles.pageHeader}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>            
            <h1 className={styles.heroTitle}>{pageTitle}</h1>
            <p className={styles.heroSubtitle}>{pageStrapline}</p>

            <div className={styles.heroBadge}>
              <span>🏡</span>
              <span>Building Community Wealth in Wembley</span>
            </div>

            {pageGuide && (
              <div className={styles.pageGuide}>
                <div className={styles.guideContent}>
                  <span className={styles.guideIcon}>💡</span>
                  <p>{pageGuide}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Main Content Area */}
      <main className={styles.pageMain}>
        <div className={styles.mainContainer}>
          <div className={`${styles.contentLayout} ${styles.contentLayoutWithSidebar}`}>
            
            {/* Contextual Sidebar - Now on the left */}
            <aside className={styles.pageSidebar}>
              {renderContextualSidebar()}
            </aside>

            {/* Primary Content */}
            <div className={styles.mainContent}>
              <div className={styles.contentWrapper}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageTemplate;