import React, { useState } from 'react';
import { useParticipants } from '../../hooks/useParticipants';
import './participant.css';

const ParticipantTracker: React.FC = () => {
  const participantHook = useParticipants();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', game: '' });

  const stats = participantHook.getStats();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await participantHook.addParticipant(form);
      setForm({ name: '', email: '', game: '' });
      setShowForm(false);
    } catch (err) {
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const key = e.target.name;
    const val = e.target.value;
    setForm(prev => ({ ...prev, [key]: val }));
  };

  if (participantHook.loading) {
    return <div className="loading">Loading participants...</div>;
  }

  return (
    <div className="participant-tracker">
      <h1>Participant Tracker</h1>
      {participantHook.error && <div className="error-message">{participantHook.error}</div>}

      <div className="stats-grid-participant">
        <div className="stat-card-participant">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card-participant">
          <div className="stat-number">{stats.confirmed}</div>
          <div className="stat-label">Confirmed</div>
        </div>
        <div className="stat-card-participant">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card-participant">
          <div className="stat-number">{stats.declined}</div>
          <div className="stat-label">Declined</div>
        </div>
        <div className="stat-card-participant">
          <div className="stat-number">{stats.confirmationRate.toFixed(1)}%</div>
          <div className="stat-label">Confirmation Rate</div>
        </div>
      </div>

      <button className="add-participant-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Participant'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="participant-form">
          <h2>Add Participant</h2>
          <div className="form-grid">
            <div className="form-group-participant">
              <label>Name:</label>
              <input name="name" value={form.name} onChange={handleChange} className="form-input-participant" required />
            </div>
            <div className="form-group-participant">
              <label>Email:</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="form-input-participant" required />
            </div>
            <div className="form-group-participant">
              <label>Game:</label>
              <select name="game" value={form.game} onChange={handleChange} className="form-input-participant" required>
                <option value="">Select Game</option>
                <option>Chess</option>
                <option>Basketball</option>
                <option>Soccer</option>
                <option>Tennis</option>
                <option>Volleyball</option>
                <option>Table Tennis</option>
              </select>
            </div>
          </div>
          <button type="submit" className="submit-participant-btn">Add Participant</button>
        </form>
      )}

      <div className="participants-list">
        <div className="list-header">Participants ({participantHook.participants.length})</div>
        <div className="participants-container">
          {participantHook.participants.length === 0 ? (
            <div>No participants found. Add some participants to start.</div>
          ) : (
            participantHook.participants.map(p => (
              <div key={p.id} className="participant-item">
                <div>
                  <div className="participant-name">{p.name}</div>
                  <div className="participant-email">{p.email}</div>
                  <div className="participant-game">Game: {p.game}</div>
                </div>
                <div>
                  <span className={`status-badge status-${p.status}`}>{p.status}</span>
                  {p.status === 'pending' && (
                    <>
                      <button className="action-btn confirm-btn" onClick={() => participantHook.confirmParticipant(p.id)}>Confirm</button>
                      <button className="action-btn decline-btn" onClick={() => participantHook.declineParticipant(p.id)}>Decline</button>
                    </>
                  )}
                  <button className="action-btn remove-btn" onClick={() => participantHook.removeParticipant(p.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantTracker;
