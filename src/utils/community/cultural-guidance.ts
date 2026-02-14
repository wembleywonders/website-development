export interface CulturalGuidance {
  sensitivity_notes: string[];
  community_context: string;
  preservation_tips: string[];
}

export const provideCulturalGuidance = (content: string): CulturalGuidance => {
  return {
    sensitivity_notes: [
      "Consider family privacy preferences",
      "Respect cultural traditions mentioned",
      "Ask permission before sharing widely"
    ],
    community_context: "Wembley Central community heritage",
    preservation_tips: [
      "Include dates and locations when possible",
      "Add context for younger generations",
      "Consider including photos if available"
    ]
  };
};
