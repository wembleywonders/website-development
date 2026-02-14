import React from 'react';
import styles from './SandboxPlanner.module.css';

interface MayaConversationProps {
  message: string;
}

const MayaConversation: React.FC<MayaConversationProps> = ({ message }) => {
  return (
    <div className={styles.mayaConversation}>
      <div className={styles.mayaAvatar}>👩🏾‍💼</div>
      <div className={styles.mayaSpeech}>
        {message}
      </div>
    </div>
  );
};

export default MayaConversation;