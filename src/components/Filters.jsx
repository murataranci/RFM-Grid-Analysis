import React from 'react';
import './Filters.css';

const Filters = ({ filters, onFilterChange, dataRanges }) => {
  const handleChange = (metric, type, value) => {
    const newFilters = {
      ...filters,
      [metric]: {
        ...filters[metric],
        [type]: Number(value)
      }
    };
    onFilterChange(newFilters);
  };
  
  const handleReset = () => {
    const defaultFilters = {
      recency: { min: dataRanges.recency.min, max: dataRanges.recency.max },
      frequency: { min: dataRanges.frequency.min, max: dataRanges.frequency.max },
      monetary: { min: dataRanges.monetary.min, max: dataRanges.monetary.max }
    };
    onFilterChange(defaultFilters);
  };
  
  return (
    <div className="filters-container">
      <div className="filters-header">
        <h2>🔍 Filtreler</h2>
        <button className="reset-btn" onClick={handleReset}>
          Sıfırla
        </button>
      </div>
      
      <div className="filter-groups">
        <div className="filter-group">
          <label className="filter-label">
            <span className="filter-icon">📅</span>
            Recency (days)
          </label>
          <div className="filter-inputs">
            <input
              type="number"
              value={filters.recency.min}
              min={dataRanges.recency.min}
              max={dataRanges.recency.max}
              onChange={(e) => handleChange('recency', 'min', e.target.value)}
              placeholder="Min"
            />
            <span className="filter-separator">—</span>
            <input
              type="number"
              value={filters.recency.max}
              min={dataRanges.recency.min}
              max={dataRanges.recency.max}
              onChange={(e) => handleChange('recency', 'max', e.target.value)}
              placeholder="Max"
            />
          </div>
          <div className="filter-info">
            Range: {dataRanges.recency.min} - {dataRanges.recency.max}
          </div>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">
            <span className="filter-icon">🔄</span>
            Frequency (count)
          </label>
          <div className="filter-inputs">
            <input
              type="number"
              value={filters.frequency.min}
              min={dataRanges.frequency.min}
              max={dataRanges.frequency.max}
              onChange={(e) => handleChange('frequency', 'min', e.target.value)}
              placeholder="Min"
            />
            <span className="filter-separator">—</span>
            <input
              type="number"
              value={filters.frequency.max}
              min={dataRanges.frequency.min}
              max={dataRanges.frequency.max}
              onChange={(e) => handleChange('frequency', 'max', e.target.value)}
              placeholder="Max"
            />
          </div>
          <div className="filter-info">
            Range: {dataRanges.frequency.min} - {dataRanges.frequency.max}
          </div>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">
            <span className="filter-icon">💰</span>
            Monetary (value)
          </label>
          <div className="filter-inputs">
            <input
              type="number"
              value={filters.monetary.min}
              min={dataRanges.monetary.min}
              max={dataRanges.monetary.max}
              onChange={(e) => handleChange('monetary', 'min', e.target.value)}
              placeholder="Min"
            />
            <span className="filter-separator">—</span>
            <input
              type="number"
              value={filters.monetary.max}
              min={dataRanges.monetary.min}
              max={dataRanges.monetary.max}
              onChange={(e) => handleChange('monetary', 'max', e.target.value)}
              placeholder="Max"
            />
          </div>
          <div className="filter-info">
            Range: ${dataRanges.monetary.min} - ${dataRanges.monetary.max}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
