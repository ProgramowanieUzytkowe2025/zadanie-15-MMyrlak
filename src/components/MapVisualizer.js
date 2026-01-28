import React from 'react';

const MapVisualizer = ({ points, path, showSolution, onToggleSolution }) => {
  if (!points || points.length === 0) return <div className="section">Brak danych do mapy.</div>;

  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  
  const padding = 50;
  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;
  const strokeW = width / 200;
  const radius = width / 150;

  return (
    <div className="section">
      <h3 className="section-header">Wizualizacja problemu</h3>
      <div className="map-container">
        <svg viewBox={`${minX - padding} ${minY - padding} ${width} ${height}`} style={{ width: '100%', height: '400px' }}>
          
          {showSolution && path.length > 0 && path.map((point, index) => {
            if (index === path.length - 1) return null;

            const nextPoint = path[index + 1];
            return (
              <line
                key={`line-${index}`}
                x1={point.x} y1={point.y}
                x2={nextPoint.x} y2={nextPoint.y}
                stroke="#007bff"
                strokeWidth={strokeW}
              />
            );
          })}

          {points.map((p) => (
            <circle
              key={p.id}
              cx={p.x} cy={p.y} r={radius}
              fill="#dc3545"
            >
              <title>ID: {p.id}</title>
            </circle>
          ))}
        </svg>
      </div>
      <div style={{ marginTop: '15px' }}>
        <button className="btn btn-secondary" onClick={onToggleSolution}>
          {showSolution ? "Ukryj rozwiązanie" : "Pokaż rozwiązanie"}
        </button>
      </div>
    </div>
  );
};

export default MapVisualizer;