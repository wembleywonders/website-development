/**
 * WorkspaceFilters - Filter panel component for workspace
 * @module features/workspace/views/components/WorkspaceFilters
 */

import React, { useState } from 'react';
import { X, Calendar, Tag, Filter } from 'lucide-react';
import styles from './WorkspaceFilters.module.scss';

// Local Project types (define here to avoid missing external module)
type ProjectStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';
type ProjectType =
  | 'personal'
  | 'team'
  | 'client'
  | 'research'
  | 'creative'
  | 'development'
  | 'marketing'
  | 'content'
  | 'event'
  | 'template';

import type { WorkspaceStats } from '../../types';

interface FilterState {
  status: ProjectStatus[];
  type: ProjectType[];
  tags: string[];
  dateRange: { start: Date | null; end: Date | null };
  searchQuery: string;
}

interface WorkspaceFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClose: () => void;
  onClear: () => void;
  stats?: WorkspaceStats | null;
}

const WorkspaceFilters: React.FC<WorkspaceFiltersProps> = ({
  filters,
  onFiltersChange,
  onClose,
  onClear,
  stats
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const statusOptions: Array<{ value: ProjectStatus; label: string; count?: number }> = [
    { value: 'draft', label: 'Draft', count: stats?.draftProjects },
    { value: 'active', label: 'Active', count: 0 },
    { value: 'paused', label: 'Paused', count: 0 },
    { value: 'completed', label: 'Completed', count: stats?.publishedProjects },
    { value: 'archived', label: 'Archived', count: stats?.archivedProjects }
  ];

  const typeOptions: Array<{ value: ProjectType; label: string }> = [
    { value: 'personal', label: 'Personal' },
    { value: 'team', label: 'Team' },
    { value: 'client', label: 'Client' },
    { value: 'research', label: 'Research' },
    { value: 'creative', label: 'Creative' },
    { value: 'development', label: 'Development' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'content', label: 'Content' },
    { value: 'event', label: 'Event' },
    { value: 'template', label: 'Template' }
  ];

  const handleStatusToggle = (status: ProjectStatus) => {
    const newStatuses = localFilters.status.includes(status)
      ? localFilters.status.filter(s => s !== status)
      : [...localFilters.status, status];
    
    setLocalFilters({ ...localFilters, status: newStatuses });
  };

  const handleTypeToggle = (type: ProjectType) => {
    const newTypes = localFilters.type.includes(type)
      ? localFilters.type.filter(t => t !== type)
      : [...localFilters.type, type];
    
    setLocalFilters({ ...localFilters, type: newTypes });
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const date = value ? new Date(value) : null;
    setLocalFilters({
      ...localFilters,
      dateRange: {
        ...localFilters.dateRange,
        [field]: date
      }
    });
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    const emptyFilters: FilterState = {
      status: [],
      type: [],
      tags: [],
      dateRange: { start: null, end: null },
      searchQuery: ''
    };
    setLocalFilters(emptyFilters);
    onClear();
  };

  const activeFilterCount = 
    localFilters.status.length + 
    localFilters.type.length + 
    localFilters.tags.length +
    (localFilters.dateRange.start ? 1 : 0) +
    (localFilters.dateRange.end ? 1 : 0);

  return (
    <div className={styles.filtersPanel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>
          <Filter size={20} />
          <h3>Filters</h3>
          {activeFilterCount > 0 && (
            <span className={styles.count}>{activeFilterCount}</span>
          )}
        </div>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close filters"
        >
          <X size={20} />
        </button>
      </div>

      {/* Filter Sections */}
      <div className={styles.content}>
        {/* Status Filter */}
        <div className={styles.filterSection}>
          <h4 className={styles.sectionTitle}>Status</h4>
          <div className={styles.filterOptions}>
            {statusOptions.map(option => (
              <label key={option.value} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={localFilters.status.includes(option.value)}
                  onChange={() => handleStatusToggle(option.value)}
                />
                <span className={styles.labelText}>
                  {option.label}
                  {option.count !== undefined && (
                    <span className={styles.countBadge}>{option.count}</span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className={styles.filterSection}>
          <h4 className={styles.sectionTitle}>Type</h4>
          <div className={styles.filterOptions}>
            {typeOptions.map(option => (
              <label key={option.value} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={localFilters.type.includes(option.value)}
                  onChange={() => handleTypeToggle(option.value)}
                />
                <span className={styles.labelText}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div className={styles.filterSection}>
          <h4 className={styles.sectionTitle}>
            <Calendar size={16} />
            Date Range
          </h4>
          <div className={styles.dateInputs}>
            <div className={styles.dateField}>
              <label htmlFor="start-date">From</label>
              <input
                id="start-date"
                type="date"
                value={localFilters.dateRange.start?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateChange('start', e.target.value)}
              />
            </div>
            <div className={styles.dateField}>
              <label htmlFor="end-date">To</label>
              <input
                id="end-date"
                type="date"
                value={localFilters.dateRange.end?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateChange('end', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button 
          className={styles.clearButton}
          onClick={handleReset}
        >
          Clear All
        </button>
        <button 
          className={styles.applyButton}
          onClick={handleApply}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default WorkspaceFilters;