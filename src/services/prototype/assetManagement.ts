/**
 * Asset Management Service
 * Wembley Wonders CIC
 * 
 * Manages prototype assets: images, videos, documents, 3D models.
 * Handles upload, storage, versioning, and retrieval.
 */

// ============================================================================
// TYPES
// ============================================================================

export type AssetType = 'image' | 'video' | 'document' | 'model' | 'code' | 'audio';

export interface PrototypeAsset {
  id: string;
  prototypeId: string;
  type: AssetType;
  name: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  mimeType: string;
  size: number;
  version: number;
  uploadedBy: string;
  uploadedAt: string;
  metadata: AssetMetadata;
}

export interface AssetMetadata {
  width?: number;
  height?: number;
  duration?: number;
  pages?: number;
  format?: string;
  tags: string[];
}

export interface UploadOptions {
  generateThumbnail?: boolean;
  maxSize?: number;
  allowedTypes?: AssetType[];
  compress?: boolean;
}

export interface AssetVersion {
  version: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  notes?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_MIME_TYPES: Record<AssetType, string[]> = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  model: ['model/gltf-binary', 'model/gltf+json', 'application/octet-stream'],
  code: ['text/plain', 'application/json', 'text/javascript', 'text/typescript'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg']
};

// ============================================================================
// SERVICE CLASS
// ============================================================================

class AssetManagementService {
  private assets: Map<string, PrototypeAsset[]> = new Map();
  private versions: Map<string, AssetVersion[]> = new Map();

