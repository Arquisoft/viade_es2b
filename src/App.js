import React from 'react';
import logo from './logo.svg';
import './App.css';

const gestorPODS = require('./persistanceManagement');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React. Developed using Docker.
        </a>
        <button onClick={() => gestorPODS.login()}>Login</button>
        <button onClick={() => gestorPODS.logout()}>Log Out</button>
        <button onClick= {() => gestorPODS.showPerson()}>Show person (Console)</button>
        <button onClick= {() => gestorPODS.saveRoute()}>Save test route (Console)</button>
        <button onClick= {() => gestorPODS.seeRoute()}>See test route (Console)</button>
        <button onClick= {() => gestorPODS.seeRoutes()}>See routes (Console)</button>
        <button onClick= {() => gestorPODS.test()}>TEST (Console)</button>
      </header>
    </div>
  );
}

export default App;
