// Additional Workspace Type Definitions
// Extend and refine these types according to backend specifications


export interface WorkspaceStatistics {
totalProjects?: number;
activeUsers?: number;
storageUsedMb?: number;
storageLimitMb?: number;
[key: string]: any;
}


export interface WorkspaceUser {
id: number;
name?: string;
email?: string;
role?: string;
joinedAt?: string;
[key: string]: any;
}


export interface WorkspaceInvite {
email: string;
role?: string;
invitedAt: string;
invitedByUserId?: number;
status?: 'pending' | 'accepted' | 'expired';
}


export interface WorkspaceRole {
id: string;
name: string;
permissions: string[];
}


export interface WorkspacePermissions {
canEdit?: boolean;
canDelete?: boolean;
canInvite?: boolean;
canPublish?: boolean;
[key: string]: any;
}


export interface WorkspaceBilling {
plan: string;
renewalDate?: string;
paymentMethod?: string;
status?: string;
[key: string]: any;
}


export interface WorkspaceStorage {
usedMb: number;
limitMb: number;
files?: Array<{ id: string; name: string; sizeMb: number }>;
}


export interface WorkspaceNotifications {
email?: boolean;
push?: boolean;
sms?: boolean;
[key: string]: any;
}


export interface WorkspaceIntegration {
id: string;
name?: string;
type?: string;
enabled?: boolean;
config?: { [key: string]: any };
createdAt?: string;
updatedAt?: string;
[key: string]: any;
}