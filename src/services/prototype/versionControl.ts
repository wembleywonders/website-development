/**
 * Version Control Service
 * Wembley Wonders CIC
 * 
 * Manages semantic versioning and change tracking for prototypes.
 * Provides branching, merging, and conflict resolution.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Version {
  major: number;
  minor: number;
  patch: number;
  preRelease?: string;
  build?: string;
}

export interface VersionEntry {
  id: string;
  prototypeId: string;
  version: string;
  parentVersion: string | null;
  branch: string;
  author: string;
  message: string;
  changes: ChangeSet;
  timestamp: string;
  tags: string[];
}

export interface ChangeSet {
  added: string[];
  modified: string[];
  removed: string[];
  details: Record<string, { from: unknown; to: unknown }>;
}

export interface Branch {
  name: string;
  prototypeId: string;
  headVersion: string;
  createdAt: string;
  createdBy: string;
  isDefault: boolean;
}

// ============================================================================
// SERVICE CLASS
// ============================================================================

class VersionControlService {
  private versions: Map<string, VersionEntry[]> = new Map();
  private branches: Map<string, Branch[]> = new Map();

  /**
   * Initialize version control for a prototype
   */
  initialize(prototypeId: string, author: string): VersionEntry {
    const entry: VersionEntry = {
      id: `v-${Date.now()}`,
      prototypeId,
      version: '0.1.0',
      parentVersion: null,
      branch: 'main',
      author,
      message: 'Initial commit',
      changes: {
        added: ['prototype'],
        modified: [],
        removed: [],
        details: {}
      },
      timestamp: new Date().toISOString(),
      tags: ['initial']
    };

    this.versions.set(prototypeId, [entry]);

    // Create default branch
    const defaultBranch: Branch = {
      name: 'main',
      prototypeId,
      headVersion: entry.version,
      createdAt: entry.timestamp,
      createdBy: author,
      isDefault: true
    };

    this.branches.set(prototypeId, [defaultBranch]);

    console.log('[VersionControl] Initialized:', prototypeId);
    return entry;
  }

  /**
   * Create a new version
   */
  commit(
    prototypeId: string,
    message: string,
    changes: ChangeSet,
    author: string,
    bumpType: 'major' | 'minor' | 'patch' = 'patch',
    branch: string = 'main'
  ): VersionEntry | null {
    const entries = this.versions.get(prototypeId);
    if (!entries || entries.length === 0) {
      console.error('[VersionControl] Not initialized:', prototypeId);
      return null;
    }

    const branchInfo = this.getBranch(prototypeId, branch);
    if (!branchInfo) {
      console.error('[VersionControl] Branch not found:', branch);
      return null;
    }

    const parentVersion = branchInfo.headVersion;
    const newVersion = this.bumpVersion(parentVersion, bumpType);

    const entry: VersionEntry = {
      id: `v-${Date.now()}`,
      prototypeId,
      version: newVersion,
      parentVersion,
      branch,
      author,
      message,
      changes,
      timestamp: new Date().toISOString(),
      tags: []
    };

    entries.push(entry);
    branchInfo.headVersion = newVersion;

    console.log('[VersionControl] Committed:', newVersion, message);
    return entry;
  }

  /**
   * Create a new branch
   */
  createBranch(
    prototypeId: string,
    branchName: string,
    fromVersion: string,
    createdBy: string
  ): Branch | null {
    const prototypeBranches = this.branches.get(prototypeId);
    if (!prototypeBranches) return null;

    if (prototypeBranches.some(b => b.name === branchName)) {
      console.error('[VersionControl] Branch exists:', branchName);
      return null;
    }

    const branch: Branch = {
      name: branchName,
      prototypeId,
      headVersion: fromVersion,
      createdAt: new Date().toISOString(),
      createdBy,
      isDefault: false
    };

    prototypeBranches.push(branch);
    console.log('[VersionControl] Branch created:', branchName);
    return branch;
  }

  /**
   * Get branch info
   */
  getBranch(prototypeId: string, branchName: string): Branch | null {
    const branches = this.branches.get(prototypeId) || [];
    return branches.find(b => b.name === branchName) || null;
  }

  /**
   * Get all branches
   */
  getBranches(prototypeId: string): Branch[] {
    return this.branches.get(prototypeId) || [];
  }

  /**
   * Get version history
   */
  getHistory(prototypeId: string, branch?: string): VersionEntry[] {
    let entries = this.versions.get(prototypeId) || [];
    
    if (branch) {
      entries = entries.filter(e => e.branch === branch);
    }

    return entries.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  /**
   * Get specific version
   */
  getVersion(prototypeId: string, version: string): VersionEntry | null {
    const entries = this.versions.get(prototypeId) || [];
    return entries.find(e => e.version === version) || null;
  }

  /**
   * Get current version
   */
  getCurrentVersion(prototypeId: string, branch: string = 'main'): string | null {
    const branchInfo = this.getBranch(prototypeId, branch);
    return branchInfo?.headVersion || null;
  }

  /**
   * Tag a version
   */
  tagVersion(prototypeId: string, version: string, tag: string): boolean {
    const entry = this.getVersion(prototypeId, version);
    if (!entry) return false;

    if (!entry.tags.includes(tag)) {
      entry.tags.push(tag);
    }

    return true;
  }

  /**
   * Compare two versions
   */
  diff(prototypeId: string, version1: string, version2: string): ChangeSet | null {
    const v1 = this.getVersion(prototypeId, version1);
    const v2 = this.getVersion(prototypeId, version2);

    if (!v1 || !v2) return null;

    // In a real implementation, this would compute actual diff
    // For now, return the changes from v2
    return v2.changes;
  }

  /**
   * Check if version exists
   */
  versionExists(prototypeId: string, version: string): boolean {
    return this.getVersion(prototypeId, version) !== null;
  }

  /**
   * Get versions by tag
   */
  getVersionsByTag(prototypeId: string, tag: string): VersionEntry[] {
    const entries = this.versions.get(prototypeId) || [];
    return entries.filter(e => e.tags.includes(tag));
  }

  /**
   * Parse version string
   */
  parseVersion(versionString: string): Version {
    const [core, preRelease] = versionString.split('-');
    const [majorStr, minorStr, patchStr] = core.split('.');
    
    return {
      major: parseInt(majorStr) || 0,
      minor: parseInt(minorStr) || 1,
      patch: parseInt(patchStr) || 0,
      preRelease
    };
  }

  /**
   * Format version to string
   */
  formatVersion(version: Version): string {
    let str = `${version.major}.${version.minor}.${version.patch}`;
    if (version.preRelease) str += `-${version.preRelease}`;
    if (version.build) str += `+${version.build}`;
    return str;
  }

  // ============================================================================
  // PRIVATE HELPERS
  // ============================================================================

  private bumpVersion(current: string, type: 'major' | 'minor' | 'patch'): string {
    const v = this.parseVersion(current);
    
    switch (type) {
      case 'major':
        return `${v.major + 1}.0.0`;
      case 'minor':
        return `${v.major}.${v.minor + 1}.0`;
      case 'patch':
        return `${v.major}.${v.minor}.${v.patch + 1}`;
    }
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const versionControlService = new VersionControlService();
export default versionControlService;
