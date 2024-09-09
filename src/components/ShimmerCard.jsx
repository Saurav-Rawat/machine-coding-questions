import React from "react";
import "./ShimmerCard.css";

export const ShimmerCard = () => {
  return (
    <>
      {Array(7)
        .fill(0)
        .map((_ele, i) => {
          return (
            <div
              key={`shimmer-card-${i}`}
              className="shimmer-card-container"
            ></div>
          );
        })}
    </>
  );
};
