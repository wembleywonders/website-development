export type RecruitmentStage = 'inquiry' | 'application' | 'screening' | 'interview' | 'dbs-check' | 'training' | 'placement' | 'active' | 'inactive' | 'withdrawn';
export type VolunteerRole = 'workshop-facilitator' | 'mentor' | 'event-support' | 'tech-support' | 'admin-support' | 'community-ambassador' | 'safeguarding-lead' | 'programme-coordinator';
export interface VolunteerApplication { id: string; applicantId: string; name: string; email: string; phone: string; preferredRoles: VolunteerRole[]; skills: string[]; stage: RecruitmentStage; submittedAt: string; }
class RecruitmentService {
  private applications: Map<string, VolunteerApplication> = new Map();
  submitApplication(app: Omit<VolunteerApplication, 'id' | 'stage' | 'submittedAt'>): VolunteerApplication {
    const newApp: VolunteerApplication = { ...app, id: `va-${Date.now()}`, stage: 'application', submittedAt: new Date().toISOString() };
    this.applications.set(newApp.id, newApp); return newApp;
  }
  getApplication(id: string) { return this.applications.get(id) || null; }
  getAllApplications() { return Array.from(this.applications.values()); }
  advanceStage(id: string, stage: RecruitmentStage) { const a = this.applications.get(id); if (a) a.stage = stage; return !!a; }
}
export const recruitmentService = new RecruitmentService();
export default recruitmentService;
