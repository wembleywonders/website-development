export interface VolunteerProfile { id: string; name: string; skills: { skill: string; level: number }[]; availability: { day: string; time: string }[]; preferences: { preferredRoles: string[]; preferredProgrammes: string[] }; }
export interface Opportunity { id: string; title: string; programme: string; role: string; requiredSkills: { skill: string; minLevel: number }[]; }
export interface MatchResult { volunteer: VolunteerProfile; opportunity: Opportunity; score: number; recommended: boolean; }
class VolunteerMatchingService {
  private volunteers: Map<string, VolunteerProfile> = new Map();
  private opportunities: Map<string, Opportunity> = new Map();
  registerVolunteer(p: VolunteerProfile) { this.volunteers.set(p.id, p); }
  registerOpportunity(o: Opportunity) { this.opportunities.set(o.id, o); }
  findMatches(oppId: string, limit = 10): MatchResult[] {
    const opp = this.opportunities.get(oppId); if (!opp) return [];
    return Array.from(this.volunteers.values()).map(v => {
      const skillMatch = opp.requiredSkills.filter(rs => v.skills.some(vs => vs.skill === rs.skill && vs.level >= rs.minLevel)).length / (opp.requiredSkills.length || 1);
      const prefMatch = v.preferences.preferredRoles.includes(opp.role) ? 0.3 : 0;
      return { volunteer: v, opportunity: opp, score: skillMatch * 0.7 + prefMatch, recommended: skillMatch > 0.5 };
    }).sort((a, b) => b.score - a.score).slice(0, limit);
  }
}
export const volunteerMatchingService = new VolunteerMatchingService();
export default volunteerMatchingService;
