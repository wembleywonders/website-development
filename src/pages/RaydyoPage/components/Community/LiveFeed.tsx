import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, Radio, Clock } from 'lucide-react';
import './LiveFeed.css';

interface LiveFeedProps {
  isLive: boolean;
  programId: string;
}

interface FeedItem {
  id: string;
  type: 'reaction' | 'comment' | 'join' | 'request';
  user: string;
  content: string;
  timestamp: Date;
  avatar?: string;
}

export const LiveFeed: React.FC<LiveFeedProps> = ({ isLive, programId }) => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: '1',
      type: 'join',
      user: 'Sarah M.',
      content: 'joined the listening party',
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '2',
      type: 'reaction',
      user: 'Marcus K.',
      content: 'loved the last song!',
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: '3',
      type: 'comment',
      user: 'Priya S.',
      content: 'Can you play some Afrobeats next?',
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: '4',
      type: 'request',
      user: 'David L.',
      content: 'requested: Bob Marley - One Love',
      timestamp: new Date(Date.now() - 240000),
    }
  ]);

  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!isLive) return;

    // Simulate new feed items
    const interval = setInterval(() => {
      const randomActivities = [
        { type: 'join', content: 'joined the conversation' },
        { type: 'reaction', content: 'is loving this show!' },
        { type: 'comment', content: 'Great music selection tonight' }
      ];

      const activity = randomActivities[Math.floor(Math.random() * randomActivities.length)];
      const newItem: FeedItem = {
        id: Date.now().toString(),
        type: activity.type as FeedItem['type'],
        user: `Listener ${Math.floor(Math.random() * 999)}`,
        content: activity.content,
        timestamp: new Date()
      };

      setFeedItems(prev => [newItem, ...prev.slice(0, 9)]); // Keep last 10 items
    }, 15000); // New activity every 15 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
  };

  const getItemIcon = (type: FeedItem['type']) => {
    switch (type) {
      case 'join': return <Users size={14} />;
      case 'reaction': return <MessageCircle size={14} />;
      case 'comment': return <MessageCircle size={14} />;
      case 'request': return <Radio size={14} />;
      default: return <MessageCircle size={14} />;
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newItem: FeedItem = {
      id: Date.now().toString(),
      type: 'comment',
      user: 'You',
      content: newComment,
      timestamp: new Date()
    };

    setFeedItems(prev => [newItem, ...prev]);
    setNewComment('');
  };

  if (!isLive) {
    return (
      <div className="live-feed offline">
        <div className="feed-header">
          <h4>Community Activity</h4>
          <span className="status offline">Offline</span>
        </div>
        <div className="offline-message">
          <Radio size={32} />
          <p>Join us when we're live for real-time community interaction!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="live-feed">
      <div className="feed-header">
        <h4>Live Activity</h4>
        <span className="status live">
          <div className="live-dot"></div>
          LIVE
        </span>
      </div>

      <div className="feed-content">
        {feedItems.map((item) => (
          <div key={item.id} className={`feed-item ${item.type}`}>
            <div className="item-icon">
              {getItemIcon(item.type)}
            </div>
            <div className="item-content">
              <div className="item-text">
                <strong>{item.user}</strong> {item.content}
              </div>
              <div className="item-time">
                <Clock size={12} />
                {formatTime(item.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form className="comment-form" onSubmit={handleSubmitComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Join the conversation..."
          className="comment-input"
        />
        <button type="submit" className="send-btn" disabled={!newComment.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};