import React, { useState } from 'react';
import { Heart, ThumbsUp, Star, MessageCircle, Share2 } from 'lucide-react';
import './ReactionButtons.css';

interface ReactionButtonsProps {
  programId: string;
  currentReactions: {
    hearts: number;
    likes: number;
    stars: number;
    comments: number;
    shares: number;
  };
  onReaction: (type: 'heart' | 'like' | 'star' | 'comment' | 'share') => void;
}

export const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  programId,
  currentReactions,
  onReaction
}) => {
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());

  const handleReaction = (type: 'heart' | 'like' | 'star' | 'comment' | 'share') => {
    const hasReacted = userReactions.has(type);
    
    if (!hasReacted) {
      setUserReactions(prev => new Set([...prev, type]));
      onReaction(type);
    }
  };

  const reactions = [
    { 
      type: 'heart' as const, 
      icon: Heart, 
      count: currentReactions.hearts, 
      label: 'Love this!',
      color: '#ff6b6b'
    },
    { 
      type: 'like' as const, 
      icon: ThumbsUp, 
      count: currentReactions.likes, 
      label: 'Like',
      color: '#4ecdc4'
    },
    { 
      type: 'star' as const, 
      icon: Star, 
      count: currentReactions.stars, 
      label: 'Amazing!',
      color: '#ffe66d'
    },
    { 
      type: 'comment' as const, 
      icon: MessageCircle, 
      count: currentReactions.comments, 
      label: 'Comment',
      color: '#a8e6cf'
    },
    { 
      type: 'share' as const, 
      icon: Share2, 
      count: currentReactions.shares, 
      label: 'Share',
      color: '#ffd93d'
    }
  ];

  return (
    <div className="reaction-buttons">
      {reactions.map(({ type, icon: Icon, count, label, color }) => (
        <button
          key={type}
          className={`reaction-btn ${userReactions.has(type) ? 'reacted' : ''}`}
          onClick={() => handleReaction(type)}
          style={{ '--reaction-color': color } as React.CSSProperties}
          title={label}
        >
          <Icon size={18} />
          <span className="reaction-count">{count}</span>
        </button>
      ))}
    </div>
  );
};