  /**
   * Upload a new asset for a prototype
   */
  async uploadAsset(
    prototypeId: string,
    file: File,
    uploadedBy: string,
    options: UploadOptions = {}
  ): Promise<PrototypeAsset | null> {
    // Validate file
    const validation = this.validateFile(file, options);
    if (!validation.valid) {
      console.error('[AssetManagement] Validation failed:', validation.error);
      return null;
    }

    const assetType = this.detectAssetType(file.type);
    if (!assetType) {
      console.error('[AssetManagement] Unsupported file type:', file.type);
      return null;
    }

    // In production, this would upload to cloud storage
    const url = await this.simulateUpload(file);
    const thumbnailUrl = options.generateThumbnail 
      ? await this.generateThumbnail(file, assetType)
      : undefined;

    const asset: PrototypeAsset = {
      id: `asset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      prototypeId,
      type: assetType,
      name: file.name,
      url,
      thumbnailUrl,
      mimeType: file.type,
      size: file.size,
      version: 1,
      uploadedBy,
      uploadedAt: new Date().toISOString(),
      metadata: await this.extractMetadata(file, assetType)
    };

    // Store asset
    const prototypeAssets = this.assets.get(prototypeId) || [];
    prototypeAssets.push(asset);
    this.assets.set(prototypeId, prototypeAssets);

    // Initialize version history
    this.versions.set(asset.id, [{
      version: 1,
      url: asset.url,
      uploadedAt: asset.uploadedAt,
      uploadedBy: asset.uploadedBy
    }]);

    console.log('[AssetManagement] Asset uploaded:', asset.id);
    return asset;
  }

  /**
   * Get all assets for a prototype
   */
  getAssets(prototypeId: string): PrototypeAsset[] {
    return this.assets.get(prototypeId) || [];
  }

  /**
   * Get a specific asset by ID
   */
  getAsset(assetId: string): PrototypeAsset | null {
    for (const assets of this.assets.values()) {
      const found = assets.find(a => a.id === assetId);
      if (found) return found;
    }
    return null;
  }

  /**
   * Update an existing asset (new version)
   */
  async updateAsset(
    assetId: string,
    file: File,
    uploadedBy: string,
    notes?: string
  ): Promise<PrototypeAsset | null> {
    const asset = this.getAsset(assetId);
    if (!asset) {
      console.error('[AssetManagement] Asset not found:', assetId);
      return null;
    }

    const url = await this.simulateUpload(file);
    const newVersion = asset.version + 1;

    // Update asset
    asset.url = url;
    asset.version = newVersion;
    asset.size = file.size;
    asset.uploadedAt = new Date().toISOString();
    asset.uploadedBy = uploadedBy;

    // Add to version history
    const versions = this.versions.get(assetId) || [];
    versions.push({
      version: newVersion,
      url,
      uploadedAt: asset.uploadedAt,
      uploadedBy,
      notes
    });
    this.versions.set(assetId, versions);

    console.log('[AssetManagement] Asset updated:', assetId, 'v' + newVersion);
    return asset;
  }

  /**
   * Delete an asset
   */
  async deleteAsset(assetId: string): Promise<boolean> {
    for (const [prototypeId, assets] of this.assets.entries()) {
      const index = assets.findIndex(a => a.id === assetId);
      if (index !== -1) {
        assets.splice(index, 1);
        this.assets.set(prototypeId, assets);
        this.versions.delete(assetId);
        console.log('[AssetManagement] Asset deleted:', assetId);
        return true;
      }
    }
    return false;
  }

  /**
   * Get version history for an asset
   */
  getVersionHistory(assetId: string): AssetVersion[] {
    return this.versions.get(assetId) || [];
  }

  /**
   * Restore a previous version
   */
  async restoreVersion(assetId: string, version: number): Promise<boolean> {
    const asset = this.getAsset(assetId);
    const versions = this.versions.get(assetId);
    
    if (!asset || !versions) return false;

    const targetVersion = versions.find(v => v.version === version);
    if (!targetVersion) return false;

    asset.url = targetVersion.url;
    asset.version = version;
    
    console.log('[AssetManagement] Restored version:', version);
    return true;
  }

  /**
   * Get assets by type
   */
  getAssetsByType(prototypeId: string, type: AssetType): PrototypeAsset[] {
    return this.getAssets(prototypeId).filter(a => a.type === type);
  }

  /**
   * Calculate total storage used by a prototype
   */
  getStorageUsed(prototypeId: string): number {
    return this.getAssets(prototypeId).reduce((sum, a) => sum + a.size, 0);
  }

  // ============================================================================
  // PRIVATE HELPERS
  // ============================================================================

  private validateFile(file: File, options: UploadOptions): { valid: boolean; error?: string } {
    const maxSize = options.maxSize || MAX_FILE_SIZE;
    
    if (file.size > maxSize) {
      return { valid: false, error: `File too large. Max size: ${maxSize / 1024 / 1024}MB` };
    }

    if (options.allowedTypes) {
      const assetType = this.detectAssetType(file.type);
      if (!assetType || !options.allowedTypes.includes(assetType)) {
        return { valid: false, error: `File type not allowed: ${file.type}` };
      }
    }

    return { valid: true };
  }

  private detectAssetType(mimeType: string): AssetType | null {
    for (const [type, mimes] of Object.entries(ALLOWED_MIME_TYPES)) {
      if (mimes.includes(mimeType)) {
        return type as AssetType;
      }
    }
    return null;
  }

  private async simulateUpload(file: File): Promise<string> {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 100));
    // In production, return actual cloud storage URL
    return `https://storage.wembleywonders.org/assets/${file.name}`;
  }

  private async generateThumbnail(file: File, type: AssetType): Promise<string | undefined> {
    if (type !== 'image' && type !== 'video') return undefined;
    // In production, generate actual thumbnail
    return `https://storage.wembleywonders.org/thumbnails/${file.name}`;
  }

  private async extractMetadata(file: File, type: AssetType): Promise<AssetMetadata> {
    const metadata: AssetMetadata = { tags: [] };
    
    // In production, extract actual metadata
    if (type === 'image') {
      metadata.format = file.type.split('/')[1];
    }
    
    return metadata;
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const assetManagementService = new AssetManagementService();
export default assetManagementService;
