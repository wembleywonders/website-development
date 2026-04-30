import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomeHero.css';

const HomeHero: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`hh${visible ? ' hh--visible' : ''}`} ref={heroRef}>
      <div className="hh-atmosphere" aria-hidden="true">
        <div className="hh-orb hh-orb--gold" />
        <div className="hh-orb hh-orb--teal" />
        <div className="hh-orb hh-orb--purple" />
        <div className="hh-grain" />
        <div className="hh-flag-bar" />
      </div>
      <div className="hh-inner">
        <div className="hh-eyebrow hh-reveal hh-reveal--0">
          <span className="hh-eyebrow-dot" />
          <span>Rooted in Wembley. Built for the diaspora.</span>
        </div>
        <div className="hh-wound hh-reveal hh-reveal--1">
          <p className="hh-wound-line-1">You got told to "post more content."</p>
          <p className="hh-wound-line-2">Nobody mentioned that{" "}<em>content without ownership</em>{" "}is just{" "}<em>free labour with better lighting.</em></p>
        </div>
        <p className="hh-bridge hh-reveal hh-reveal--2">By the time creative assets reach mainstream platforms, the structural gains have already been distributed — to infrastructure owners, not creators.</p>
        <div className="hh-diagnosis hh-reveal hh-reveal--3">
          <h2 className="hh-diagnosis-heading">So we built something different.</h2>
          <p className="hh-diagnosis-body">Wembley Wonders was built on a single observation: the extraction happens upstream — before visibility, before listing, before scale — and it happens because communities lack ownership of the layer where value is first created.</p>
          <p className="hh-diagnosis-body hh-diagnosis-body--emphasis">We have spent four years building that layer.</p>
          <p className="hh-diagnosis-aside">And knowing there is a better model — and not stepping into it — that is the only choice left that does not make sense.</p>
        </div>
        <div className="hh-offer hh-reveal hh-reveal--4">
          <div className="hh-offer-card">
            <p className="hh-offer-lead">Join and you get a personalised creator economy framework, access to our programme infrastructure, and a revenue model where the majority goes to the creator — not the platform.</p>
            <p className="hh-offer-remote">The infrastructure is digital. The room is wherever you are.</p>
            <div className="hh-revenue">
              <div className="hh-revenue-statement">
                <span className="hh-revenue-hook">Most platforms take 45% or more and call it fair.</span>
                <span className="hh-revenue-ours">We take <strong>20%.</strong></span>
              </div>
              <div className="hh-revenue-bars">
                <div className="hh-bar hh-bar--creator">
                  <div className="hh-bar-fill" style={{ width: "55%" }} />
                  <div className="hh-bar-label">
                    <span className="hh-bar-pct">55%</span>
                    <span className="hh-bar-name">Directly to you</span>
                  </div>
                </div>
                <div className="hh-bar hh-bar--community">
                  <div className="hh-bar-fill" style={{ width: "25%" }} />
                  <div className="hh-bar-label">
                    <span className="hh-bar-pct">25%</span>
                    <span className="hh-bar-name">Back into the community</span>
                  </div>
                </div>
                <div className="hh-bar hh-bar--ops">
                  <div className="hh-bar-fill" style={{ width: "20%" }} />
                  <div className="hh-bar-label">
                    <span className="hh-bar-pct">20%</span>
                    <span className="hh-bar-name">Platform operations</span>
                  </div>
                </div>
              </div>
              <p className="hh-revenue-foot">The remaining 80% does not just go to one creator. 55% goes directly to you. 25% flows back into the community that made your work possible.</p>
            </div>
            <p className="hh-judith-close">Because you are not building this alone.</p>
          </div>
        </div>
        <div className="hh-urgency hh-reveal hh-reveal--5">
          <p className="hh-urgency-body">Commit to 95 minutes a session. Take charge of your creative economy. The infrastructure is already running — the question is whether you are inside it before the next cycle begins.</p>
          <div className="hh-urgency-signals">
            <span className="hh-signal"><span className="hh-signal-dot" />Infrastructure live</span>
            <span className="hh-signal"><span className="hh-signal-dot hh-signal-dot--gold" />55/25/20 active</span>
            <span className="hh-signal"><span className="hh-signal-dot hh-signal-dot--teal" />Programmes running</span>
            <span className="hh-signal"><span className="hh-signal-dot hh-signal-dot--purple" />Remote-first — join from anywhere</span>
          </div>
        </div>
        <div className="hh-prompts hh-reveal hh-reveal--6">
          <Link to="/programmes" className="hh-prompt hh-prompt--primary">Show me the infrastructure<span className="hh-prompt-arrow">→</span></Link>
          <Link to="/start" className="hh-prompt hh-prompt--secondary">See what programmes are running now<span className="hh-prompt-arrow">→</span></Link>
        </div>
        <div className="hh-auth-links hh-reveal hh-reveal--7">
          <Link to="/auth/signup" className="hh-auth-join">Join free</Link>
          <span className="hh-auth-sep">·</span>
          <Link to="/login" className="hh-auth-in">Sign in</Link>
        </div>
      </div>
      <div className="hh-scroll-hint" aria-hidden="true">
        <span>scroll</span>
        <div className="hh-scroll-line" />
      </div>
    </section>
  );
};

export default HomeHero;
