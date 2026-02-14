// src/types/gallery.types.ts

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  title: string;
  description?: string;
  url?: string;
  thumbnailUrl?: string;
  creator?: string;
  creatorId?: string;
  programme?: string;
  tags?: string[];
  createdAt: Date;
  isPublic: boolean;
}

export interface GalleryFilter {
  type?: MediaItem['type'];
  programme?: string;
  creator?: string;
  tags?: string[];
}
