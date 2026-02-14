/**
 * Collaboration Types
 * ===================
 * 
 * Type definitions for cross-programme collaboration,
 * team projects, shared resources, and community workspace features.
 * 
 * Supports the Wembley Wonders collaborative model where:
 * - Projects span multiple programmes
 * - Members contribute different skills
 * - Revenue is shared transparently
 * - Community owns the pipeline
 */

// ============================================
// CORE IDENTIFIERS
// ============================================

export type ProgrammeId = 
  | 'stemgineers'
  | 'techreneurs'
  | 'trubble-n-bass'
  | 'pageturners'
  | 'silk-stilettos'
  | 'kaywanas-court'
  | 'g-tech-casters'
  | 'auntie-anansis-kitchen'
  | 'scrap-cat'
  | 'bright-sparks';

export type MembershipTier = 
  | 'visitor'
  | 'explorer'
  | 'member'
  | 'creator'
  | 'mentor'
  | 'admin';

export type ProjectStatus = 
  | 'draft'
  | 'planning'
  | 'in-progress'
  | 'review'
  | 'completed'
  | 'published'
  | 'archived';

export type CollaboratorRole = 
  | 'lead'
  | 'contributor'
  | 'reviewer'
  | 'mentor'
  | 'supporter';

export type ResourceType = 
  | 'equipment'
  | 'space'
  | 'material'
  | 'digital-asset'
  | 'template'
  | 'skill';

// ============================================
// USER & MEMBER TYPES
// ============================================

export interface Member {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  membershipTier: MembershipTier;
  programmes: ProgrammeId[];
  primaryProgramme?: ProgrammeId;
  skills: Skill[];
  badges: Badge[];
  joinedAt: Date;
  lastActiveAt: Date;
  bio?: string;
  portfolio?: PortfolioItem[];
  availability?: Availability;
  earnings?: EarningsSummary;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  verifiedBy?: string; // Mentor ID who verified
  verifiedAt?: Date;
  endorsements: number;
}

export type SkillCategory = 
  | 'technical'
  | 'creative'
  | 'production'
  | 'performance'
  | 'business'
  | 'communication'
  | 'heritage';

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  programme?: ProgrammeId;
  earnedAt: Date;
  category: BadgeCategory;
}

export type BadgeCategory = 
  | 'skill'
  | 'completion'
  | 'contribution'
  | 'collaboration'
  | 'mentorship'
  | 'community';

export interface Availability {
  hoursPerWeek: number;
  preferredDays: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
  preferredTimes: ('morning' | 'afternoon' | 'evening')[];
  remoteOnly: boolean;
  notes?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'product' | 'performance' | 'article' | 'tutorial';
  thumbnailUrl?: string;
  url?: string;
  programmes: ProgrammeId[];
  createdAt: Date;
  featured: boolean;
}

export interface EarningsSummary {
  totalEarned: number;
  thisMonth: number;
  lastMonth: number;
  pendingPayout: number;
  projectCount: number;
  productsSold: number;
}

// ============================================
// PROJECT & COLLABORATION TYPES
// ============================================

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  programmes: ProgrammeId[];
  primaryProgramme: ProgrammeId;
  collaborators: Collaborator[];
  lead: string; // Member ID
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
  milestones: Milestone[];
  tasks: Task[];
  resources: ProjectResource[];
  deliverables: Deliverable[];
  revenueModel?: RevenueModel;
  visibility: 'private' | 'team' | 'programme' | 'community' | 'public';
  tags: string[];
  coverImageUrl?: string;
  discussionThreadId?: string;
}

export interface Collaborator {
  memberId: string;
  role: CollaboratorRole;
  joinedAt: Date;
  contribution?: string;
  revenueShare?: number; // Percentage (0-100)
  skills: string[]; // Skill IDs being contributed
  status: 'invited' | 'active' | 'paused' | 'completed';
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completedAt?: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  tasks: string[]; // Task IDs
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string; // Member ID
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  completedAt?: Date;
  milestoneId?: string;
  skills: string[]; // Skills needed
  estimatedHours?: number;
  actualHours?: number;
  comments: Comment[];
  attachments: Attachment[];
}

export interface ProjectResource {
  id: string;
  resourceId: string;
  type: ResourceType;
  name: string;
  bookedFrom?: Date;
  bookedUntil?: Date;
  status: 'requested' | 'approved' | 'in-use' | 'returned';
  notes?: string;
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  type: DeliverableType;
  status: 'planned' | 'in-progress' | 'ready' | 'published';
  fileUrl?: string;
  previewUrl?: string;
  publishedAt?: Date;
  cyberstoreListingId?: string;
}

