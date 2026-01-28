import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import FileLoader from './components/FileLoader';
import MapVisualizer from './components/MapVisualizer';
import SolutionDisplay from './components/SolutionDisplay';
import ControlPanel from './components/ControlPanel';
import OptimizationChart from './components/OptimizationChart';

import { calculateTotalDistance, shuffleArray } from './utils/tspUtils';

const App = () => {
  const [points, setPoints] = useState([]);
  const [bestPath, setBestPath] = useState([]);
  const [bestDistance, setBestDistance] = useState(0);
  const [bestIteration, setBestIteration] = useState(0);
  const sleepTime = 1;
  const [iterations, setIterations] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [showSolutionLines, setShowSolutionLines] = useState(false);

  const intervalRef = useRef(null);

  const handleDataLoaded = (newPoints) => {
    setPoints(newPoints);
    
    const initialPath = shuffleArray(newPoints);
    const initialDist = calculateTotalDistance(initialPath);
    
    setBestPath(initialPath);
    setBestDistance(initialDist);
    
    setIterations(0);
    setChartData([{ iteration: 0, distance: initialDist }]);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setShowSolutionLines(false);
  };

  useEffect(() => {
    if (isRunning && points.length > 0) {
      intervalRef.current = setInterval(() => {
        setIterations(prevIter => {
          const currentIter = prevIter + 1;
          const candidatePath = shuffleArray(points); 
          const candidateDist = calculateTotalDistance(candidatePath);
          setBestDistance(prevBestDist => {
            if (candidateDist < prevBestDist) {
                setBestPath(candidatePath);
                setBestIteration(currentIter);
                setChartData(prevData => [
                    ...prevData, 
                    { iteration: currentIter, distance: candidateDist }
                ]);
                return candidateDist;
            } else {
                setChartData(prevData => [
                    ...prevData, 
                    { iteration: currentIter, distance: prevBestDist }
                ]);
                return prevBestDist;
            }
          });
          return currentIter;
        });
      }, (sleepTime*1000)); 
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, points]);

  const toggleSearch = () => {
    if (points.length === 0) {
        alert("Najpierw wczytaj dane!");
        return;
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="app-container">
      <h1 className="title">Problem Komiwojażera</h1>
      
      <FileLoader onDataLoaded={handleDataLoaded} />

      <div className="flex-row">
        <div className="column">
          <MapVisualizer 
            points={points} 
            path={bestPath} 
            showSolution={showSolutionLines} 
            onToggleSolution={() => setShowSolutionLines(!showSolutionLines)} 
          />
        </div>

        <div className="column">
          <ControlPanel 
            isRunning={isRunning} 
            iterations={iterations} 
            onToggleSearch={toggleSearch} 
            sleep_time={sleepTime}
          />
          <SolutionDisplay path={bestPath} distance={bestDistance} iteration={bestIteration}/>
        </div>
      </div>

      <OptimizationChart data={chartData} />
    </div>
  );
};

export default App;