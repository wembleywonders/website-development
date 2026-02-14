// src/pages/programmes/auntie-anansis-kitchen/sandbox.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import RecipeHeritageKeeper from '../../../components/sandboxes/auntie-anansis-kitchen/RecipeHeritageKeeper';
import styles from '../../../components/sandboxes/auntie-anansis-kitchen/AuntieAnansisSandbox.module.css';

const AuntieAnansisSandbox: React.FC = () => {
  return (
    <PageTemplate
      pageTitle="Recipe Heritage Keeper"
      pageStrapline="Your Caribbean Kitchen Journey Starts Here"
      showMaya={false}
      pageType="programme"
    >
      <div className={styles.sandboxContent}>
        {/* TOOL FIRST - NO PREAMBLE */}
        <RecipeHeritageKeeper />
        
        {/* Everything else comes AFTER they've engaged */}
      </div>
    </PageTemplate>
  );
};

export default AuntieAnansisSandbox;
