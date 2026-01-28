import React from 'react';

const SolutionDisplay = ({ path, distance,iteration }) => {
  if (!path || path.length === 0) return <div className="section">Oczekiwanie na dane...</div>;

  const pathString = path.map(p => p.id).join(" -> ");

  return (
    <div className="section">
      <h3 className="section-header">Rozwiązanie (iteracja: {iteration})</h3>
      <div className="path-box">
        <strong>Trasa:</strong> {pathString}
      </div>
      <div className="stats-text">
        Długość trasy: {distance.toFixed(2)}
      </div>
    </div>
  );
};

export default SolutionDisplay;