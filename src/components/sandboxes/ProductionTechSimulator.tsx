import React, { useState } from 'react';
import { Mic, Volume2, Lightbulb, Check, AlertCircle, Radio } from 'lucide-react';
import './ProductionTechSimulator.css';

interface MicSetup {
  id: string;
  name: string;
  position: string;
  type: string;
}

const ProductionTechSimulator: React.FC = () => {
  const [productionType, setProductionType] = useState<'radio' | 'live'>('radio');
  const [castSize, setCastSize] = useState(3);
  const [mics, setMics] = useState<MicSetup[]>([]);
  const [mixerChannels, setMixerChannels] = useState(8);
  const [lighting, setLighting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const micTypes = [
    { id: 'condenser', name: 'Condenser Mic', use: 'Studio dialogue (sensitive, clear)' },
    { id: 'dynamic', name: 'Dynamic Mic', use: 'Live performance (durable, feedback resistant)' },
    { id: 'lavalier', name: 'Lavalier (Lapel)', use: 'Hands-free dialogue' },
    { id: 'shotgun', name: 'Shotgun Mic', use: 'Directional pickup (boom mic)' }
  ];

  const addMic = (type: string) => {
    const newMic: MicSetup = {
      id: `mic-${Date.now()}`,
      name: micTypes.find(m => m.id === type)?.name || 'Mic',
      position: `Position ${mics.length + 1}`,
      type
    };
    setMics([...mics, newMic]);
  };

  const removeMic = (id: string) => {
    setMics(mics.filter(m => m.id !== id));
  };

  const calculateSetup = () => {
    setShowResults(true);
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    // Mic count check
    if (mics.length < castSize) {
      recommendations.push({
        type: 'error',
        message: `You need at least ${castSize} mics for ${castSize} cast members. Currently: ${mics.length}`
      });
    } else if (mics.length === castSize) {
      recommendations.push({
        type: 'success',
        message: `Perfect! ${mics.length} mics matches ${castSize} cast members.`
      });
    } else {
      recommendations.push({
        type: 'warning',
        message: `You have ${mics.length} mics for ${castSize} cast. Consider backup mics or multi-person scenes.`
      });
    }

    // Mixer channels check
    const requiredChannels = mics.length + 2; // mics + music/effects tracks
    if (mixerChannels < requiredChannels) {
      recommendations.push({
        type: 'error',
        message: `Mixer needs at least ${requiredChannels} channels (${mics.length} mics + 2 tracks). Current: ${mixerChannels}`
      });
    } else {
      recommendations.push({
        type: 'success',
        message: `Mixer has ${mixerChannels} channels - sufficient for ${mics.length} mics plus music/effects.`
      });
    }

    // Production type recommendations
    if (productionType === 'radio') {
      const condenserCount = mics.filter(m => m.type === 'condenser').length;
      if (condenserCount < mics.length / 2) {
        recommendations.push({
          type: 'warning',
          message: 'Radio dramas work best with condenser mics for studio clarity.'
        });
      }
    } else {
      const dynamicCount = mics.filter(m => m.type === 'dynamic').length;
      if (dynamicCount < mics.length / 2) {
        recommendations.push({
          type: 'warning',
          message: 'Live performances work best with dynamic mics to prevent feedback.'
        });
      }
      
      if (!lighting) {
        recommendations.push({
          type: 'error',
          message: 'Live performance requires lighting design!'
        });
      }
    }

    return recommendations;
  };

  return (
    <div className="production-tech-simulator">
      <div className="simulator-header">
        <h3>🎚️ Production Tech Setup Simulator</h3>
        <p>Plan the technical setup for your production</p>
      </div>

      <div className="simulator-grid">
        {/* Production Type */}
        <div className="simulator-section">
          <h4>Production Type</h4>
          <div className="button-group">
            <button
              onClick={() => setProductionType('radio')}
              className={`type-button ${productionType === 'radio' ? 'active' : ''}`}
            >
              <Radio size={20} />
              Radio Drama
            </button>
            <button
              onClick={() => setProductionType('live')}
              className={`type-button ${productionType === 'live' ? 'active' : ''}`}
            >
              <Lightbulb size={20} />
              Live Performance
            </button>
          </div>
        </div>

        {/* Cast Size */}
        <div className="simulator-section">
          <h4>Cast Size</h4>
          <div className="slider-control">
            <label>Number of actors: {castSize}</label>
            <input
              type="range"
              min="1"
              max="12"
              value={castSize}
              onChange={(e) => setCastSize(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>

        {/* Microphone Setup */}
        <div className="simulator-section full-width">
          <h4>Microphone Setup</h4>
          <div className="mic-selector">
            {micTypes.map(mic => (
              <button
                key={mic.id}
                onClick={() => addMic(mic.id)}
                className="add-mic-button"
              >
                <Mic size={16} />
                Add {mic.name}
              </button>
            ))}
          </div>
          
          <div className="mic-list">
            {mics.length === 0 ? (
              <p className="empty-state">Add microphones to your setup...</p>
            ) : (
              mics.map(mic => (
                <div key={mic.id} className="mic-item">
                  <Mic size={16} />
                  <div className="mic-details">
                    <strong>{mic.name}</strong>
                    <span>{mic.position}</span>
                  </div>
                  <button onClick={() => removeMic(mic.id)} className="remove-button">
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mixer Channels */}
        <div className="simulator-section">
          <h4>Mixing Board</h4>
          <div className="slider-control">
            <label>Mixer Channels: {mixerChannels}</label>
            <input
              type="range"
              min="4"
              max="24"
              step="4"
              value={mixerChannels}
              onChange={(e) => setMixerChannels(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>

        {/* Lighting (for live only) */}
        {productionType === 'live' && (
          <div className="simulator-section">
            <h4>Lighting Design</h4>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={lighting}
                onChange={(e) => setLighting(e.target.checked)}
              />
              <span>Lighting design included</span>
            </label>
          </div>
        )}
      </div>

      {/* Calculate Button */}
      <div className="simulator-actions">
        <button onClick={calculateSetup} className="calculate-button">
          <Check size={20} />
          Check My Setup
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="simulator-results">
          <h4>Setup Analysis</h4>
          <div className="recommendations">
            {getRecommendations().map((rec, index) => (
              <div key={index} className={`recommendation ${rec.type}`}>
                {rec.type === 'error' && <AlertCircle size={20} />}
                {rec.type === 'success' && <Check size={20} />}
                {rec.type === 'warning' && <Volume2 size={20} />}
                <span>{rec.message}</span>
              </div>
            ))}
          </div>

          <div className="tech-specs">
            <h5>Your Technical Specifications:</h5>
            <ul>
              <li><strong>Production:</strong> {productionType === 'radio' ? 'Radio Drama (Studio)' : 'Live Performance (Stage)'}</li>
              <li><strong>Cast:</strong> {castSize} actors</li>
              <li><strong>Microphones:</strong> {mics.length} total</li>
              <li><strong>Mixer:</strong> {mixerChannels}-channel board</li>
              {productionType === 'live' && <li><strong>Lighting:</strong> {lighting ? 'Yes' : 'No'}</li>}
            </ul>
          </div>
        </div>
      )}

      <div className="simulator-tips">
        <strong>Pro Tips:</strong>
        <ul>
          <li><strong>Radio dramas:</strong> Use condenser mics in a quiet studio for best clarity</li>
          <li><strong>Live shows:</strong> Dynamic mics prevent feedback with stage monitors</li>
          <li><strong>Mixer rule:</strong> Always have 2-4 extra channels for music and sound effects</li>
          <li><strong>Backup plan:</strong> Have spare mics and cables - something always fails!</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductionTechSimulator;
