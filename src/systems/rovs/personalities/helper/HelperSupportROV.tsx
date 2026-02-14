import { useState } from 'react';
import React, { useState } from 'react';
import { HelperSupportROVProps } from './HelperSupportROVTypes';

const HelperSupportROV = (props: HelperSupportROVProps) => {
  const [supportSession, setSupportSession] = useState(false);

  return (
    <div className="helper-support-rov">
      <header>
        <h2>Hassan Al-Rashid - User Support Manager</h2>
        <p>"Every question deserves a thoughtful answer"</p>
      </header>
      <div className="hassan-services">
        <section>
          <h3>User Assistance</h3>
          <button onClick={() => setSupportSession(!supportSession)}>
            {supportSession ? 'End' : 'Begin'} Support Session
          </button>
        </section>
        <section>
          <h3>Technical Guidance</h3>
          <button>FAQ Resources</button>
          <button>Live Chat Support</button>
        </section>
      </div>
    </div>
  );
};

export default HelperSupportROV;
