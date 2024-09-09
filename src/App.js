import { Routes, Route } from "react-router-dom";

import { SideBar } from "./components/SideBar";
import React from "react";
import { InfiniteScroll } from "./InfiniteScroll";
import { ShimmerUi } from "./ShimmerUi";
import { Accordion } from "./Accordion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SideBar />}>
        <Route index element={<InfiniteScroll />} />
        <Route path="/shimmer" element={<ShimmerUi />} />
        <Route path="/accordion" element={<Accordion />} />
      </Route>
    </Routes>
  );
}

export default App;
