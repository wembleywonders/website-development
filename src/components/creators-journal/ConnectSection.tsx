import React, { useState, useEffect } from 'react';
import { Milestone } from '../../types/creators-journal';
import { workshopCatalog, Workshop } from '../../data/workshopCatalog';

interface AttendanceRecord {
  id: string;
  workshopId: string; // Reference to catalog workshop
  workshopTitle: string;
  dateAttended: string;
  location: string;
  facilitator: string;
  programmeTag: string;
  notes: string;
  createdAt: string;
}

const ConnectSection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string>('');
  const [isCustomWorkshop, setIsCustomWorkshop] = useState(false);
  const [formData, setFormData] = useState({
    workshopTitle: '',
    dateAttended: '',
    location: '',
    facilitator: '',
    programmeTag: '',
    notes: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('workshop_attendances');
    if (stored) {
      setAttendances(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever attendances change
  useEffect(() => {
    localStorage.setItem('workshop_attendances', JSON.stringify(attendances));
  }, [attendances]);

  // When workshop selected from dropdown, auto-fill details
  const handleWorkshopSelect = (workshopId: string) => {
    setSelectedWorkshopId(workshopId);
    
    if (workshopId === 'custom') {
      setIsCustomWorkshop(true);
      setFormData({
        workshopTitle: '',
        dateAttended: '',
        location: '',
        facilitator: '',
        programmeTag: '',
        notes: ''
      });
    } else {
      setIsCustomWorkshop(false);
      const workshop = workshopCatalog.find(w => w.id === workshopId);
      if (workshop) {
        setFormData({
          workshopTitle: workshop.title,
          dateAttended: workshop.date,
          location: workshop.location,
          facilitator: workshop.facilitator,
          programmeTag: workshop.programmeTag,
          notes: ''
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAttendance: AttendanceRecord = {
      id: Date.now().toString(),
      workshopId: isCustomWorkshop ? 'custom' : selectedWorkshopId,
      workshopTitle: formData.workshopTitle,
      dateAttended: formData.dateAttended,
      location: formData.location,
      facilitator: formData.facilitator,
      programmeTag: formData.programmeTag,
      notes: formData.notes,
      createdAt: new Date().toISOString()
    };

    setAttendances([newAttendance, ...attendances]);
    
    // Reset form
    setSelectedWorkshopId('');
    setIsCustomWorkshop(false);
    setFormData({ 
      workshopTitle: '', 
      dateAttended: '', 
      location: '',
      facilitator: '',
      programmeTag: '',
      notes: '' 
    });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this attendance record?')) {
      setAttendances(attendances.filter(a => a.id !== id));
    }
  };

  // Sort workshops by date (most recent first)
  const sortedWorkshops = [...workshopCatalog].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [milestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Attended first workshop',
      description: 'Participate in your first Wembley Wonders workshop',
      category: 'connect',
      completed: attendances.length >= 1,
    },
    {
      id: '2',
      title: 'Regular attendee',
      description: 'Attended 3 or more workshops',
      category: 'connect',
      completed: attendances.length >= 3,
    },
    {
      id: '3',
      title: 'Community connector',
      description: 'Attended 5 or more workshops',
      category: 'connect',
      completed: attendances.length >= 5,
    },
  ]);

  return (
    <div className="journal-section connect-section">
      <div className="section-header">
        <h2>🤝 Connect</h2>
        <p>Build relationships, join communities, and find your people</p>
      </div>

      {/* Instructions */}
      <div style={{
        background: 'rgba(6, 182, 212, 0.1)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '2rem'
      }}>
        <p style={{ margin: 0, color: '#06b6d4', fontWeight: 600 }}>
          📍 Start here: Select which workshop you attended from the list below
        </p>
      </div>

      {/* Log Attendance Button */}
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="add-project-btn"
        >
          {showForm ? '✕ Cancel' : '+ Log Workshop Attendance'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid rgba(148, 163, 184, 0.2)'
        }}>
          {/* Workshop Selection Dropdown */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#f8fafc', fontWeight: 600 }}>
              Select Workshop *
            </label>
            <select
              required
              value={selectedWorkshopId}
              onChange={(e) => handleWorkshopSelect(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '6px',
                color: '#f8fafc',
                fontSize: '1rem'
              }}
            >
              <option value="">-- Choose a workshop --</option>
              {sortedWorkshops.map(workshop => (
                <option key={workshop.id} value={workshop.id}>
                  {workshop.title} - {new Date(workshop.date).toLocaleDateString('en-GB')} ({workshop.programmeTag})
                </option>
              ))}
              <option value="custom">📝 Other workshop (not listed)</option>
            </select>
          </div>

          {/* Show remaining fields only after selection */}
          {(selectedWorkshopId || isCustomWorkshop) && (
            <>
              {/* Custom Workshop Title (only if "Other" selected) */}
              {isCustomWorkshop && (
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#f8fafc', fontWeight: 600 }}>
                    Workshop Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.workshopTitle}
                    onChange={(e) => setFormData({...formData, workshopTitle: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(30, 41, 59, 0.8)',
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      borderRadius: '6px',
                      color: '#f8fafc',
                      fontSize: '1rem'
                    }}
                    placeholder="e.g., Introduction to Python"
                  />
                </div>
              )}

              {/* Auto-filled details (read-only for catalog workshops, editable for custom) */}
              <div style={{ 
                background: 'rgba(6, 182, 212, 0.1)', 
                padding: '1rem', 
                borderRadius: '6px',
                marginBottom: '1rem'
              }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#06b6d4', fontSize: '0.9rem', fontWeight: 600 }}>
                  Workshop Details:
                </p>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                    <strong>Title:</strong> {formData.workshopTitle || 'Not selected'}
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                    <strong>Date:</strong> {formData.dateAttended ? new Date(formData.dateAttended).toLocaleDateString('en-GB') : 'Not selected'}
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                    <strong>Location:</strong> {formData.location || 'Not selected'}
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                    <strong>Facilitator:</strong> {formData.facilitator || 'Not selected'}
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                    <strong>Programme:</strong> {formData.programmeTag || 'Not selected'}
                  </div>
                </div>
              </div>

              {/* Custom workshop additional fields */}
              {isCustomWorkshop && (
                <>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#f8fafc', fontWeight: 600 }}>
                      Date Attended *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateAttended}
                      onChange={(e) => setFormData({...formData, dateAttended: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(30, 41, 59, 0.8)',
                        border: '1px solid rgba(148, 163, 184, 0.3)',
                        borderRadius: '6px',
                        color: '#f8fafc',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#f8fafc', fontWeight: 600 }}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(30, 41, 59, 0.8)',
                        border: '1px solid rgba(148, 163, 184, 0.3)',
                        borderRadius: '6px',
                        color: '#f8fafc',
                        fontSize: '1rem'
                      }}
                      placeholder="Where was this workshop?"
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#f8fafc', fontWeight: 600 }}>
                      Facilitator
                    </label>
                    <input
                      type="text"
                      value={formData.facilitator}
                      onChange={(e) => setFormData({...formData, facilitator: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(30, 41, 59, 0.8)',
                        border: '1px solid rgba(148, 163, 184, 0.3)',
                        borderRadius: '6px',
                        color: '#f8fafc',
                        fontSize: '1rem'
                      }}
                      placeholder="Who led this workshop?"
                    />
                  </div>
                </>
              )}

              {/* Notes field (always available) */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#f8fafc', fontWeight: 600 }}>
                  Notes / What you learned (optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '6px',
                    color: '#f8fafc',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  placeholder="What did you learn? Any key takeaways?"
                />
              </div>

              <button type="submit" className="add-project-btn">
                Save Attendance
              </button>
            </>
          )}
        </form>
      )}

      {/* Attendance List */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>My Workshop Attendance ({attendances.length})</h3>
        {attendances.length === 0 ? (
          <p className="placeholder-text">
            No workshops logged yet. Click "Log Workshop Attendance" above to record your first one.
          </p>
        ) : (
          <div className="milestone-list">
            {attendances.map((attendance) => (
              <div key={attendance.id} className="milestone-card" style={{ display: 'block' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ margin: 0, color: '#06b6d4' }}>{attendance.workshopTitle}</h4>
                    <span style={{ 
                      display: 'inline-block',
                      background: 'rgba(124, 58, 237, 0.2)',
                      color: '#a78bfa',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      marginTop: '0.25rem'
                    }}>
                      {attendance.programmeTag}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(attendance.id)}
                    style={{
                      background: 'rgba(220, 38, 38, 0.2)',
                      border: '1px solid rgba(220, 38, 38, 0.4)',
                      color: '#fca5a5',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
                <p style={{ margin: '0.5rem 0', color: '#94a3b8', fontSize: '0.9rem' }}>
                  📅 {new Date(attendance.dateAttended).toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                {attendance.location && (
                  <p style={{ margin: '0.25rem 0', color: '#94a3b8', fontSize: '0.85rem' }}>
                    📍 {attendance.location}
                  </p>
                )}
                {attendance.facilitator && (
                  <p style={{ margin: '0.25rem 0', color: '#94a3b8', fontSize: '0.85rem' }}>
                    👤 {attendance.facilitator}
                  </p>
                )}
                {attendance.notes && (
                  <p style={{ margin: '0.5rem 0 0 0', color: '#cbd5e1', fontSize: '0.95rem', fontStyle: 'italic' }}>
                    💭 {attendance.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Milestones */}
      <div className="milestones-grid">
        <h3>Connection Milestones</h3>
        <div className="milestone-list">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="milestone-card">
              <div className="milestone-checkbox">
                <input
                  type="checkbox"
                  checked={milestone.completed}
                  readOnly
                />
              </div>
              <div className="milestone-content">
                <h4>{milestone.title}</h4>
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectSection;