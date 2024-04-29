import React from "react";

const CircleProgressBar = ({ percentage }) => {
  // Calculate the stroke-dasharray value based on the percentage
  const strokeDasharray = `${percentage}, 100`;

  return (
    <div className="circle-container">
      <svg className="circle-svg" viewBox="0 0 100 100">
        <circle
          className="circle-progress"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#00FF00" // Green color for progress
          strokeWidth="10"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
        />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default CircleProgressBar;
