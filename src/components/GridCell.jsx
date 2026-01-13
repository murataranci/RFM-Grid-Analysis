import React, { useState } from 'react';
import './GridCell.css';

const GridCell = ({ x, y, items, selectedIds, onToggleSelect }) => {
  const [expanded, setExpanded] = useState(false);
  
  const allSelected = items.length > 0 && items.every(item => {
    return selectedIds.includes(item.id);
  });
  
  const handleCellClick = () => {
    if (items.length > 0) {
      setExpanded(!expanded);
    }
  };
  
  const handleSelectAll = (e) => {
    e.stopPropagation();
    items.forEach(item => {
      if (!selectedIds.includes(item.id)) {
        onToggleSelect(item.id);
      }
    });
  };
  
  const handleDeselectAll = (e) => {
    e.stopPropagation();
    items.forEach(item => {
      if (selectedIds.includes(item.id)) {
        onToggleSelect(item.id);
      }
    });
  };
  
  const cellClass = `grid-cell ${items.length > 0 ? 'has-items' : ''} ${expanded ? 'expanded' : ''}`;
  
  return (
    <div className={cellClass} onClick={handleCellClick}>
      <div className="cell-header">
        <span className="cell-count">{items.length}</span>
        {items.length > 0 && (
          <div className="cell-actions">
            {!allSelected ? (
              <button 
                className="select-all-btn"
                onClick={handleSelectAll}
                title="Tümünü seç"
              >
                ✓
              </button>
            ) : (
              <button 
                className="deselect-all-btn"
                onClick={handleDeselectAll}
                title="Seçimi kaldır"
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>
      
      {expanded && items.length > 0 && (
        <div className="cell-items">
          {items.map(item => {
            const isSelected = selectedIds.includes(item.id);
            
            return (
              <div 
                key={item.id} 
                className={`cell-item ${isSelected ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSelect(item.id);
                }}
              >
                <span className="item-id">#{item.id}</span>
                <div className="item-details">
                  <small>R: {item.recency}</small>
                  <small>F: {item.frequency}</small>
                  <small>M: ${item.monetary}</small>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GridCell;
