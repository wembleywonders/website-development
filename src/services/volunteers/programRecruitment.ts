export type WWProgramme = 'stemgeneers' | 'techreneurs' | 'g-tech-casters' | 'kaywanas-court' | 'pageturners' | 'raydyo' | 'joystick' | 'scrap-cat';
export type ProgrammeRole = 'lead-facilitator' | 'assistant-facilitator' | 'mentor' | 'tech-support' | 'admin-coordinator';
export interface ProgrammeVolunteerNeed { id: string; programme: WWProgramme; role: ProgrammeRole; requiredSkills: string[]; spotsAvailable: number; spotsFilled: number; status: 'open' | 'filled' | 'closed'; }
export interface ProgrammeVolunteer { id: string; volunteerId: string; name: string; programme: WWProgramme; role: ProgrammeRole; hoursContributed: number; }
class ProgramRecruitmentService {
  private needs: Map<string, ProgrammeVolunteerNeed> = new Map();
  private volunteers: Map<string, ProgrammeVolunteer> = new Map();
  createNeed(need: Omit<ProgrammeVolunteerNeed, 'id' | 'spotsFilled' | 'status'>) { const n = { ...need, id: `pvn-${Date.now()}`, spotsFilled: 0, status: 'open' as const }; this.needs.set(n.id, n); return n; }
  getOpenNeeds() { return Array.from(this.needs.values()).filter(n => n.status === 'open'); }
  assignVolunteer(needId: string, volunteerId: string, name: string) { const need = this.needs.get(needId); if (!need) return null; const pv = { id: `pv-${Date.now()}`, volunteerId, name, programme: need.programme, role: need.role, hoursContributed: 0 }; this.volunteers.set(pv.id, pv); need.spotsFilled++; return pv; }
  logHours(pvId: string, hours: number) { const v = this.volunteers.get(pvId); if (v) v.hoursContributed += hours; return !!v; }
}
export const programRecruitmentService = new ProgramRecruitmentService();
export default programRecruitmentService;
