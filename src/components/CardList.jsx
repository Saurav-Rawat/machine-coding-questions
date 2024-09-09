import React from "react";
import "./CardList.css";
import { Card } from "./Card";
import { ShimmerCard } from "./ShimmerCard";

export const CardList = ({
  monsters,
  isShimmerUi = false,
  isLoading = false,
}) => {
  return (
    <div className="card-list">
      {monsters.map((monster, i) => (
        <Card monster={monster} key={`${monster.name}-${i}`} />
      ))}
      {isShimmerUi && isLoading && <ShimmerCard />}
    </div>
  );
};
