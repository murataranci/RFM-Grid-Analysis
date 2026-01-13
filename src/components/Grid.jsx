import React from 'react';
import GridCell from './GridCell';
import './Grid.css';

const Grid = ({ gridData, filteredIds, selectedIds, onToggleSelect }) => {
  const renderGrid = () => {
    const rows = [];
    
    for (let y = 5; y >= 1; y--) {
      const cells = [];
      
      for (let x = 1; x <= 5; x++) {
        const cellKey = `${x}-${y}`;
        const allItems = gridData[cellKey] || [];
        
        const visibleItems = allItems.filter(item => {
          return filteredIds.includes(item.id);
        });
        
        const cell = (
          <GridCell
            key={cellKey}
            x={x}
            y={y}
            items={visibleItems}
            selectedIds={selectedIds}
            onToggleSelect={onToggleSelect}
          />
        );
        cells.push(cell);
      }
      
      const row = <div key={y} className="grid-row">{cells}</div>;
      rows.push(row);
    }
    
    return rows;
  };
  
  return (
    <div className="grid-container">
      <div className="axis-label y-axis-label">
        <span>Monetary Score</span>
        <div className="axis-values">
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
        </div>
      </div>
      
      <div className="grid-wrapper">
        <div className="grid">
          {renderGrid()}
        </div>
        
        <div className="axis-label x-axis-label">
          <div className="axis-values">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <span>Frequency Score</span>
        </div>
      </div>
    </div>
  );
};

export default Grid;