export type DeliverableType = 
  | 'digital-product'
  | 'physical-product'
  | 'performance'
  | 'recording'
  | 'document'
  | 'design'
  | 'code'
  | 'tutorial'
  | 'event';

// ============================================
// REVENUE & ECONOMICS
// ============================================

export interface RevenueModel {
  type: 'fixed' | 'percentage' | 'hourly' | 'hybrid';
  totalBudget?: number;
  splits: RevenueSplit[];
  communityShare: number; // Percentage to community fund (typically 25%)
  platformShare: number; // Platform fee (typically 20%)
  creatorShare: number; // Total to creators (typically 55%)
  payoutSchedule: 'immediate' | 'weekly' | 'monthly' | 'on-completion';
  currency: 'GBP';
}

export interface RevenueSplit {
  memberId: string;
  percentage: number;
  role: string;
  minimumGuarantee?: number;
}

export interface Transaction {
  id: string;
  projectId?: string;
  productId?: string;
  type: TransactionType;
  amount: number;
  currency: 'GBP';
  fromId?: string; // Member/Customer ID
  toId: string; // Member ID
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  processedAt?: Date;
  description: string;
  metadata?: Record<string, unknown>;
}

export type TransactionType = 
  | 'product-sale'
  | 'project-payment'
  | 'workshop-fee'
  | 'commission'
  | 'royalty'
  | 'tip'
  | 'grant'
  | 'refund';

// ============================================
// COMMUNICATION & DISCUSSION
// ============================================

export interface Discussion {
  id: string;
  title: string;
  type: 'project' | 'programme' | 'community' | 'support';
  projectId?: string;
  programmeId?: ProgrammeId;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'open' | 'resolved' | 'locked';
  pinned: boolean;
  messages: Message[];
  participants: string[]; // Member IDs
}

export interface Message {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  editedAt?: Date;
  replyToId?: string;
  reactions: Reaction[];
  attachments: Attachment[];
  mentions: string[]; // Member IDs
  isSystemMessage: boolean;
}

export interface Reaction {
  emoji: string;
  memberIds: string[];
  count: number;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  editedAt?: Date;
  resolved: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedBy: string;
  uploadedAt: Date;
}

// ============================================
// SHARED RESOURCES
// ============================================

export interface SharedResource {
  id: string;
  name: string;
  type: ResourceType;
  description: string;
  location?: string;
  imageUrl?: string;
  availability: ResourceAvailability;
  bookings: ResourceBooking[];
  programmes: ProgrammeId[]; // Which programmes can access
  condition: 'excellent' | 'good' | 'fair' | 'needs-repair';
  notes?: string;
  addedAt: Date;
  lastMaintenanceAt?: Date;
}

export interface ResourceAvailability {
  schedule: WeeklySchedule;
  requiresApproval: boolean;
  maxBookingDuration: number; // Hours
  advanceBookingLimit: number; // Days
  restrictions?: string[];
}

export interface WeeklySchedule {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string;
}

export interface ResourceBooking {
  id: string;
  resourceId: string;
  memberId: string;
  projectId?: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed';
  purpose: string;
  approvedBy?: string;
  approvedAt?: Date;
  notes?: string;
}

// ============================================
// EVENTS & SESSIONS
// ============================================

export interface CollaborativeEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  programmes: ProgrammeId[];
  hostId: string;
  coHosts: string[];
  startTime: Date;
  endTime: Date;
  location: EventLocation;
  capacity?: number;
  registrations: EventRegistration[];
  status: 'draft' | 'published' | 'in-progress' | 'completed' | 'cancelled';
  isRecurring: boolean;
  recurrenceRule?: string;
  tags: string[];
  coverImageUrl?: string;
  fee?: number;
  materials?: string[];
}

export type EventType = 
  | 'workshop'
  | 'session'
  | 'meetup'
  | 'showcase'
  | 'performance'
  | 'hackathon'
  | 'review'
  | 'mentoring';

export interface EventLocation {
  type: 'in-person' | 'online' | 'hybrid';
  venue?: string;
  address?: string;
  room?: string;
  onlineUrl?: string;
  accessInstructions?: string;
}

export interface EventRegistration {
  memberId: string;
  status: 'registered' | 'waitlisted' | 'attended' | 'no-show' | 'cancelled';
  registeredAt: Date;
  attendedAt?: Date;
  feedback?: EventFeedback;
}

export interface EventFeedback {
  rating: number; // 1-5
  comment?: string;
  submittedAt: Date;
}

// ============================================
// NOTIFICATIONS & ACTIVITY
// ============================================

