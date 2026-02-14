import { signpostingDirectory } from '../../../data/maya/signpostingDirectory';

interface SignpostingResponse {
  text: string;
  expression: 'neutral' | 'thinking' | 'helpful' | 'concerned' | 'excited';
  personality: 'pathfinder' | 'helper' | 'insight' | 'business' | 'emergency' | 'justice' | 'mindful';
  urgency: 'low' | 'medium' | 'high' | 'crisis';
}

class SignpostingROVService {
  
  getSignpostingResponse(query: string, context?: string): SignpostingResponse {
    const input = query.toLowerCase();
    
    // Crisis situations - immediate response
    if (this.detectCrisis(input)) {
      return this.handleCrisisSignposting(input);
    }
    
    // Housing issues
    if (input.includes('homeless') || input.includes('evict') || input.includes('housing') || input.includes('rent')) {
      return this.handleHousingSignposting();
    }
    
    // Benefits and financial support
    if (input.includes('benefit') || input.includes('universal credit') || input.includes('money') || input.includes('debt')) {
      return this.handleBenefitsSignposting();
    }
    
    // Health services
    if (input.includes('doctor') || input.includes('health') || input.includes('medical') || input.includes('mental health')) {
      return this.handleHealthSignposting();
    }
    
    // Immigration and legal
    if (input.includes('visa') || input.includes('immigration') || input.includes('legal') || input.includes('advice')) {
      return this.handleLegalSignposting();
    }
    
    // Employment
    if (input.includes('job') || input.includes('work') || input.includes('employment') || input.includes('cv')) {
      return this.handleEmploymentSignposting();
    }
    
    // Cultural/community support
    if (input.includes('community') || input.includes('cultural') || input.includes('religious')) {
      return this.handleCommunitySignposting();
    }
    
    // General signposting
    return this.handleGeneralSignposting();
  }
  
  private detectCrisis(input: string): boolean {
    const crisisKeywords = [
      'emergency', 'urgent', 'crisis', 'danger', 'harm', 'suicide', 'abuse', 
      'violence', 'threat', 'immediate help', 'desperate', 'nowhere to go'
    ];
    return crisisKeywords.some(keyword => input.includes(keyword));
  }
  
  private handleCrisisSignposting(input: string): SignpostingResponse {
    let response = "**If this is an emergency requiring immediate help, please call 999.**\n\n";
    
    response += "**Crisis Support Available:**\n\n";
    
    const crisis = signpostingDirectory['crisis-support'];
    
    response += `**${crisis.emergency['police-fire-ambulance'].name}**: ${crisis.emergency['police-fire-ambulance'].phone}\n`;
    response += `${crisis.emergency['police-fire-ambulance'].description}\n\n`;
    
    response += `**${crisis['mental-health'].samaritans.name}**: ${crisis['mental-health'].samaritans.phone}\n`;
    response += `${crisis['mental-health'].samaritans.description}\n\n`;
    
    if (input.includes('abuse') || input.includes('violence')) {
      response += `**${crisis['domestic-violence']['womens-aid'].name}**: ${crisis['domestic-violence']['womens-aid'].phone}\n`;
      response += `${crisis['domestic-violence']['womens-aid'].description}\n\n`;
    }
    
    response += "These are specialist services designed to help in crisis situations. Please reach out - support is available.";
    
    return {
      text: response,
      expression: 'concerned',
      personality: 'emergency',
      urgency: 'crisis'
    };
  }
  
  private handleHousingSignposting(): SignpostingResponse {
    let response = "Here are housing support services in the Wembley/Brent area:\n\n";
    
    const housing = signpostingDirectory['statutory-services'].housing;
    
    response += `**${housing['brent-housing'].name}**\n`;
    response += `${housing['brent-housing'].description}\n`;
    response += `Phone: ${housing['brent-housing'].phone}\n`;
    response += `Website: ${housing['brent-housing'].website}\n`;
    response += `Emergency: ${housing['brent-housing'].emergency}\n\n`;
    
    response += `**${housing.shelter.name}**\n`;
    response += `${housing.shelter.description}\n`;
    response += `Phone: ${housing.shelter.phone}\n`;
    response += `Website: ${housing.shelter.website}\n\n`;
    
    response += "Both services can provide advice on housing rights, homelessness prevention, and emergency accommodation.";
    
    return {
      text: response,
      expression: 'helpful',
      personality: 'justice',
      urgency: 'high'
    };
  }
  
  private handleBenefitsSignposting(): SignpostingResponse {
    let response = "Here's where to get benefits and financial support:\n\n";
    
    const benefits = signpostingDirectory['statutory-services']['benefits-support'];
    
    response += `**${benefits['citizens-advice-brent'].name}**\n`;
    response += `${benefits['citizens-advice-brent'].description}\n`;
    response += `Phone: ${benefits['citizens-advice-brent'].contact}\n`;
    response += `Address: ${benefits['citizens-advice-brent'].address}\n`;
    response += `Drop-in: ${benefits['citizens-advice-brent'].dropIn}\n\n`;
    
    response += `**${benefits['job-centre-plus'].name}**\n`;
    response += `${benefits['job-centre-plus'].description}\n`;
    response += `Address: ${benefits['job-centre-plus'].address}\n`;
    response += `Phone: ${benefits['job-centre-plus'].phone}\n\n`;
    
    response += "Citizens Advice is particularly good for complex benefit issues and appeals.";
    
    return {
      text: response,
      expression: 'helpful',
      personality: 'justice',
      urgency: 'medium'
    };
  }
  
