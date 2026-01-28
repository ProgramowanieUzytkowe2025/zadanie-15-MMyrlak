import React from 'react';

const ControlPanel = ({ isRunning, iterations, onToggleSearch, sleep_time }) => {
  return (
    <div className="section">
      <h3 className="section-header">Sterowanie</h3>
      <div className="control-group">
        <button 
          className={`btn ${isRunning ? 'btn-danger' : 'btn-primary'}`} 
          onClick={onToggleSearch}
        >
          {isRunning ? "Przerwa" : "Szukaj rozwiązania"}
        </button>
        <div className="stats-text">
          Iteracje: {iterations}
        </div>
      </div>
      <p className="helper-text">Algorytm Monte Carlo (co {sleep_time} sekund).</p>
    </div>
  );
};

export default ControlPanel;