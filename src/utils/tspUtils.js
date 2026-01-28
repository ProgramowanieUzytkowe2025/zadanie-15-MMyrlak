export const calculateDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const calculateTotalDistance = (points) => {
  let sum = 0;
  for (let i = 0; i < points.length - 1; i++) {
    sum += calculateDistance(points[i], points[i + 1]);
  }
  return sum;
};

export const shuffleArray = (array) => {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const parseTSPFile = (text) => {
    const lines = text.split('\n');
    const parsedPoints = [];
    for (let line of lines) {
      line = line.trim();
      if (line === "NODE_COORD_SECTION") continue;
      if (line === "EOF") break;
      if (line.match(/^[0-9]/)) {
          const parts = line.replace(/\s+/g, ' ').trim().split(' ');
          if (parts.length >= 3) {
              parsedPoints.push({ id: parts[0], x: parseFloat(parts[1]), y: parseFloat(parts[2]) });
          }
      }
    }
    return parsedPoints;
};