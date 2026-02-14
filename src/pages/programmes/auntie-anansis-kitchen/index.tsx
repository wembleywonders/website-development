import React from 'react';
import ProgrammePageTemplate from '../_shared/ProgrammePageTemplate';
import { getProgramme } from '../config';

const AuntieAnansisKitchenPage: React.FC = () => {
  const config = getProgramme('auntie-anansis-kitchen');

  if (!config) {
    return <div>Programme not found</div>;
  }

  return (
    <ProgrammePageTemplate
      config={config}
      interactiveTool={
        <div className="interactive-tool-preview">
          <div style={{
            padding: '4rem 2rem',
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)',
            border: '2px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍲</div>
            <h3 style={{ color: '#fbbf24', marginBottom: '1rem', fontSize: '2rem', fontWeight: '600' }}>
              Recipe & Heritage Keeper
            </h3>
            <p style={{ 
              color: '#e2e8f0', 
              maxWidth: '700px', 
              margin: '0 auto 1.5rem',
              fontSize: '1.1rem',
              lineHeight: '1.7'
            }}>
              Document YOUR island's recipes and the stories behind them. 
              Record ingredients, traditional techniques, and the Anansi tales that get told while cooking—
              before the Aunties who remember them are gone.
            </p>
            <div style={{
              background: 'rgba(251, 191, 36, 0.2)',
              border: '2px solid rgba(251, 191, 36, 0.4)',
              borderRadius: '1rem',
              padding: '2rem',
              margin: '2rem auto',
              maxWidth: '650px',
              textAlign: 'left'
            }}>
              <p style={{ 
                color: '#fbbf24', 
                fontWeight: '700',
                marginBottom: '1rem',
                fontSize: '1.2rem'
              }}>
                🌍 Fighting Food Monoculture:
              </p>
              <p style={{ color: '#e2e8f0', margin: '0', lineHeight: '1.7' }}>
                The UK treats "Caribbean food" like Jamaica is the only island. 
                Meanwhile, Grenadian oil down, St Lucian green fig & saltfish, Bajan cou-cou, 
                Trini doubles, and Guyanese pepperpot are being forgotten. 
                <strong style={{ color: '#fbbf24' }}> We're preserving 12+ island-specific traditions 
                before this knowledge is lost forever.</strong>
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '2rem'
            }}>
              <a 
                href="/programmes/auntie-anansis-kitchen/sandbox"
                style={{
                  padding: '1.25rem 2.5rem',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#0f172a',
                  borderRadius: '0.75rem',
                  fontSize: '1.15rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  border: 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(251, 191, 36, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🍲 Try the Recipe Heritage Keeper →
              </a>
            </div>
            <p style={{ 
              color: '#94a3b8', 
              marginTop: '1.5rem', 
              fontSize: '0.95rem',
              maxWidth: '600px',
              margin: '1.5rem auto 0'
            }}>
              Free to try! Document 3 recipes to see how we preserve heritage, connect to earning pathways, 
              and fight cultural erasure through food.
            </p>
          </div>
        </div>
      }
      communityShowcase={
        <div className="showcase-grid">
          <div className="showcase-item">
            <div className="showcase-image">🇬🇩</div>
            <h4>Grenadian Kitchen</h4>
            <p>Oil down, nutmeg everything, cocoa tea traditions</p>
          </div>
          <div className="showcase-item">
            <div className="showcase-image">🇱🇨</div>
            <h4>St Lucian Kitchen</h4>
            <p>Green fig & saltfish, bouyon, accra</p>
          </div>
          <div className="showcase-item">
            <div className="showcase-image">🇧🇧</div>
            <h4>Bajan Kitchen</h4>
            <p>Cou-cou & flying fish, pudding & souse</p>
          </div>
          <div className="showcase-item">
            <div className="showcase-image">🇹🇹</div>
            <h4>Trini Kitchen</h4>
            <p>Doubles, pelau, callaloo, roti</p>
          </div>
          <div className="showcase-item">
            <div className="showcase-image">🇬🇾</div>
            <h4>Guyanese Kitchen</h4>
            <p>Pepperpot, metemgee, cook-up rice</p>
          </div>
          <div className="showcase-item">
            <div className="showcase-image">🇩🇲</div>
            <h4>Dominican Kitchen</h4>
            <p>Mountain chicken, crab backs, provision</p>
          </div>
        </div>
      }
    />
  );
};

export default AuntieAnansisKitchenPage;
