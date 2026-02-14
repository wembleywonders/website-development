/**
 * Prototype Asset Types
 * Wembley Wonders CIC
 * 
 * Types for all files, media, and documentation attached to prototypes.
 * Covers everything from photos and CAD files to schematics and patterns.
 */

// ============================================================================
// ASSET TYPES
// ============================================================================

export type AssetType =
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'cad-file'
  | 'schematic'
  | 'code'
  | 'pattern'
  | 'other';

export interface PrototypeAsset {
  id: string;
  type: AssetType;
  filename: string;
  originalName: string;
  url: string;
  thumbnailUrl?: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  description?: string;
  iterationId?: string;
  tags?: string[];
}

/**
 * Mime type mappings for asset classification.
 * Used by AssetManagementService.classifyAssetType()
 */
export const ASSET_MIME_MAP: Record<string, AssetType> = {
  // Images
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/gif': 'image',
  'image/webp': 'image',
  'image/svg+xml': 'image',
  // Video
  'video/mp4': 'video',
  'video/quicktime': 'video',
  'video/x-msvideo': 'video',
  'video/webm': 'video',
  // Audio
  'audio/mpeg': 'audio',
  'audio/wav': 'audio',
  'audio/ogg': 'audio',
  // Documents
  'application/pdf': 'document',
  'application/msword': 'document',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'document',
  'text/plain': 'document',
  'text/markdown': 'document',
  // Code
  'text/x-python': 'code',
  'text/javascript': 'code',
  'text/typescript': 'code',
  'text/x-c++src': 'code',
  'text/x-arduino': 'code',
};

/**
 * Extension-based fallback for classification
 * when mime type is unreliable (common with CAD/schematic files)
 */
export const ASSET_EXTENSION_MAP: Record<string, AssetType> = {
  // CAD files
  stl: 'cad-file',
  obj: 'cad-file',
  step: 'cad-file',
  stp: 'cad-file',
  iges: 'cad-file',
  igs: 'cad-file',
  f3d: 'cad-file',
  fcstd: 'cad-file',
  blend: 'cad-file',
  // Schematics
  kicad_sch: 'schematic',
  kicad_pcb: 'schematic',
  sch: 'schematic',
  brd: 'schematic',
  pcb: 'schematic',
  gbr: 'schematic',
  // Patterns (fashion-tech / Silk Stilettos)
  svg: 'pattern',
  dxf: 'pattern',
  ai: 'pattern',
  // Code
  ino: 'code',
  py: 'code',
  js: 'code',
  ts: 'code',
  tsx: 'code',
  jsx: 'code',
  cpp: 'code',
  h: 'code',
  c: 'code',
};

// ============================================================================
// DOCUMENTATION TYPES
// ============================================================================

export type DocumentationType =
  | 'overview'
  | 'technical-spec'
  | 'user-guide'
  | 'assembly-instructions'
  | 'safety-notes'
  | 'bill-of-materials'
  | 'testing-results'
  | 'ip-disclosure';

export type DocumentFormat = 'markdown' | 'html' | 'pdf';

export interface Documentation {
  id: string;
  prototypeId: string;
  type: DocumentationType;
  title: string;
  content: string;
  format: DocumentFormat;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastEditedBy?: string;
}

// ============================================================================
// UPLOAD AND STORAGE
// ============================================================================

export interface AssetUploadRequest {
  file: File;
  type: AssetType;
  description?: string;
  iterationId?: string;
  uploadedBy: string;
  tags?: string[];
}

export interface AssetUploadResponse {
  asset: PrototypeAsset;
  uploadUrl: string;
  status: 'success' | 'processing' | 'failed';
  message?: string;
}

/**
 * Storage limits per prototype.
 * Community prototypes get more generous limits.
 */
export interface StorageQuota {
  used: number;         // bytes
  limit: number;        // bytes
  assetCount: number;
  maxAssets: number;
}

export const DEFAULT_STORAGE_LIMITS = {
  individual: {
    maxBytes: 500 * 1024 * 1024,   // 500MB
    maxAssets: 50,
  },
  community: {
    maxBytes: 2 * 1024 * 1024 * 1024, // 2GB
    maxAssets: 200,
  },
} as const;

/**
 * Maximum file sizes by type (bytes)
 */
export const MAX_FILE_SIZES: Record<AssetType, number> = {
  'image': 20 * 1024 * 1024,       // 20MB
  'video': 500 * 1024 * 1024,      // 500MB
  'audio': 100 * 1024 * 1024,      // 100MB
  'document': 50 * 1024 * 1024,    // 50MB
  'cad-file': 100 * 1024 * 1024,   // 100MB
  'schematic': 50 * 1024 * 1024,   // 50MB
  'code': 10 * 1024 * 1024,        // 10MB
  'pattern': 50 * 1024 * 1024,     // 50MB
  'other': 50 * 1024 * 1024,       // 50MB
};