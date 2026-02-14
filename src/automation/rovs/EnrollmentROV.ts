interface EnrollmentData {
  firstName: string;
  lastName: string;
  email: string;
  strand: 'basic' | 'creative' | 'stem';
  workshopDate: string;
  phone?: string;
}

export class EnrollmentROV {
  async processEnrollment(data: EnrollmentData) {
    // Validate required fields
    // Create user record
    // Send confirmation email
    // Log to audit trail
  }
}
