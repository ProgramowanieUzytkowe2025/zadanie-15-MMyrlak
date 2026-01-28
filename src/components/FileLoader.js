import React from 'react';
import { parseTSPFile } from '../utils/tspUtils';

const FileLoader = ({ onDataLoaded }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const points = parseTSPFile(event.target.result);
      if (points.length > 0) {
        onDataLoaded(points);
      } else {
        alert("Błąd formatu pliku lub brak danych.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="section">
      <h3 className="section-header">1. Wczytaj dane</h3>
      <div className="file-input-wrapper">
        <input type="file" accept=".txt,.tsp" onChange={handleFileUpload} />
      </div>
      <p className="helper-text">Format: ID X Y</p>
    </div>
  );
};

export default FileLoader;