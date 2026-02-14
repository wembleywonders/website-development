// src/services/maya/conversation/responseHandlers/contactHandler.ts
import { ROVResponse } from '../types';
import { staffDirectory } from '../../../../data/maya/programKnowledge';

export class ContactHandler {
  
  static handleHumanContactRequest(input: string): ROVResponse {
    const judith = staffDirectory['judith-fontanelle'];
    let response = "I can connect you with our team!\n\n";
    
    response += `**General inquiries**: Contact Judith Fontanelle, our Director of Community Engagement:\n`;
    response += `Email: ${judith.email}\n`;
    response += `Phone: ${judith.phone}\n`;
    response += `Mobile: ${judith.mobile}\n`;
    response += `Available: Mon-Fri, 9am-5pm (calls), Email responses within 4 hours\n\n`;
    response += "You can also visit us at 123 High Road, Wembley HA9 6AA during weekday business hours.\n\n";
    
    response += "**Note:** If you need support services beyond what we provide (benefits, housing, health, legal, etc.), I can also signpost you to appropriate local organizations.";
    
    return {
      text: response,
      expression: 'helpful',
      personality: 'helper'
    };
  }
}