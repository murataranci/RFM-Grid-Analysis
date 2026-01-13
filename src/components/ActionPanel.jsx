import React, { useState } from 'react';
import { submitSelectedIds } from '../utils/api';
import './ActionPanel.css';

const ActionPanel = ({ selectedIds, totalFiltered, onClearSelection }) => {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  
  const handleSubmit = async () => {
    if (!selectedIds.length) return;
    
    setSubmitting(true);
    setStatus(null);
    
    try {
      const result = await submitSelectedIds(selectedIds);
      setStatus({
        type: 'success',
        message: result.message
      });
      
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'ID\'ler gönderilemedi'
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  const selectedCount = selectedIds.length;
  const hasSelection = selectedCount > 0;
  
  return (
    <div className="action-panel">
      <div className="selection-info">
        <div className="info-item">
          <span className="info-label">Seçili:</span>
          <span className="info-value">{selectedCount}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Filtrelenen:</span>
          <span className="info-value">{totalFiltered}</span>
        </div>
      </div>
      
      <div className="action-buttons">
        <button
          className="clear-btn"
          onClick={onClearSelection}
          disabled={!hasSelection}
        >
          Seçimi Temizle
        </button>
        
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!hasSelection || submitting}
        >
          {submitting ? 'Gönderiliyor...' : `${selectedCount} ID Gönder`}
        </button>
      </div>
      
      {status && (
        <div className={`submit-status ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default ActionPanel;
