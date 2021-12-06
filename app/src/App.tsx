import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/home/Home";

const Root = () => {
    return (
        
        <Routes>
          <Route path="/" element={  <Home/>} />
        </Routes>
  )
}


const  App: FC = () => {
  return (
    <div className="App">
      <BrowserRouter basename="solar/">
        <Root />
      </BrowserRouter>
    </div>
  );
}

export default App;
