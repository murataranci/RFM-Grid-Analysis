import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Filters from './components/Filters';
import ActionPanel from './components/ActionPanel';
import { loadRFMData } from './utils/api';
import { calculateRFMScores, groupByGridPosition, filterByRFM } from './utils/rfmCalculator';
import './App.css';

function App() {
  const [rawData, setRawData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [gridData, setGridData] = useState({});
  const [filteredIds, setFilteredIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [dataRanges, setDataRanges] = useState({
    recency: { min: 0, max: 120 },
    frequency: { min: 0, max: 110 },
    monetary: { min: 0, max: 11000 }
  });
  const [filters, setFilters] = useState({
    recency: { min: 0, max: 120 },
    frequency: { min: 0, max: 110 },
    monetary: { min: 0, max: 11000 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await loadRFMData();
        
        const recencyVals = data.map(d => d.recency);
        const frequencyVals = data.map(d => d.frequency);
        const monetaryVals = data.map(d => d.monetary);
        
        const ranges = {
          recency: {
            min: Math.min(...recencyVals),
            max: Math.max(...recencyVals)
          },
          frequency: {
            min: Math.min(...frequencyVals),
            max: Math.max(...frequencyVals)
          },
          monetary: {
            min: Math.min(...monetaryVals),
            max: Math.max(...monetaryVals)
          }
        };
        
        setDataRanges(ranges);
        setFilters(ranges);
        
        const scoredData = calculateRFMScores(data);
        setRawData(data);
        setProcessedData(scoredData);
        
        const grouped = groupByGridPosition(scoredData);
        setGridData(grouped);
        
        const allIds = scoredData.map(item => item.id);
        setFilteredIds(allIds);
        
        setLoading(false);
      } catch (err) {
        setError("Veri yüklenemedi. data.json dosyasını kontrol edin.");
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  useEffect(() => {
    if (!processedData.length) return;
    
    const filteredData = filterByRFM(processedData, filters);
    const ids = filteredData.map(item => item.id);
    setFilteredIds(ids);
    
    setSelectedIds(prevSelected => {
      return prevSelected.filter(id => ids.includes(id));
    });
  }, [filters, processedData]);
  
  const handleToggleSelect = (id) => {
    setSelectedIds(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter(itemId => itemId !== id);
      }
      return [...prev, id];
    });
  };
  
  const handleClearSelection = () => {
    setSelectedIds([]);
  };
  
  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>RFM verisi yükleniyor...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="app-error">
        <h2>Hata</h2>
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 RFM Grid Analysis</h1>
        <p>Recency | Frequency | Monetary</p>
      </header>
      
      <div className="app-content">
        <aside className="sidebar">
          <Filters
            filters={filters}
            onFilterChange={setFilters}
            dataRanges={dataRanges}
          />
          
          <ActionPanel
            selectedIds={selectedIds}
            totalFiltered={filteredIds.length}
            onClearSelection={handleClearSelection}
          />
        </aside>
        
        <main className="main-content">
          <Grid
            gridData={gridData}
            filteredIds={filteredIds}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
          />
          
          <div className="grid-legend">
            <h3>Gösterge</h3>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-color empty"></span>
                <span>Öğe yok</span>
              </div>
              <div className="legend-item">
                <span className="legend-color has-items"></span>
                <span>Öğe var (genişletmek için tıkla)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color selected"></span>
                <span>Seçili öğe</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

