import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import './SuccessStoriesPage.css';

interface SuccessStory {
  id: string;
  name: string;
  currentTier: 'connector' | 'curator' | 'champion';
  joinedYear: number;
  profession: string;
  age: number;
  quote: string;
  story: string;
  achievements: string[];
  projectsLed: string[];
  skillsGained: string[];
  advice: string;
  photoPlaceholder: string;
  impact: {
    peopleHelped: number;
    projectsCompleted: number;
    budgetManaged?: number;
  };
}

const SuccessStoriesPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeStory, setActiveStory] = useState<string | null>(null);

  const stories: SuccessStory[] = [
    {
      id: 'sarah-connector',
      name: 'Sarah Chen',
      currentTier: 'connector',
      joinedYear: 2024,
      profession: 'Primary School Teacher',
      age: 28,
      quote: "I never thought I'd be organizing community events, but here I am planning our biggest festival yet!",
      story: `When I moved to Wembley two years ago, I felt completely disconnected from my neighbors. Working long hours as a teacher and not knowing anyone locally, I was basically a stranger in my own community.

The Connector program changed everything for me. What started as a simple desire to meet my neighbors has blossomed into genuine community leadership. My first project was helping organize a street clean-up – something I'd never done before but felt passionate about after seeing litter around our local school.

The support I received was incredible. My mentor, James (a Curator), guided me through the process of rallying neighbors, coordinating with the council, and managing volunteers. What could have been overwhelming became an empowering learning experience.

Six months in, I'm now co-leading the planning for our annual community festival, something that seemed impossible when I started. I've discovered skills I didn't know I had and built friendships that extend far beyond community projects.

The most rewarding part isn't just what I've accomplished – it's seeing other new residents feel the same sense of belonging that I've found. When someone tells me they feel more connected to our community because of an event I helped organize, that's when I know this program really works.`,
      achievements: [
        'Organized successful street clean-up involving 40+ volunteers',
        'Co-planning annual community festival (expected 500+ attendees)',
        'Completed all core training modules ahead of schedule',
        'Mentoring two new Connector applicants'
      ],
      projectsLed: [
        'Wembley West Street Clean-up Initiative',
        'School Gate Community Connections Project'
      ],
      skillsGained: [
        'Event planning and coordination',
        'Volunteer management',
        'Public speaking and presentation',
        'Community consultation methods'
      ],
      advice: "Don't wait until you feel ready – you'll learn by doing. The community will support you through the challenges, and you'll be amazed at what you can accomplish when you take that first step.",
      photoPlaceholder: '👩‍🏫',
      impact: {
        peopleHelped: 180,
        projectsCompleted: 3
      }
    },
    {
      id: 'marcus-curator',
      name: 'Marcus Williams',
      currentTier: 'curator',
      joinedYear: 2022,
      profession: 'Software Engineer',
      age: 34,
      quote: "From fixing bugs in code to fixing problems in my community – the problem-solving skills translate perfectly!",
      story: `Three years ago, I was your typical tech worker – great at solving complex problems at work, but completely disconnected from the community where I lived. I'd moved to Wembley for the convenient commute to central London, but I hadn't really engaged with the area at all.

Everything changed when my neighbor mentioned the Connector program. As someone who enjoys challenges and systematic problem-solving, the structured approach to community engagement really appealed to me.

My first year as a Connector was eye-opening. I discovered that many of the analytical and project management skills I used in software development were incredibly valuable for community work. My breakthrough project was creating a digital platform to help local businesses connect with residents during the pandemic – combining my technical skills with genuine community need.

That project's success led to my promotion to Curator after 15 months. Now I manage a £45,000 budget for digital inclusion initiatives and lead a team of six Connectors working on various technology-focused community projects.

The responsibility is significant, but so is the impact. We've helped over 200 residents improve their digital skills, supported 30 local businesses with online presence, and created digital tools that are now used by other community organizations across London.

What I love most is mentoring new Connectors, especially those who, like me, come from professional backgrounds but haven't done community work before. Watching them discover their capabilities and seeing their confidence grow is incredibly rewarding.`,
      achievements: [
        'Promoted to Curator in record 15 months',
        'Successfully managed £45,000 community technology budget',
        'Led digital inclusion program reaching 200+ residents',
        'Developed digital tools adopted by 8 other community organizations',
        'Mentored 12 Connectors, 8 of whom progressed to Curator assessment'
      ],
      projectsLed: [
        'Wembley Digital Inclusion Initiative',
        'Local Business Online Support Program',
        'Community Wi-Fi Access Project',
        'Digital Skills Training for Seniors'
      ],
      skillsGained: [
        'Budget management and financial accountability',
        'Team leadership and development',
        'Stakeholder management and partnership building',
        'Community needs assessment and program design'
      ],
      advice: "Bring your professional skills to community work – they're more transferable than you think. But also be prepared to learn completely new skills. Community leadership requires both analytical thinking and emotional intelligence.",
      photoPlaceholder: '👨‍💻',
      impact: {
        peopleHelped: 450,
        projectsCompleted: 8,
        budgetManaged: 45000
      }
    },
    {
      id: 'amara-champion',
      name: 'Amara Okafor',
      currentTier: 'champion',
      joinedYear: 2020,
      profession: 'Retired Social Worker',
      age: 58,
      quote: "After 30 years in social services, I thought I was done with changing systems. But this community work has reignited my passion for making a difference.",
      story: `When I retired from social services in 2020, I honestly thought my days of systemic change work were behind me. After three decades of working within local government structures, I was looking forward to a quieter life.

But moving to Wembley and discovering this community platform reignited something in me. The democratic approach and the genuine commitment to resident-led change reminded me why I'd gone into social work in the first place.

I started as a Connector, even though I had extensive community work experience. It was important to me to understand this specific approach and build relationships within this community. What I found was that my decades of experience in navigating public systems, understanding policy, and working with diverse communities made me effective very quickly.

My Connector year was transformative. I led a project addressing food insecurity that connected me with residents I might never have met otherwise. Young families, elderly neighbors, people from all walks of life working together on something that mattered to all of us.

Eighteen months later, I became a Curator, then progressed to Champion after another two years. Now I manage a portfolio of social programs with a £180,000 annual budget and represent our community in citywide policy discussions.

The scale of what we've accomplished is remarkable. Our food security network now operates in four neighboring areas. Our housing advocacy work has influenced local planning decisions. Our youth programs have become models for other communities.

But what matters most to me is the people whose lives have genuinely improved. The young single mother who now has reliable childcare because of our community support network. The elderly man who's no longer isolated because of our neighbor connection program. The teenagers who've developed confidence and leadership skills through our youth initiatives.

This isn't just community volunteering – it's serious social change work, and it's some of the most impactful work I've done in my entire career.`,
      achievements: [
        'Established food security network serving 4 community areas',
        'Led housing advocacy resulting in 40% affordable housing requirement in new developments',
        'Managed £180,000 annual budget across 6 major social programs',
        'Represented community in citywide policy committees',
        'Mentored 25+ community leaders, 15 of whom now hold Curator or Champion roles',
        'Received Community Leadership Excellence Award from London Community Network'
      ],
      projectsLed: [
        'Wembley Food Security Network',
        'Community Childcare Cooperative',
        'Elder Care and Connection Program',
        'Youth Leadership Development Initiative',
        'Affordable Housing Advocacy Campaign'
      ],
      skillsGained: [
        'Strategic planning and long-term vision development',
        'Policy advocacy and government relations',
        'Large-scale budget management and financial oversight',
        'Coalition building and partnership development',
        'Media relations and public communication'
      ],
      advice: "Don't underestimate the power of experience, but also don't assume you know everything. Every community is unique. Listen first, build relationships, and then apply your skills to what the community actually needs, not what you think it needs.",
      photoPlaceholder: '👩‍⚕️',
      impact: {
        peopleHelped: 1200,
        projectsCompleted: 15,
        budgetManaged: 180000
      }
    },
    {
      id: 'james-curator',
      name: 'James Rodriguez',
      currentTier: 'curator',
      joinedYear: 2023,
      profession: 'Paramedic',
      age: 31,
      quote: "Working in emergency services taught me to stay calm under pressure – skills that are surprisingly useful in community organizing!",
      story: `As a paramedic, I'm used to helping people in crisis situations, but I wanted to do something that prevented problems rather than just responding to them. When I heard about the Connector program through a colleague, it seemed like the perfect way to make a different kind of difference in my community.

My shift work schedule initially made me worried about the time commitment, but the flexibility of the program meant I could contribute meaningfully even with irregular hours. My first project focused on community first aid training – combining my professional expertise with community need.

What started as basic first aid workshops evolved into a comprehensive community health and safety initiative. We now run monthly workshops, have first aid trained volunteers at all major community events, and have created emergency response protocols for our local area.

The skills I've gained through this work have actually made me better at my job too. Understanding community dynamics, being able to communicate with diverse groups, and having a deeper knowledge of local resources has made me a more effective paramedic.

After 18 months, I was promoted to Curator and now oversee community safety and health programs with a £35,000 budget. We've trained over 150 residents in first aid, established a community emergency response team, and created partnerships with local health services that benefit everyone.

The most rewarding part is seeing ordinary residents become confident in emergency situations. When someone tells me they were able to help a neighbor because of training we provided, or when our community response team successfully coordinates during a local emergency, I know we're making a real difference.

This work has also connected me with my community in ways I never expected. I now know my neighbors not just as potential patients, but as friends, collaborators, and fellow community members working together to make our area safer and stronger.`,
      achievements: [
        'Trained 150+ residents in first aid and emergency response',
        'Established community emergency response team with 25 active volunteers',
        'Created partnerships with 3 local health services',
        'Reduced emergency response times in local area by 15% through community coordination',
        'Developed health and safety protocols adopted by neighboring communities'
      ],
      projectsLed: [
        'Community First Aid Training Program',
        'Local Emergency Response Team',
        'Health and Safety Education Initiative',
        'Senior Citizens Wellness Check Network'
      ],
      skillsGained: [
        'Program development and curriculum design',
        'Partnership building with healthcare organizations',
        'Grant writing and funding applications',
        'Community education and outreach methods'
      ],
      advice: "Use your professional skills as a starting point, but be open to learning completely new ones. Community work will stretch you in ways you don't expect, and that growth makes you better at everything you do.",
      photoPlaceholder: '👨‍⚕️',
      impact: {
        peopleHelped: 320,
        projectsCompleted: 6,
        budgetManaged: 35000
      }
    },
    {
      id: 'priya-connector',
      name: 'Priya Patel',
      currentTier: 'connector',
      joinedYear: 2024,
      profession: 'University Student',
      age: 21,
      quote: "I thought community work was something you did after you had your life figured out. Turns out, it's actually helping me figure out my life!",
      story: `I joined the Connector program six months ago, halfway through my final year studying Politics at university. Initially, I saw it as a way to gain practical experience for my degree and maybe beef up my CV for graduate job applications.

What I discovered was so much more meaningful than I expected.

My first project was working on a youth engagement initiative, trying to understand why people my age felt disconnected from local decision-making. Through surveys, focus groups, and informal conversations, I realized I wasn't alone in feeling like community involvement was something for "proper adults" rather than students like me.

This research led to the development of a new youth participation model that's now being piloted across three communities. We created digital platforms for input, flexible meeting formats, and project-based involvement that works around student schedules.

The experience has been transformative for my understanding of how democracy actually works at the grassroots level. My dissertation is now focused on community-led governance models, and I've been invited to present our youth engagement work at a national conference on democratic innovation.

More importantly, I've found a sense of purpose and belonging that I didn't even realize I was missing. Working alongside residents of all ages on issues that directly affect our daily lives has given me perspective on my own future and what kind of career I want to build.

I'm now applying for graduate programs in community development and public policy, and I plan to continue my Connector journey alongside my studies. The skills I'm gaining here – facilitation, project management, stakeholder engagement – are already making me stand out in interviews and academic work.

But beyond the practical benefits, this work has given me hope. In a world where young people are often told we're apathetic or disengaged, I've found a community that values our perspectives and gives us real responsibility to create change.`,
      achievements: [
        'Led research project on youth political engagement reaching 200+ young people',
        'Co-developed youth participation model being adopted by 3 other communities',
        'Organized first-ever Youth Community Assembly with 85 attendees',
        'Secured £5,000 funding for youth-led environmental projects'
      ],
      projectsLed: [
        'Youth Voices in Community Decision-Making Research',
        'Climate Action Youth Network',
        'Student-Community Partnership Initiative'
      ],
      skillsGained: [
        'Research design and data analysis',
        'Youth engagement and facilitation techniques',
        'Grant writing and fundraising',
        'Cross-generational communication and bridge-building'
      ],
      advice: "Don't wait until you're older or more established to get involved. Young people bring energy, fresh perspectives, and different ways of thinking that communities really need. Plus, the skills you develop will benefit every aspect of your life.",
      photoPlaceholder: '👩‍🎓',
      impact: {
        peopleHelped: 280,
        projectsCompleted: 4
      }
    }
  ];

  const filters = [
    { id: 'all', label: 'All Stories', icon: '📚' },
    { id: 'connector', label: 'Connectors', icon: '🔗' },
    { id: 'curator', label: 'Curators', icon: '🎯' },
    { id: 'champion', label: 'Champions', icon: '👑' }
  ];

  const filteredStories = selectedFilter === 'all' 
    ? stories 
    : stories.filter(story => story.currentTier === selectedFilter);

  const toggleStory = (storyId: string) => {
    setActiveStory(activeStory === storyId ? null : storyId);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'connector': return '#4299e1';
      case 'curator': return '#48bb78';
      case 'champion': return '#ed8936';
      default: return '#718096';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'connector': return '🔗';
      case 'curator': return '🎯';
      case 'champion': return '👑';
      default: return '📝';
    }
  };

  return (
    <div className="success-stories-page">
      
      <div className="stories-container">
        {/* Hero Section */}
        <section className="stories-hero">
          <div className="hero-content">
            <h1>Success Stories</h1>
            <p className="hero-subtitle">
              Real stories from real people who have transformed their communities and themselves through our membership program
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{stories.length}</span>
                <span className="stat-label">Stories Shared</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {stories.reduce((total, story) => total + story.impact.peopleHelped, 0)}
                </span>
                <span className="stat-label">People Helped</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {stories.reduce((total, story) => total + story.impact.projectsCompleted, 0)}
                </span>
                <span className="stat-label">Projects Completed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="filter-section">
          <h2>Filter by Membership Tier</h2>
          <div className="filter-buttons">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                <span className="filter-icon">{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Stories Grid */}
        <section className="stories-section">
          <div className="stories-grid">
            {filteredStories.map((story) => (
              <div key={story.id} className="story-card">
                <div className="story-header" onClick={() => toggleStory(story.id)}>
                  <div className="story-profile">
                    <div className="profile-photo">{story.photoPlaceholder}</div>
                    <div className="profile-info">
                      <h3>{story.name}</h3>
                      <div className="profile-meta">
                        <span 
                          className="tier-badge"
                          style={{ backgroundColor: getTierColor(story.currentTier) }}
                        >
                          {getTierIcon(story.currentTier)} {story.currentTier.charAt(0).toUpperCase() + story.currentTier.slice(1)}
                        </span>
                        <span className="profession">{story.profession}</span>
                        <span className="joined">Joined {story.joinedYear}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="story-preview">
                    <blockquote>"{story.quote}"</blockquote>
                    <div className="impact-preview">
                      <div className="impact-stat">
                        <span className="impact-number">{story.impact.peopleHelped}</span>
                        <span className="impact-label">People Helped</span>
                      </div>
                      <div className="impact-stat">
                        <span className="impact-number">{story.impact.projectsCompleted}</span>
                        <span className="impact-label">Projects</span>
                      </div>
                      {story.impact.budgetManaged && (
                        <div className="impact-stat">
                          <span className="impact-number">£{(story.impact.budgetManaged / 1000).toFixed(0)}k</span>
                          <span className="impact-label">Budget Managed</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <span className={`expand-arrow ${activeStory === story.id ? 'rotated' : ''}`}>
                    ▼
                  </span>
                </div>

                {activeStory === story.id && (
                  <div className="story-content">
                    {/* Full Story */}
                    <div className="content-section">
                      <h4>📖 Their Journey</h4>
                      <div className="story-text">
                        {story.story.split('\n\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="content-section">
                      <h4>🏆 Key Achievements</h4>
                      <ul className="achievements-list">
                        {story.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Projects Led */}
                    <div className="content-section">
                      <h4>🚀 Projects Led</h4>
                      <div className="projects-list">
                        {story.projectsLed.map((project, index) => (
                          <div key={index} className="project-tag">{project}</div>
                        ))}
                      </div>
                    </div>

                    {/* Skills Gained */}
                    <div className="content-section">
                      <h4>💡 Skills Developed</h4>
                      <div className="skills-list">
                        {story.skillsGained.map((skill, index) => (
                          <div key={index} className="skill-tag">{skill}</div>
                        ))}
                      </div>
                    </div>

                    {/* Advice */}
                    <div className="content-section advice-section">
                      <h4>💬 Advice for New Members</h4>
                      <blockquote className="advice-quote">
                        "{story.advice}"
                      </blockquote>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="impact-statistics">
          <h2>Collective Impact</h2>
          <p>Together, our community members are creating real change:</p>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">
                {stories.reduce((total, story) => total + story.impact.peopleHelped, 0).toLocaleString()}
              </div>
              <div className="stat-label">People Directly Helped</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🚀</div>
              <div className="stat-number">
                {stories.reduce((total, story) => total + story.impact.projectsCompleted, 0)}
              </div>
              <div className="stat-label">Community Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-number">
                £{(stories.reduce((total, story) => total + (story.impact.budgetManaged || 0), 0) / 1000).toFixed(0)}k
              </div>
              <div className="stat-label">Community Investment Managed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-number">
                {Math.round(stories.reduce((total, story) => total + (2024 - story.joinedYear), 0) / stories.length * 10) / 10}
              </div>
              <div className="stat-label">Average Years of Service</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>Your Story Could Be Next</h2>
          <p>
            Every success story started with someone taking the first step. What will your community leadership journey look like?
          </p>
          <div className="cta-buttons">
            <Link to="/apply" className="btn btn-primary btn-large">
              Start Your Journey
            </Link>
            <Link to="/assessment-guide" className="btn btn-secondary btn-large">
              Learn More About the Process
            </Link>
          </div>
        </section>

        {/* Share Your Story */}
        <section className="share-story-section">
          <h3>Share Your Success Story</h3>
          <p>Are you a current member with a story to tell? We'd love to feature your journey and inspire others.</p>
          <div className="share-options">
            <Link to="/success-stories" className="btn btn-outline">
              Submit Your Story
            </Link>
            <Link to="/success-stories" className="btn btn-text">
              Story Submission Guidelines
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;