  private handleHealthSignposting(): SignpostingResponse {
    let response = "Health support services:\n\n";
    
    const health = signpostingDirectory['statutory-services'].health;
    const mentalHealth = signpostingDirectory['crisis-support']['mental-health'];
    
    response += `**${health['nhs-111'].name}**\n`;
    response += `${health['nhs-111'].description}\n`;
    response += `Phone: ${health['nhs-111'].phone}\n\n`;
    
    response += `**${health['wembley-centre-health'].name}**\n`;
    response += `${health['wembley-centre-health'].description}\n`;
    response += `Address: ${health['wembley-centre-health'].address}\n`;
    response += `Phone: ${health['wembley-centre-health'].phone}\n\n`;
    
    response += `**${mentalHealth['mind-brent'].name}**\n`;
    response += `${mentalHealth['mind-brent'].description}\n`;
    response += `Phone: ${mentalHealth['mind-brent'].phone}\n`;
    response += `Website: ${mentalHealth['mind-brent'].website}\n\n`;
    
    response += "For mental health crisis support, Samaritans are available 24/7: 116 123";
    
    return {
      text: response,
      expression: 'helpful',
      personality: 'mindful',
      urgency: 'medium'
    };
  }
  
  private handleEmploymentSignposting(): SignpostingResponse {
    let response = "Employment support services:\n\n";
    
    const employment = signpostingDirectory.employment['job-search'];
    
    response += `**${employment['brent-works'].name}**\n`;
    response += `${employment['brent-works'].description}\n`;
    response += `Phone: ${employment['brent-works'].phone}\n`;
    response += `Website: ${employment['brent-works'].website}\n\n`;
    
    response += `**${employment['jobcentre-plus'].name}**\n`;
    response += `${employment['jobcentre-plus'].description}\n`;
    response += `Address: ${employment['jobcentre-plus'].address}\n`;
    response += `Phone: ${employment['jobcentre-plus'].phone}\n\n`;
    
    response += "**Plus our own programs:** STEMgineers and Tech-preneurs can lead to employment opportunities with our business partners!";
    
    return {
      text: response,
      expression: 'helpful',
      personality: 'pathfinder',
      urgency: 'low'
    };
  }
  
  private handleCommunitySignposting(): SignpostingResponse {
    let response = "Community and cultural organizations in the area:\n\n";
    
    const cultural = signpostingDirectory['community-organizations']['cultural-religious'];
    
    response += `**${cultural['irish-centre'].name}**\n`;
    response += `${cultural['irish-centre'].description}\n`;
    response += `Address: ${cultural['irish-centre'].address}\n`;
    response += `Phone: ${cultural['irish-centre'].phone}\n\n`;
    
    response += `**${cultural['wembley-mosque'].name}**\n`;
    response += `${cultural['wembley-mosque'].description}\n`;
    response += `Address: ${cultural['wembley-mosque'].address}\n`;
    response += `Phone: ${cultural['wembley-mosque'].phone}\n\n`;
    
    response += `**${cultural['hindu-temple'].name}**\n`;
    response += `${cultural['hindu-temple'].description}\n`;
    response += `Address: ${cultural['hindu-temple'].address}\n`;
    response += `Phone: ${cultural['hindu-temple'].phone}\n\n`;
    
    response += "These organizations often provide broader community support beyond religious services.";
    
    return {
      text: response,
      expression: 'helpful',
      personality: 'helper',
      urgency: 'low'
    };
  }
  
  private handleLegalSignposting(): SignpostingResponse {
    let response = "Legal advice and immigration support:\n\n";
    
    const legal = signpostingDirectory['immigration-legal'];
    
    response += `**${legal.immigration.praxis.name}**\n`;
    response += `${legal.immigration.praxis.description}\n`;
    response += `Address: ${legal.immigration.praxis.address}\n`;
    response += `Phone: ${legal.immigration.praxis.phone}\n`;
    response += `Website: ${legal.immigration.praxis.website}\n\n`;
    
    response += `**${legal['legal-aid']['legal-aid-agency'].name}**\n`;
    response += `${legal['legal-aid']['legal-aid-agency'].description}\n`;
    response += `Website: ${legal['legal-aid']['legal-aid-agency'].website}\n`;
    response += `Phone: ${legal['legal-aid']['legal-aid-agency'].phone}\n\n`;
    
    response += "**Citizens Advice Brent** (0300 330 1197) also provides initial legal guidance and can refer to specialists.";
    
    return {
      text: response,
      expression: 'helpful',
      personality: 'justice',
      urgency: 'medium'
    };
  }
  
  private handleGeneralSignposting(): SignpostingResponse {
    return {
      text: "I can help connect you with local support services! Are you looking for help with:\n\n• **Housing** - homelessness, repairs, housing benefit\n• **Benefits** - Universal Credit, financial support, debt advice\n• **Health** - GP services, mental health support\n• **Employment** - job searching, CV help, training\n• **Legal/Immigration** - advice services, documentation\n• **Community Support** - cultural organizations, family services\n• **Crisis Support** - emergency services, food banks\n\nJust let me know what type of support you need and I'll provide specific local contacts and services.",
      expression: 'helpful',
      personality: 'helper',
      urgency: 'low'
    };
  }
}

export const signpostingROV = new SignpostingROVService();
