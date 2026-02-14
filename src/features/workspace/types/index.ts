/**
 * Type Definitions Export Hub
 * Central export point for all TypeScript type definitions
 * @module features/workspace/types
 */

// Core workspace types
export * from './workspace.types';
export * from './project.types';
export * from './quickAction.types';
export * from './activity.types';
export * as JourneyStepTypes from './journeyStep.types';
// export * from './common.types'; // removed: module not found — add or correct this export when ./common.types is added

// Additional Workspace Type Definitions


export interface WorkspaceNotifications {
email?: boolean;
push?: boolean;
sms?: boolean;
[key: string]: any;
}


export interface WorkspaceIntegration {
id: string;
type: string;
config: Record<string, any>;
connectedAt?: string;
}


export interface WorkspaceTheme {
mode: 'light' | 'dark' | 'auto';
accentColor?: string;
}


export interface WorkspaceExport {
workspaceId: number;
format: 'json' | 'zip';
downloadUrl?: string;
exportedAt: string;
}


export interface WorkspaceBackup {
id: string;
workspaceId: number;
createdAt: string;
sizeMb?: number;
downloadUrl?: string;
}


export interface WorkspaceAuditLog {
id: string;
userId?: number;
action: string;
timestamp: string;
metadata?: Record<string, any>;
}


export interface WorkspaceUpdate {
name?: string;
settings?: Record<string, any>;
updatedAt?: string;
}


export interface WorkspaceCreate {
name: string;
userId: number;
settings?: Record<string, any>;
}


export interface WorkspaceQuota {
projectsLimit?: number;
usersLimit?: number;
storageLimitMb?: number;
apiRateLimit?: number;
}


export interface WorkspaceUsage {
projectsUsed?: number;
usersUsed?: number;
storageUsedMb?: number;
apiCallsUsed?: number;
}


export interface PageRequest {
page?: number;
size?: number;
sort?: string;
direction?: 'asc' | 'desc';
}