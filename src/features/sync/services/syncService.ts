/**
 * Wembley Wonders - Sync Service
 * 
 * Handles offline sync, conflict resolution, and real-time synchronization
 * between the React frontend and Spring Boot backend.
 * 
 * Features:
 * - Offline-first operation queue with automatic retry
 * - WebSocket real-time sync with exponential backoff reconnection
 * - Cross-tab synchronization via storage events
 * - Conflict detection and resolution strategies
 * - Workspace and project-scoped sync operations
 * - Device-aware sync for multi-device support
 * 
 * @module features/sync/services/syncService
 */

import { apiClient } from '../../workspace/services/apiClient';
import type {
  SyncStatus,
  SyncOperation,
  SyncConflict,
  SyncEvent,
  ConflictResolutionStrategy,
  SyncMetadata,
  OfflineOperation
} from '../../workspace/services/syncTypes';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type EntityType = 
  | 'creator'
  | 'programme'
  | 'booking'
  | 'assessment'
  | 'journal'
  | 'achievement'
  | 'recipe'
  | 'media'
  | 'community-metric'
  | 'maya-conversation'
  | 'workspace'
  | 'project';

export interface SyncResponse {
  status: SyncStatus;
  timestamp: Date;
  operations: {
    successful: string[];
    failed: Array<{ id: string; error: Error }>;
  };
  conflicts?: SyncConflict[];
  metadata?: SyncMetadata;
}

export interface ProcessOperationsResult {
  successful: string[];
  failed: Array<{ id: string; error: Error }>;
  conflicts: SyncConflict[];
}

export interface SyncState {
  status: SyncStatus;
  lastSyncTime: Date | null;
  pendingOperations: number;
  conflicts: SyncConflict[];
  isOnline: boolean;
  isSyncing: boolean;
  error?: string;
}

export interface SyncResult {
  success: boolean;
  synced: number;
  failed: number;
  conflicts: SyncConflict[];
  errors: string[];
  timestamp: Date;
}

export interface SyncEntity {
  id: string;
  entityType: EntityType;
  data: Record<string, unknown>;
  localVersion: number;
  serverVersion?: number;
  lastModified: Date;
  lastSynced?: Date;
  isDirty: boolean;
  isDeleted?: boolean;
  workspaceId?: string;
}

type EventCallback = (event: SyncEvent) => void;

interface QueuedOperation extends SyncOperation {
  queuedAt: Date;
  attempts: number;
  lastAttempt?: Date;
  workspaceId: string;
}

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const ENDPOINTS = {
  // Sync endpoints
  sync: '/api/sync',
  syncWorkspace: (workspaceId: string) => `/api/workspaces/${workspaceId}/sync`,
  syncProject: (projectId: string) => `/api/projects/${projectId}/sync`,
  syncStatus: '/api/sync/status',
  
  // Operations
  operations: '/api/sync/operations',
  operation: (id: string) => `/api/sync/operations/${id}`,
  batch: '/api/sync/batch',
  
  // Conflicts
  conflicts: '/api/sync/conflicts',
  conflict: (id: string) => `/api/sync/conflicts/${id}`,
  resolve: (id: string) => `/api/sync/conflicts/${id}/resolve`,
  
  // Metadata & Statistics
  metadata: '/api/sync/metadata',
  statistics: '/api/sync/statistics',
  
  // Push/Pull
  push: '/api/sync/push',
  pull: '/api/sync/pull',
  
  // Entity endpoints
  entities: {
    creator: '/api/creators',
    programme: '/api/programmes',
    booking: '/api/bookings',
    assessment: '/api/assessments',
    journal: '/api/journals',
    achievement: '/api/achievements',
    recipe: '/api/recipes',
    media: '/api/media',
    'community-metric': '/api/metrics',
    'maya-conversation': '/api/maya/conversations',
    workspace: '/api/workspaces',
    project: '/api/projects',
  },
  
  // Health check
  health: '/api/health',
  ping: '/api/ping'
} as const;

// WebSocket endpoint for real-time sync
const WS_ENDPOINT = import.meta.env?.VITE_WS_URL || 'ws://localhost:8080/ws/sync';

// Storage keys with Wembley Wonders prefix
const STORAGE_KEYS = {
  QUEUE: 'ww_sync_queue',
  LAST_SYNC: 'ww_last_sync_time',
  DEVICE_ID: 'ww_device_id',
  CONFLICTS: 'ww_sync_conflicts',
  METADATA: 'ww_sync_metadata',
  ENTITY_CACHE: 'ww_entity_cache',
  SYNC_STATE: 'ww_sync_state'
} as const;

