import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className='App'>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/object-detection">Object Detection</Link>
            </li>
          </ul>
        </nav>
        <div className='App-body'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/object-detection" element={<ObjectDetection/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="Home">
        <header className="Home-header">
            <h1>
                React ML Test App
            </h1>
            <p>
                This is a React ML test app, a front-end connecting to various machine learning models and other data analysis backends that are expose through a REST API.
            </p>
        </header>
    </div>
  );
}

function ObjectDetection() {
  return (
    <div className="ObjectDetection">
      <header className="ObjectDetection-header">
          <h1>
              Object Detection
          </h1>
          <p>
              Detect stuff
          </p>
      </header>
    </div>
  );
}