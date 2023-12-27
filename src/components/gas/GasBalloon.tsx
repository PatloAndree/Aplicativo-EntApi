import React from 'react';

interface GasBalloonProps {
  percentage: number;
}

const GasBalloon: React.FC<GasBalloonProps> = ({ percentage }) => {
  const fillColor = `hsl(120, ${percentage}%, 50%)`;

  return (
    <svg width="200" height="300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" fill="#008CBA" /> {/* Balloon body */}
      <circle cx="100" cy="200" r="60" fill={fillColor} /> {/* Changing interior */}
      <line x1="100" y1="260" x2="100" y2="300" stroke="black" strokeWidth="5" /> {/* Rope */}
    </svg>
  );
};

export default GasBalloon;