// Default configuration
const DEFAULT_CONFIG = {
  maxRetries: 3,
  batchSize: 10,
  queueProcessInterval: 5000,
  minSyncInterval: 10000,
  maxReconnectAttempts: 5,
  initialReconnectDelay: 1000,
  maxReconnectDelay: 30000,
  conflictResolution: 'server-wins' as ConflictResolutionStrategy
} as const;

// ============================================================================
// SYNC SERVICE CLASS
// ============================================================================

class SyncService {
  // Event system
  private eventListeners: Set<EventCallback> = new Set();
  
  // WebSocket
  private websocket: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private reconnectDelay: number = DEFAULT_CONFIG.initialReconnectDelay;
  
  // State
  private isInitialized = false;
  private syncLock = false;
  private processingQueue = false;
  
  // Data stores
  private operationQueue: Map<string, QueuedOperation> = new Map();
  private conflictCache: Map<string, SyncConflict> = new Map();
  private entityCache: Map<string, SyncEntity> = new Map();
  
  // Timers
  private queueProcessor: NodeJS.Timeout | null = null;
  
  // Current state
  private state: SyncState = {
    status: 'idle' as unknown as SyncStatus,
    lastSyncTime: null,
    pendingOperations: 0,
    conflicts: [],
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isSyncing: false
  };
  
  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }
  
  // ============================================================================
  // INITIALIZATION
  // ============================================================================
  
  /**
   * Initialize the sync service
   */
  private initialize(): void {
    if (this.isInitialized) return;
    
    console.log('[SyncService] Initializing...');
    
    // Load persisted data
    this.loadPersistedData();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Initialize WebSocket connection if online
    if (navigator.onLine) {
      this.initializeWebSocket();
    }
    
    // Start queue processor
    this.startQueueProcessor();
    
    this.isInitialized = true;
    
    this.emitEvent({
      type: 'sync-started',
      timestamp: new Date()
    });
    
    console.log('[SyncService] Initialized successfully');
  }
  
  /**
   * Set up browser event listeners
   */
  private setupEventListeners(): void {
    // Online/offline events
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Cross-tab sync via storage events
    window.addEventListener('storage', (e) => this.handleStorageEvent(e));
    
    // Save queue before unload
    window.addEventListener('beforeunload', () => this.persistData());
    
    // Visibility change - sync when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && navigator.onLine) {
        this.checkAndSync();
      }
    });
  }
  
  /**
   * Initialize WebSocket connection for real-time sync
   */
  private initializeWebSocket(): void {
    if (!navigator.onLine || this.websocket) return;
    
    try {
      const token = (typeof apiClient.getAccessToken === 'function' ? apiClient.getAccessToken() : undefined) ?? '';
      const deviceId = this.getDeviceId();
      const wsUrl = `${WS_ENDPOINT}?token=${token}&deviceId=${deviceId}`;
      
      console.log('[SyncService] Connecting WebSocket...');
      this.websocket = new WebSocket(wsUrl);
      
      this.websocket.onopen = () => {
        console.log('[SyncService] WebSocket connected');
        this.reconnectAttempts = 0;
        this.reconnectDelay = DEFAULT_CONFIG.initialReconnectDelay;
        
        // Send initial status
        this.sendWebSocketMessage({
          type: 'status',
          deviceId: this.getDeviceId(),
          queueSize: this.operationQueue.size,
          lastSyncTime: this.state.lastSyncTime
        });
        
        this.emitEvent({
          type: 'sync-started',
          timestamp: new Date()
        });
      };
      
      this.websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleWebSocketMessage(data);
        } catch (error) {
          console.error('[SyncService] Failed to parse WebSocket message:', error);
        }
      };
      
      this.websocket.onerror = (error) => {
        console.error('[SyncService] WebSocket error:', error);
        this.emitEvent({
          type: 'sync-failed',
          timestamp: new Date(),
          error: new Error('WebSocket connection error')
        });
      };
      
      this.websocket.onclose = () => {
        console.log('[SyncService] WebSocket disconnected');
        this.websocket = null;
        
        // Reconnect if online
        if (navigator.onLine) {
          this.scheduleReconnect();
        }
      };
    } catch (error) {
      console.error('[SyncService] Failed to initialize WebSocket:', error);
      this.scheduleReconnect();
    }
  }
  
  /**
   * Send message through WebSocket
   */
  private sendWebSocketMessage(data: Record<string, unknown>): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(data));
    }
  }
  
  /**
   * Schedule WebSocket reconnection with exponential backoff
   */
  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    
    if (this.reconnectAttempts >= DEFAULT_CONFIG.maxReconnectAttempts) {
      console.error('[SyncService] Max reconnection attempts reached');
      this.emitEvent({
        type: 'sync-failed',
        timestamp: new Date(),
        error: new Error('Max WebSocket reconnection attempts reached')
      });
      return;
    }
    
    this.reconnectAttempts++;
    this.reconnectDelay = Math.min(
      this.reconnectDelay * 2,
      DEFAULT_CONFIG.maxReconnectDelay
    );
    
    console.log(`[SyncService] Reconnecting in ${this.reconnectDelay / 1000}s...`);
    
    this.reconnectTimer = setTimeout(() => {
      this.initializeWebSocket();
    }, this.reconnectDelay);
  }
  
  // ============================================================================
  // PUBLIC API - SYNC OPERATIONS
  // ============================================================================
  
  /**
   * Perform a full sync
   */
  async performFullSync(): Promise<SyncResponse> {
    if (this.syncLock) {
      throw new Error('Sync already in progress');
    }
    
    if (!navigator.onLine) {
      throw new Error('Cannot sync while offline');
    }
    
    this.syncLock = true;
    this.updateState({ isSyncing: true, status: 'syncing' as unknown as SyncStatus });
    
    try {
      this.emitEvent({
        type: 'sync-started',
        timestamp: new Date()
      });
      
      const operations = Array.from(this.operationQueue.values());
      
      const response = await apiClient.post<SyncResponse>(
        ENDPOINTS.sync,
        {
          operations: operations.map(op => ({
            id: op.id,
            type: op.type,
            resource: op.resource,
            resourceId: op.resourceId,
            data: op.data,
            timestamp: op.timestamp,
            workspaceId: op.workspaceId
          })),
          lastSyncTime: this.state.lastSyncTime,
          deviceId: this.getDeviceId(),
          conflicts: Array.from(this.conflictCache.keys())
        }
      );
      
      await this.processSyncResponse(response);
      this.saveLastSyncTime(new Date());
      
      this.emitEvent({
        type: 'sync-completed',
        timestamp: new Date(),
        data: response
      } as unknown as SyncEvent);
      
      return response;
    } catch (error) {
      this.updateState({ status: 'error' as unknown as SyncStatus, error: String(error) });
      
      this.emitEvent({
        type: 'sync-failed',
        timestamp: new Date(),
        error: error as Error
      });
      
      throw error;
    } finally {
      this.syncLock = false;
      this.updateState({ isSyncing: false });
    }
  }
  
  /**
   * Sync a specific workspace
   */
  async syncWorkspace(workspaceId: string): Promise<SyncResponse> {
    if (!navigator.onLine) {
      throw new Error('Cannot sync while offline');
    }
    
    try {
      const operations = Array.from(this.operationQueue.values()).filter(
        op => op.workspaceId === workspaceId
      );
      
      const response = await apiClient.post<SyncResponse>(
        ENDPOINTS.syncWorkspace(workspaceId),
        {
          operations,
          lastSyncTime: this.state.lastSyncTime,
          deviceId: this.getDeviceId()
        }
      );
      
      await this.processSyncResponse(response);
      return response;
    } catch (error) {
      console.error('[SyncService] Failed to sync workspace:', error);
      throw error;
    }
  }
  
  /**
   * Sync a specific project
   */
  async syncProject(projectId: string): Promise<SyncResponse> {
    if (!navigator.onLine) {
      throw new Error('Cannot sync while offline');
    }
    
    try {
      const operations = Array.from(this.operationQueue.values()).filter(
        op => op.resourceId === projectId && op.resource === 'project'
      );
      
      const response = await apiClient.post<SyncResponse>(
        ENDPOINTS.syncProject(projectId),
        {
          operations,
          lastSyncTime: this.state.lastSyncTime,
          deviceId: this.getDeviceId()
        }
      );
      
      await this.processSyncResponse(response);
      return response;
    } catch (error) {
      console.error('[SyncService] Failed to sync project:', error);
      throw error;
    }
  }
  
  /**
   * Force push local changes (client wins)
   */
  async forcePush(operations?: SyncOperation[]): Promise<void> {
    if (!navigator.onLine) {
      throw new Error('Cannot force push while offline');
    }
    
    const opsToSync = operations || Array.from(this.operationQueue.values());
    
    try {
      await apiClient.post(ENDPOINTS.push, {
        operations: opsToSync,
        force: true,
        deviceId: this.getDeviceId(),
        timestamp: new Date()
      });
      
      // Clear pushed operations from queue
      opsToSync.forEach(op => {
        this.operationQueue.delete(op.id);
      });
      
      this.persistData();
      
      this.emitEvent({
        type: 'sync-completed',
        timestamp: new Date(),
        data: { forced: true, type: 'push' }
      } as unknown as SyncEvent);
    } catch (error) {
      console.error('[SyncService] Failed to force push:', error);
      throw error;
    }
  }
  
  /**
   * Force pull remote changes (server wins)
   */
  async forcePull(): Promise<void> {
    if (!navigator.onLine) {
      throw new Error('Cannot force pull while offline');
    }
    
    try {
      const response = await apiClient.post<{
        changes: Array<Record<string, unknown>>;
        timestamp: Date;
      }>(ENDPOINTS.pull, {
        force: true,
        deviceId: this.getDeviceId(),
        lastSyncTime: this.state.lastSyncTime
      });
      
      // Apply remote changes
      await this.applyRemoteChanges(response.changes);
      
      // Clear local queue (remote wins)
      this.operationQueue.clear();
      this.conflictCache.clear();
      this.persistData();
      
      this.saveLastSyncTime(new Date(response.timestamp));
      
      this.emitEvent({
        type: 'sync-completed',
        timestamp: new Date(),
        data: { forced: true, type: 'pull' }
      } as unknown as SyncEvent);
    } catch (error) {
      console.error('[SyncService] Failed to force pull:', error);
      throw error;
    }
  }
  
  /**
   * Check and sync if needed
   */
  private async checkAndSync(): Promise<void> {
    if (!navigator.onLine || this.syncLock) return;
    if (this.operationQueue.size === 0) return;
    
    const lastSync = this.state.lastSyncTime;
    if (lastSync) {
      const timeSinceSync = Date.now() - lastSync.getTime();
      if (timeSinceSync < DEFAULT_CONFIG.minSyncInterval) return;
    }
    
    try {
      await this.performFullSync();
    } catch (error) {
      console.error('[SyncService] Auto-sync failed:', error);
    }
  }
  
  // ============================================================================
  // PUBLIC API - ENTITY OPERATIONS
  // ============================================================================
  
  /**
   * Queue an operation for sync
   */
  queueOperation(operation: SyncOperation & { workspaceId?: string }): void {
    const queuedOp: QueuedOperation = {
      ...operation,
      queuedAt: new Date(),
      attempts: 0
    };
    
    this.operationQueue.set(operation.id, queuedOp);
    this.updateState({ pendingOperations: this.operationQueue.size });
    this.persistData();
    
    // Send through WebSocket if connected
    this.sendWebSocketMessage({
      type: 'operation',
      operation: operation
    });
    
    this.emitEvent({
      type: 'operation-queued',
      timestamp: new Date(),
      operation
    });
  }
  
  /**
   * Create a new entity
   */
  async create(
    entityType: EntityType,
    data: Record<string, unknown>,
    workspaceId?: string
  ): Promise<string> {
    const id = this.generateId();
    
    const operation: SyncOperation & { workspaceId?: string } = {
      id: this.generateId(),
      type: 'CREATE',
      resource: entityType,
      resourceId: id,
      data: { ...data, id },
      timestamp: new Date(),
      workspaceId: workspaceId ?? '',
      attempts: 0,
      status: 'pending'
    };
    
    this.queueOperation(operation);
    
    // Update local cache
    this.entityCache.set(`${entityType}:${id}`, {
      id,
      entityType,
      data: { ...data, id },
      localVersion: 1,
      lastModified: new Date(),
      isDirty: true,
      workspaceId: workspaceId ?? ''
    });
    
    return id;
  }
  
  /**
   * Update an existing entity
   */
  async update(
    entityType: EntityType,
    entityId: string,
    data: Record<string, unknown>,
    workspaceId?: string
  ): Promise<void> {
    const operation: SyncOperation & { workspaceId?: string } = {
      id: this.generateId(),
      type: 'UPDATE',
      resource: entityType,
      resourceId: entityId,
      data,
      timestamp: new Date(),
      workspaceId: workspaceId ?? '',
      // Add required properties for SyncOperation
      attempts: 0,
      status: 'pending'
    };
    
    this.queueOperation(operation);
    
    // Update local cache
    const cacheKey = `${entityType}:${entityId}`;
    const existing = this.entityCache.get(cacheKey);
    
    this.entityCache.set(cacheKey, {
      id: entityId,
      entityType,
      data: existing ? { ...existing.data, ...data } : data,
      localVersion: (existing?.localVersion || 0) + 1,
      serverVersion: existing?.serverVersion,
      lastModified: new Date(),
      lastSynced: existing?.lastSynced,
      isDirty: true,
      workspaceId: workspaceId ?? ''
    });
  }
  
  /**
   * Delete an entity
   */
  async delete(
    entityType: EntityType,
    entityId: string,
    workspaceId?: string
  ): Promise<void> {
    const operation: SyncOperation & { workspaceId?: string } = {
      id: this.generateId(),
      type: 'DELETE',
      resource: entityType,
      resourceId: entityId,
      data: {},
      timestamp: new Date(),
      workspaceId: workspaceId ?? '',
      // Add required properties for SyncOperation
      attempts: 0,
      status: 'pending'
    };
    
    this.queueOperation(operation);
    
    // Mark as deleted in cache
    const cacheKey = `${entityType}:${entityId}`;
    const existing = this.entityCache.get(cacheKey);
    
    if (existing) {
      existing.isDeleted = true;
      existing.isDirty = true;
    }
  }
  
  /**
   * Get entity from cache
   */
  getEntity(entityType: EntityType, entityId: string): SyncEntity | undefined {
    return this.entityCache.get(`${entityType}:${entityId}`);
  }
  
  /**
   * Get all entities of a type
   */
  getEntitiesByType(entityType: EntityType): SyncEntity[] {
    const entities: SyncEntity[] = [];
    for (const [key, entity] of this.entityCache) {
      if (key.startsWith(`${entityType}:`) && !entity.isDeleted) {
        entities.push(entity);
      }
    }
    return entities;
  }
  
  // ============================================================================
  // PUBLIC API - CONFLICT RESOLUTION
  // ============================================================================
  
  /**
   * Resolve a conflict
   */
  async resolveConflict(
    conflict: SyncConflict,
    strategy: ConflictResolutionStrategy,
    mergedData?: Record<string, unknown>
  ): Promise<void> {
    try {
      const response = await apiClient.post(
        ENDPOINTS.resolve(conflict.id),
        {
          strategy,
          resolution: mergedData,
          deviceId: this.getDeviceId()
        }
      );
      
      this.conflictCache.delete(conflict.id);
      await this.applyConflictResolution(response as Record<string, unknown>);
      this.persistData();
      
      this.emitEvent({
        type: 'conflict-resolved',
        timestamp: new Date(),
        conflict,
        data: { strategy, mergedData }
      } as unknown as SyncEvent);
    } catch (error) {
      console.error('[SyncService] Failed to resolve conflict:', error);
      throw error;
    }
  }
  
  /**
   * Get all conflicts
   */
  async getConflicts(): Promise<SyncConflict[]> {
    if (!navigator.onLine) {
      return Array.from(this.conflictCache.values());
    }
    
    try {
      const response = await apiClient.get<SyncConflict[]>(ENDPOINTS.conflicts);
      
      this.conflictCache.clear();
      response.forEach(conflict => {
        this.conflictCache.set(conflict.id, conflict);
      });
      
      this.persistData();
      return response;
    } catch (error) {
      console.error('[SyncService] Failed to get conflicts:', error);
      return Array.from(this.conflictCache.values());
    }
  }
  
  /**
   * Get local conflicts
   */
  getLocalConflicts(): SyncConflict[] {
    return Array.from(this.conflictCache.values());
  }
  
  // ============================================================================
  // PUBLIC API - STATE & METADATA
  // ============================================================================
  
  /**
   * Get current sync state
   */
  getState(): Readonly<SyncState> {
    return { ...this.state };
  }
  
  /**
   * Get pending operations count
   */
  getPendingCount(): number {
    return this.operationQueue.size;
  }
  
  /**
   * Check if online
   */
  isOnline(): boolean {
    return navigator.onLine;
  }
  
  /**
   * Check connection status
   */
  async checkConnection(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(
        apiClient.getBaseURL?.() + ENDPOINTS.ping || ENDPOINTS.ping,
        {
          method: 'GET',
          signal: controller.signal
        }
      );
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }
  
  /**
   * Get sync metadata
   */
  async getMetadata(): Promise<SyncMetadata> {
    try {
      const response = await apiClient.get<SyncMetadata>(ENDPOINTS.metadata);
      localStorage.setItem(STORAGE_KEYS.METADATA, JSON.stringify(response));
      return response;
    } catch (error) {
      const cached = localStorage.getItem(STORAGE_KEYS.METADATA);
      if (cached) {
        return JSON.parse(cached);
      }
      throw error;
    }
  }
  
  /**
   * Get sync statistics
   */
  async getStatistics(
    period?: 'day' | 'week' | 'month' | 'all'
  ): Promise<Record<string, unknown>> {
    try {
      const params = period ? `?period=${period}` : '';
      return await apiClient.get(`${ENDPOINTS.statistics}${params}`);
    } catch (error) {
      console.error('[SyncService] Failed to get statistics:', error);
      throw error;
    }
  }
  
  // ============================================================================
  // PUBLIC API - EVENTS
  // ============================================================================
  
  /**
   * Subscribe to sync events
   */
  subscribeToEvents(callback: EventCallback): () => void {
    this.eventListeners.add(callback);
    return () => {
      this.eventListeners.delete(callback);
    };
  }
  
  /**
   * Emit an event to all listeners
   */
  private emitEvent(event: SyncEvent): void {
    this.eventListeners.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('[SyncService] Error in event listener:', error);
      }
    });
  }
  
  // ============================================================================
  // PRIVATE - QUEUE PROCESSING
  // ============================================================================
  
  /**
   * Start the queue processor
   */
  private startQueueProcessor(): void {
    if (this.queueProcessor) return;
    
    this.queueProcessor = setInterval(() => {
      this.processQueue();
    }, DEFAULT_CONFIG.queueProcessInterval);
  }
  
  /**
   * Process the operation queue
   */
  private async processQueue(): Promise<void> {
    if (this.processingQueue || !navigator.onLine || this.operationQueue.size === 0) {
      return;
    }
    
    this.processingQueue = true;
    
    try {
      const now = Date.now();
      const operations = Array.from(this.operationQueue.values())
        .filter(op => {
          if (!op.lastAttempt) return true;
          const timeSinceAttempt = now - op.lastAttempt.getTime();
          // Exponential backoff: 5s, 10s, 20s, 40s...
          const backoffTime = Math.min(5000 * Math.pow(2, op.attempts), 60000);
          return timeSinceAttempt > backoffTime;
        })
        .slice(0, DEFAULT_CONFIG.batchSize);
      
      if (operations.length > 0) {
        await this.processOperations(operations);
      }
    } catch (error) {
      console.error('[SyncService] Queue processing error:', error);
    } finally {
      this.processingQueue = false;
    }
  }
  
  /**
   * Process a batch of operations
   */
  async processOperations(
    operations: QueuedOperation[]
  ): Promise<ProcessOperationsResult> {
    const results: ProcessOperationsResult = {
      successful: [],
      failed: [],
      conflicts: []
    };
    
    if (!navigator.onLine) {
      operations.forEach(op => {
        results.failed.push({
          id: op.id,
          error: new Error('Offline')
        });
      });
      return results;
    }
    
    try {
      const response = await apiClient.post<{
        results: Array<{
          operationId: string;
          status: 'success' | 'failed' | 'conflict';
          error?: string;
          conflict?: SyncConflict;
        }>;
      }>(ENDPOINTS.batch, {
        operations,
        deviceId: this.getDeviceId()
      });
      
      response.results.forEach(result => {
        if (result.status === 'success') {
          results.successful.push(result.operationId);
          this.operationQueue.delete(result.operationId);
        } else if (result.status === 'failed') {
          results.failed.push({
            id: result.operationId,
            error: new Error(result.error || 'Unknown error')
          });
          
          const op = this.operationQueue.get(result.operationId);
          if (op) {
            op.attempts++;
            op.lastAttempt = new Date();
            
            if (op.attempts > DEFAULT_CONFIG.maxRetries) {
              this.operationQueue.delete(result.operationId);
            }
          }
        } else if (result.status === 'conflict' && result.conflict) {
          results.conflicts.push(result.conflict);
          this.conflictCache.set(result.conflict.id, result.conflict);
          
          this.emitEvent({
            type: 'conflict-detected',
            timestamp: new Date(),
            conflict: result.conflict
          });
        }
      });
      
      this.updateState({ pendingOperations: this.operationQueue.size });
      this.persistData();
      
      return results;
    } catch (error) {
      console.error('[SyncService] Failed to process operations:', error);
      
      operations.forEach(op => {
        results.failed.push({
          id: op.id,
          error: error as Error
        });
      });
      
      return results;
    }
  }
  
  // ============================================================================
  // PRIVATE - RESPONSE HANDLING
  // ============================================================================
  
  /**
   * Process sync response
   */
  private async processSyncResponse(response: SyncResponse): Promise<void> {
    // Remove successful operations from queue
    response.operations.successful.forEach(id => {
      this.operationQueue.delete(id);
    });
    
    // Update failed operations
    response.operations.failed.forEach(({ id }) => {
      const op = this.operationQueue.get(id);
      if (op) {
        op.attempts++;
        op.lastAttempt = new Date();
        
        if (op.attempts > DEFAULT_CONFIG.maxRetries) {
          this.operationQueue.delete(id);
        }
      }
    });
    
    // Handle conflicts
    if (response.conflicts) {
      response.conflicts.forEach(conflict => {
        this.conflictCache.set(conflict.id, conflict);
        
        this.emitEvent({
          type: 'conflict-detected',
          timestamp: new Date(),
          conflict
        });
      });
    }
    
    this.updateState({
      status: 'idle' as unknown as SyncStatus,
      pendingOperations: this.operationQueue.size,
      conflicts: Array.from(this.conflictCache.values())
    });
    
    this.persistData();
  }
  
  /**
   * Apply remote changes
   */
  private async applyRemoteChanges(
    changes: Array<Record<string, unknown>>
  ): Promise<void> {
    changes.forEach(change => {
      const entityType = change.entityType as EntityType;
      const entityId = change.id as string;
      
      if (entityType && entityId) {
        const cacheKey = `${entityType}:${entityId}`;
        
        if (change._deleted) {
          this.entityCache.delete(cacheKey);
        } else {
          this.entityCache.set(cacheKey, {
            id: entityId,
            entityType,
            data: change,
            localVersion: (change.version as number) || 1,
            serverVersion: (change.version as number) || 1,
            lastModified: new Date(),
            lastSynced: new Date(),
            isDirty: false
          });
        }
      }
      
      this.emitEvent({
        type: 'sync-completed',
        timestamp: new Date(),
        data: { change }
      } as unknown as SyncEvent);
    });
    
    this.persistData();
  }
  
  /**
   * Apply conflict resolution
   */
  private async applyConflictResolution(
    resolution: Record<string, unknown>
  ): Promise<void> {
    this.emitEvent({
      type: 'conflict-resolved',
      timestamp: new Date(),
      data: resolution
    } as unknown as SyncEvent);
  }
  
  // ============================================================================
  // PRIVATE - WEBSOCKET HANDLING
  // ============================================================================
  
  /**
   * Handle WebSocket message
   */
  private handleWebSocketMessage(data: Record<string, unknown>): void {
    switch (data.type) {
      case 'sync':
        this.handleRemoteSync(data);
        break;
      case 'conflict':
        this.handleRemoteConflict(data);
        break;
      case 'update':
        this.handleRemoteUpdate(data);
        break;
      case 'broadcast':
        this.handleBroadcast(data);
        break;
      default:
        console.warn('[SyncService] Unknown WebSocket message type:', data.type);
    }
  }
  
  /**
   * Handle remote sync notification
   */
  private handleRemoteSync(data: Record<string, unknown>): void {
    if (data.deviceId === this.getDeviceId()) return;
    
    this.emitEvent({
      type: 'sync-started',
      timestamp: new Date(),
      data
    } as unknown as SyncEvent);
    
    if (data.requiresSync) {
      this.checkAndSync();
    }
  }
  
  /**
   * Handle remote conflict
   */
  private handleRemoteConflict(data: Record<string, unknown>): void {
    const conflict = data.conflict as SyncConflict;
    this.conflictCache.set(conflict.id, conflict);
    this.persistData();
    
    this.emitEvent({
      type: 'conflict-detected',
      timestamp: new Date(),
      conflict
    });
  }
  
  /**
   * Handle remote update
   */
  private handleRemoteUpdate(data: Record<string, unknown>): void {
    if (data.deviceId === this.getDeviceId()) return;
    
    this.applyRemoteChanges([data.change as Record<string, unknown>]);
  }
  
  /**
   * Handle broadcast message
   */
  private handleBroadcast(data: Record<string, unknown>): void {
    this.emitEvent({
      type: 'sync-completed',
      timestamp: new Date(),
      data: { broadcast: data.message }
    } as unknown as SyncEvent);
  }
  
  // ============================================================================
  // PRIVATE - CONNECTION HANDLING
  // ============================================================================
  
  /**
   * Handle online event
   */
  private handleOnline(): void {
    console.log('[SyncService] Connection restored');
    
    this.updateState({ isOnline: true, status: 'idle' as unknown as SyncStatus });
    
    this.emitEvent({
      type: 'online',
      timestamp: new Date()
    });
    
    // Reinitialize WebSocket
    if (!this.websocket) {
      this.initializeWebSocket();
    }
    
    // Process queued operations
    this.processQueue();
    this.checkAndSync();
  }
  
  /**
   * Handle offline event
   */
  private handleOffline(): void {
    console.log('[SyncService] Connection lost');
    
    this.updateState({ isOnline: false, status: 'error' as unknown as SyncStatus });
    
    this.emitEvent({
      type: 'offline',
      timestamp: new Date()
    });
    
    // Close WebSocket
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
    
    // Cancel reconnection attempts
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
  
  /**
   * Handle storage event (cross-tab sync)
   */
  private handleStorageEvent(event: StorageEvent): void {
    if (event.key === STORAGE_KEYS.QUEUE && event.newValue) {
      this.loadPersistedData();
      
      this.emitEvent({
        type: 'sync-started',
        timestamp: new Date()
      });
    }
  }
  
  // ============================================================================
  // PRIVATE - PERSISTENCE
  // ============================================================================
  
  /**
   * Load persisted data from localStorage
   */
  private loadPersistedData(): void {
    // Load operation queue
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.QUEUE);
      if (stored) {
        const queue = JSON.parse(stored) as QueuedOperation[];
        queue.forEach(op => {
          this.operationQueue.set(op.id, {
            ...op,
            queuedAt: new Date(op.queuedAt),
            lastAttempt: op.lastAttempt ? new Date(op.lastAttempt) : undefined,
            timestamp: new Date(op.timestamp)
          });
        });
      }
    } catch (error) {
      console.error('[SyncService] Failed to load persisted queue:', error);
    }
    
    // Load conflicts
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONFLICTS);
      if (stored) {
        const conflicts = JSON.parse(stored) as SyncConflict[];
        conflicts.forEach(conflict => {
          this.conflictCache.set(conflict.id, conflict);
        });
      }
    } catch (error) {
      console.error('[SyncService] Failed to load persisted conflicts:', error);
    }
    
    // Load entity cache
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ENTITY_CACHE);
      if (stored) {
        const entries: [string, SyncEntity][] = JSON.parse(stored);
        entries.forEach(([key, entity]) => {
          this.entityCache.set(key, {
            ...entity,
            lastModified: new Date(entity.lastModified),
            lastSynced: entity.lastSynced ? new Date(entity.lastSynced) : undefined
          });
        });
      }
    } catch (error) {
      console.error('[SyncService] Failed to load entity cache:', error);
    }
    
    // Load last sync time
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
      if (stored) {
        this.state.lastSyncTime = new Date(stored);
      }
    } catch {
      // Ignore
    }
    
    this.updateState({
      pendingOperations: this.operationQueue.size,
      conflicts: Array.from(this.conflictCache.values())
    });
  }
  
  /**
   * Persist data to localStorage
   */
  private persistData(): void {
    try {
      // Save operation queue
      const queue = Array.from(this.operationQueue.values());
      localStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(queue));
      
      // Save conflicts
      const conflicts = Array.from(this.conflictCache.values());
      localStorage.setItem(STORAGE_KEYS.CONFLICTS, JSON.stringify(conflicts));
      
      // Save entity cache
      const entities = Array.from(this.entityCache.entries());
      localStorage.setItem(STORAGE_KEYS.ENTITY_CACHE, JSON.stringify(entities));
    } catch (error) {
      console.error('[SyncService] Failed to persist data:', error);
    }
  }
  
  /**
   * Save last sync time
   */
  private saveLastSyncTime(time: Date): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, time.toISOString());
      this.updateState({ lastSyncTime: time });
    } catch (error) {
      console.error('[SyncService] Failed to save last sync time:', error);
    }
  }
  
  // ============================================================================
  // PRIVATE - UTILITY METHODS
  // ============================================================================
  
  /**
   * Update state
   */
  private updateState(updates: Partial<SyncState>): void {
    this.state = { ...this.state, ...updates };
  }
  
  /**
   * Get device ID
   */
  private getDeviceId(): string {
    let deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (!deviceId) {
      deviceId = `ww_device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    }
    return deviceId;
  }
  
  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  /**
   * Clean up resources
   */
  destroy(): void {
    // Stop queue processor
    if (this.queueProcessor) {
      clearInterval(this.queueProcessor);
      this.queueProcessor = null;
    }
    
    // Close WebSocket
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
    
    // Clear reconnect timer
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    // Clear listeners
    this.eventListeners.clear();
    
    // Persist final state
    this.persistData();
    
    console.log('[SyncService] Destroyed');
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const syncService = new SyncService();

// Clean up on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('unload', () => {
    syncService.destroy();
  });
}

// React hook integration
export function useSyncService() {
  return syncService;
}

// Default export
export default syncService;