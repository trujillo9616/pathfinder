import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import PathfinderVisualizer from "./components/PathfinderVisualizer/PathfinderVisualizer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <PathfinderVisualizer />
    </div>
  );
};

export default App;
