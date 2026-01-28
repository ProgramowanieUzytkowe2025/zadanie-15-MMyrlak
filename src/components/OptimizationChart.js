import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OptimizationChart = ({ data }) => {
  return (
    <div className="section">
      <h3 className="section-header">Jakość rozwiązania w czasie</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="iteration" 
              type="number"               
              allowDecimals={false}       
              domain={['dataMin', 'dataMax']}
              label={{ value: 'Iteracje', position: 'insideBottomRight', offset: -5 }} 
            />
            <YAxis label={{ value: 'Długość', angle: -90, position: 'insideLeft' }} domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="distance" stroke="#8884d8" name="Długość trasy" dot={false} isAnimationActive={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OptimizationChart;