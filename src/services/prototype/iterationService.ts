/**
 * Iteration Service
 * Wembley Wonders CIC
 * 
 * Manages prototype versions and iteration history.
 * Tracks changes, enables rollback, and maintains audit trail.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Iteration {
  id: string;
  prototypeId: string;
  version: string;
  title: string;
  description: string;
  changes: IterationChange[];
  createdBy: string;
  createdAt: string;
  status: 'draft' | 'active' | 'archived';
  snapshot: PrototypeSnapshot;
  tags: string[];
}

export interface IterationChange {
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changeType: 'add' | 'modify' | 'remove';
}

export interface PrototypeSnapshot {
  name: string;
  description: string;
  category: string;
  tags: string[];
  assets: string[];
  metadata: Record<string, unknown>;
}

export interface VersionInfo {
  major: number;
  minor: number;
  patch: number;
}

// ============================================================================
// SERVICE CLASS
// ============================================================================

class IterationService {
  private iterations: Map<string, Iteration[]> = new Map();
  private activeVersions: Map<string, string> = new Map();

  /**
   * Create initial iteration for a new prototype
   */
  initializeIteration(
    prototypeId: string,
    creatorId: string,
    snapshot: PrototypeSnapshot
  ): Iteration {
    const iteration: Iteration = {
      id: `iter-${Date.now()}`,
      prototypeId,
      version: '1.0.0',
      title: 'Initial Version',
      description: 'First version of the prototype',
      changes: [{
        field: 'prototype',
        oldValue: null,
        newValue: snapshot,
        changeType: 'add'
      }],
      createdBy: creatorId,
      createdAt: new Date().toISOString(),
      status: 'active',
      snapshot,
      tags: ['initial']
    };

    this.iterations.set(prototypeId, [iteration]);
    this.activeVersions.set(prototypeId, iteration.version);

    console.log('[Iteration] Initialized:', prototypeId, 'v1.0.0');
    return iteration;
  }

  /**
   * Create a new iteration
   */
  createIteration(
    prototypeId: string,
    title: string,
    description: string,
    changes: IterationChange[],
    snapshot: PrototypeSnapshot,
    createdBy: string,
    bumpType: 'major' | 'minor' | 'patch' = 'patch'
  ): Iteration | null {
    const prototypeIterations = this.iterations.get(prototypeId);
    if (!prototypeIterations || prototypeIterations.length === 0) {
      console.error('[Iteration] Prototype not initialized:', prototypeId);
      return null;
    }

    const currentVersion = this.activeVersions.get(prototypeId) || '1.0.0';
    const newVersion = this.bumpVersion(currentVersion, bumpType);

    // Archive current active version
    const currentActive = prototypeIterations.find(i => i.status === 'active');
    if (currentActive) {
      currentActive.status = 'archived';
    }

    const iteration: Iteration = {
      id: `iter-${Date.now()}`,
      prototypeId,
      version: newVersion,
      title,
      description,
      changes,
      createdBy,
      createdAt: new Date().toISOString(),
      status: 'active',
      snapshot,
      tags: []
    };

    prototypeIterations.push(iteration);
    this.activeVersions.set(prototypeId, newVersion);

    console.log('[Iteration] Created:', prototypeId, newVersion);
    return iteration;
  }

  /**
   * Get all iterations for a prototype
   */
  getIterations(prototypeId: string): Iteration[] {
    return this.iterations.get(prototypeId) || [];
  }

  /**
   * Get a specific iteration
   */
  getIteration(prototypeId: string, version: string): Iteration | null {
    const iterations = this.iterations.get(prototypeId);
    if (!iterations) return null;
    return iterations.find(i => i.version === version) || null;
  }

  /**
   * Get active iteration
   */
  getActiveIteration(prototypeId: string): Iteration | null {
    const iterations = this.iterations.get(prototypeId);
    if (!iterations) return null;
    return iterations.find(i => i.status === 'active') || null;
  }

  /**
   * Get current version
   */
  getCurrentVersion(prototypeId: string): string {
    return this.activeVersions.get(prototypeId) || '1.0.0';
  }

  /**
   * Rollback to a previous version
   */
  rollbackTo(prototypeId: string, version: string, rolledBackBy: string): boolean {
    const iterations = this.iterations.get(prototypeId);
    if (!iterations) return false;

    const targetIteration = iterations.find(i => i.version === version);
    if (!targetIteration) {
      console.error('[Iteration] Version not found:', version);
      return false;
    }

    // Archive current active
    const currentActive = iterations.find(i => i.status === 'active');
    if (currentActive) {
      currentActive.status = 'archived';
    }

    // Create rollback iteration
    const currentVersion = this.activeVersions.get(prototypeId) || '1.0.0';
    const newVersion = this.bumpVersion(currentVersion, 'patch');

    const rollbackIteration: Iteration = {
      id: `iter-${Date.now()}`,
      prototypeId,
      version: newVersion,
      title: `Rollback to v${version}`,
      description: `Rolled back from v${currentVersion} to v${version}`,
      changes: [{
        field: 'version',
        oldValue: currentVersion,
        newValue: version,
        changeType: 'modify'
      }],
      createdBy: rolledBackBy,
      createdAt: new Date().toISOString(),
      status: 'active',
      snapshot: targetIteration.snapshot,
      tags: ['rollback']
    };

    iterations.push(rollbackIteration);
    this.activeVersions.set(prototypeId, newVersion);

    console.log('[Iteration] Rolled back to:', version);
    return true;
  }

  /**
   * Compare two iterations
   */
  compareIterations(
    prototypeId: string,
    version1: string,
    version2: string
  ): IterationChange[] {
    const iter1 = this.getIteration(prototypeId, version1);
    const iter2 = this.getIteration(prototypeId, version2);

    if (!iter1 || !iter2) return [];

    const changes: IterationChange[] = [];
    const snapshot1 = iter1.snapshot;
    const snapshot2 = iter2.snapshot;

    // Compare fields
    for (const key of Object.keys(snapshot2) as (keyof PrototypeSnapshot)[]) {
      const oldVal = snapshot1[key];
      const newVal = snapshot2[key];
      
      if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
        changes.push({
          field: key,
          oldValue: oldVal,
          newValue: newVal,
          changeType: oldVal === undefined ? 'add' : newVal === undefined ? 'remove' : 'modify'
        });
      }
    }

    return changes;
  }

  /**
   * Tag an iteration
   */
  tagIteration(prototypeId: string, version: string, tag: string): boolean {
    const iteration = this.getIteration(prototypeId, version);
    if (!iteration) return false;

    if (!iteration.tags.includes(tag)) {
      iteration.tags.push(tag);
    }

    return true;
  }

  /**
   * Get iterations by tag
   */
  getIterationsByTag(prototypeId: string, tag: string): Iteration[] {
    const iterations = this.iterations.get(prototypeId) || [];
    return iterations.filter(i => i.tags.includes(tag));
  }

  /**
   * Get iteration timeline
   */
  getTimeline(prototypeId: string): { version: string; date: string; title: string }[] {
    const iterations = this.iterations.get(prototypeId) || [];
    return iterations
      .map(i => ({
        version: i.version,
        date: i.createdAt,
        title: i.title
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  // ============================================================================
  // PRIVATE HELPERS
  // ============================================================================

  private parseVersion(version: string): VersionInfo {
    const [major, minor, patch] = version.split('.').map(Number);
    return { major: major || 1, minor: minor || 0, patch: patch || 0 };
  }

  private bumpVersion(version: string, type: 'major' | 'minor' | 'patch'): string {
    const v = this.parseVersion(version);
    
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

export const iterationService = new IterationService();
export default iterationService;
