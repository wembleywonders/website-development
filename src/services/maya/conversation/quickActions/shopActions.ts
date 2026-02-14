// src/services/maya/conversation/quickActions/shopActions.ts
import { ROVResponse, MembershipTier } from '../types';

export class ShopActionsHandler {
  
  static handleShopGuide(): ROVResponse {
    return {
      text: "**Community Shop Guide**\n\nOur shop supports local economic development:\n\n**Local Business Directory**\n• Find Wembley-based businesses\n• Support community enterprises\n• Discover services near you\n\n**Creator Marketplace**\n• Products made by programme participants\n• Digital content and services\n• Community-created resources\n\n**How it works:**\n• Browse categories or search for specific items\n• All purchases support local economic growth\n• Creators earn revenue while building community wealth\n\nContact Judith Fontanelle (contact@wembleywonders.org) for business listing inquiries!",
      expression: 'helpful',
      personality: 'business'
    };
  }

  static handleLocalBusinessInfo(): ROVResponse {
    return {
      text: "**Supporting Local Business**\n\nWe help grow Wembley's local economy:\n\n**For Businesses:**\n• Free directory listings\n• Community networking opportunities\n• Skills partnerships with our programmes\n• Local customer connections\n\n**For Residents:**\n• Discover nearby services\n• Support community wealth building\n• Find culturally relevant businesses\n• Connect with local entrepreneurs\n\n**Partnership Opportunities:**\n• Apprenticeships and work experience\n• Skills-based volunteering\n• Community event participation\n\nInterested in listing your business or finding local services? Contact our team!",
      expression: 'excited',
      personality: 'business'
    };
  }

  static handleCreatorInfo(): ROVResponse {
    return {
      text: "**Creator Opportunities**\n\nTurn your skills into income while building community:\n\n**What Creators Can Sell:**\n• Digital content (videos, graphics, music)\n• Handmade products\n• Services (tutoring, design, photography)\n• Workshop facilitation\n\n**Support We Provide:**\n• Platform to showcase work\n• Business development guidance\n• Community of fellow creators\n• Revenue sharing that keeps profits local\n\n**Getting Started:**\n• Complete relevant skill-building programmes\n• Develop portfolio of work\n• Apply for creator marketplace access\n\nReady to start creating? Explore our programmes or contact us about creator opportunities!",
      expression: 'excited',
      personality: 'pathfinder'
    };
  }
}