export interface Notification {
  id: string;
  recipientId: string;
  type: NotificationType;
  title: string;
  message: string;
  actionUrl?: string;
  read: boolean;
  createdAt: Date;
  expiresAt?: Date;
  metadata?: Record<string, unknown>;
}

export type NotificationType = 
  | 'project-invite'
  | 'project-update'
  | 'task-assigned'
  | 'task-completed'
  | 'comment-mention'
  | 'message'
  | 'payment'
  | 'event-reminder'
  | 'badge-earned'
  | 'resource-approved'
  | 'system';

export interface ActivityFeedItem {
  id: string;
  type: ActivityType;
  actorId: string;
  targetType: 'project' | 'product' | 'event' | 'member' | 'programme';
  targetId: string;
  description: string;
  createdAt: Date;
  visibility: 'private' | 'team' | 'programme' | 'community';
  metadata?: Record<string, unknown>;
}

export type ActivityType = 
  | 'project-created'
  | 'project-completed'
  | 'collaborator-joined'
  | 'deliverable-published'
  | 'product-launched'
  | 'event-hosted'
  | 'badge-earned'
  | 'milestone-reached'
  | 'sale-made';

// ============================================
// MATCHING & DISCOVERY
// ============================================

export interface CollaboratorMatch {
  memberId: string;
  matchScore: number;
  matchReasons: MatchReason[];
  availability: Availability;
  recentProjects: string[];
}

export interface MatchReason {
  type: 'skill' | 'programme' | 'availability' | 'experience' | 'interest';
  description: string;
  weight: number;
}

export interface ProjectOpportunity {
  id: string;
  projectId: string;
  title: string;
  description: string;
  skillsNeeded: string[];
  programmesInvolved: ProgrammeId[];
  estimatedHours: number;
  revenueShare?: number;
  deadline?: Date;
  applicants: Applicant[];
  status: 'open' | 'reviewing' | 'filled' | 'cancelled';
  postedAt: Date;
  postedBy: string;
}

export interface Applicant {
  memberId: string;
  appliedAt: Date;
  message?: string;
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: Date;
}

// ============================================
// CROSS-PROGRAMME INTEGRATION
// ============================================

export interface ProgrammeConnection {
  fromProgramme: ProgrammeId;
  toProgramme: ProgrammeId;
  connectionType: ConnectionType;
  description: string;
  examples: string[];
  activeProjects: number;
}

export type ConnectionType = 
  | 'content-creation'
  | 'production'
  | 'performance'
  | 'distribution'
  | 'promotion'
  | 'mentorship'
  | 'resource-sharing';

export interface CrossProgrammeProject {
  id: string;
  title: string;
  description: string;
  programmes: ProgrammeContribution[];
  status: ProjectStatus;
  outcomes: ProjectOutcome[];
}

export interface ProgrammeContribution {
  programmeId: ProgrammeId;
  role: string;
  deliverables: string[];
  contributors: string[];
}

export interface ProjectOutcome {
  type: 'product' | 'performance' | 'event' | 'content' | 'learning';
  title: string;
  description: string;
  metrics?: Record<string, number>;
  publishedAt?: Date;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: Date;
}

// ============================================
// FILTER & QUERY TYPES
// ============================================

export interface ProjectFilters {
  status?: ProjectStatus[];
  programmes?: ProgrammeId[];
  skills?: string[];
  hasOpenRoles?: boolean;
  startDateFrom?: Date;
  startDateTo?: Date;
  searchQuery?: string;
}

export interface MemberFilters {
  programmes?: ProgrammeId[];
  skills?: string[];
  membershipTier?: MembershipTier[];
  availability?: 'available' | 'limited' | 'unavailable';
  searchQuery?: string;
}

export interface ResourceFilters {
  type?: ResourceType[];
  programmes?: ProgrammeId[];
  availableFrom?: Date;
  availableTo?: Date;
  condition?: string[];
}

// ============================================
// UTILITY TYPES
// ============================================

export type WithTimestamps<T> = T & {
  createdAt: Date;
  updatedAt: Date;
};

export type WithId<T> = T & {
  id: string;
};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Create/Update DTOs
export type CreateProjectDTO = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'collaborators' | 'milestones' | 'tasks' | 'resources' | 'deliverables'>;
export type UpdateProjectDTO = Partial<CreateProjectDTO>;

export type CreateTaskDTO = Omit<Task, 'id' | 'completedAt' | 'comments' | 'attachments'>;
export type UpdateTaskDTO = Partial<CreateTaskDTO>;

export type CreateMessageDTO = Pick<Message, 'content' | 'replyToId' | 'attachments' | 'mentions'>;

export type CreateBookingDTO = Pick<ResourceBooking, 'resourceId' | 'startTime' | 'endTime' | 'purpose' | 'projectId'>;