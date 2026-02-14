import React from 'react';

const QuarterlyWorkshopsGrid: React.FC = () => {
 return (
   <section className="five-cs-section">
     <div className="section-header fade-in">
       <h2 className="section-title">Quarterly Digital Skills Workshops</h2>
       <p className="section-subtitle">
         Four focused workshops per year, delivered by volunteer specialists from our community. £50 per workshop, maximum 15 participants.
       </p>
     </div>
     
     <div className="five-cs-grid">
       <div className="c-card fade-in" style={{borderLeft: '4px solid #4f46e5'}}>
         <span className="c-icon">💻</span>
         <h3 className="c-title">Q1: DIGITAL BASICS</h3>
         <p className="c-description">
           Essential digital skills - email, online forms, internet safety.
         </p>
         <ul className="c-features">
           <li>Led by IT specialists and headmistresses</li>
           <li>Weekend workshop format</li>
           <li>Basic computer navigation</li>
           <li>Online safety fundamentals</li>
         </ul>
         <div className="workshop-details">
           <strong>March 2025 • £50 • 15 places</strong>
         </div>
       </div>
       
       <div className="c-card fade-in" style={{borderLeft: '4px solid #059669'}}>
         <span className="c-icon">🎵</span>
         <h3 className="c-title">Q2: CREATIVE MEDIA</h3>
         <p className="c-description">
           Podcasting, radio, and video editing with community media experts.
         </p>
         <ul className="c-features">
           <li>Led by DJs and radio presenters</li>
           <li>Hands-on audio production</li>
           <li>Basic video editing skills</li>
           <li>Content creation basics</li>
         </ul>
         <div className="workshop-details">
           <strong>June 2025 • £50 • 15 places</strong>
         </div>
       </div>
       
       <div className="c-card fade-in" style={{borderLeft: '4px solid #0ea5e9'}}>
         <span className="c-icon">🔬</span>
         <h3 className="c-title">Q3: STEM FUNDAMENTALS</h3>
         <p className="c-description">
           Introduction to coding and electronics with engineering lecturers.
         </p>
         <ul className="c-features">
           <li>Led by electrical engineering lecturers</li>
           <li>Basic programming concepts</li>
           <li>Simple electronics projects</li>
           <li>Hackspace collaboration</li>
         </ul>
         <div className="workshop-details">
           <strong>September 2025 • £50 • 15 places</strong>
         </div>
       </div>
       
       <div className="c-card fade-in" style={{borderLeft: '4px solid #7c3aed'}}>
         <span className="c-icon">📚</span>
         <h3 className="c-title">Q4: HERITAGE & COMMUNITY</h3>
         <p className="c-description">
           Digital preservation of family stories and local history.
         </p>
         <ul className="c-features">
           <li>Led by child development specialist</li>
           <li>Family story documentation</li>
           <li>Digital archiving techniques</li>
           <li>Community heritage projects</li>
         </ul>
         <div className="workshop-details">
           <strong>December 2025 • £50 • 15 places</strong>
         </div>
       </div>
     </div>
     
     <div className="workshop-info fade-in">
       <h3>Workshop Information</h3>
       <ul>
         <li>All workshops are volunteer-led by community specialists</li>
         <li>Maximum 15 participants ensures personal attention</li>
         <li>£50 covers materials and venue costs</li>
         <li>Book individual workshops or all four for progression</li>
       </ul>
     </div>
   </section>
 );
};

export default QuarterlyWorkshopsGrid;