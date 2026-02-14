import { useState } from 'react';
import React, { useState } from 'react';
import { MindfulMentalHealthROVProps } from './MindfulMentalHealthROVTypes';

const MindfulMentalHealthROV = (props: MindfulMentalHealthROVProps) => {
  const [sessionActive, setSessionActive] = useState(false);

  return (
    <div className="mindful-mental-health-rov">
      <header>
        <h2>Mohammad Mursa - Wellness Program Coordinator</h2>
        <p>"Your mental health journey is unique and valuable"</p>
      </header>
      <div className="mohammad-services">
        <section>
          <h3>Wellness Check-in</h3>
          <button onClick={() => setSessionActive(!sessionActive)}>
            {sessionActive ? 'Complete' : 'Start'} Session
          </button>
        </section>
        <section>
          <h3>Support Tools</h3>
          <button>Breathing Exercises</button>
          <button>Crisis Resources</button>
        </section>
      </div>
    </div>
  );
};

export default MindfulMentalHealthROV;
