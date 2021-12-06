import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/home/Home";
import Results from "./components/results/Results";

const Root = () => {
    return (
        
        <Routes>
        <Route path="/solar" element={  <Home/>} />
           
        <Route path="/results" element={ <Results/>} />
            
        </Routes>
  )
}


const  App: FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </div>
  );
}

export default App;
