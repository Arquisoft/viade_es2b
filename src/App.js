import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';

import gestorPODS from './persistanceManagement';
import parser from './parserGPX';
import 'leaflet/dist/leaflet.css';

const RouteForm = React.lazy(() => import('./FormRoute'));

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
        <button onClick={() => gestorPODS.showPerson()}>Show person (Console)</button>
        <button onClick={() => gestorPODS.saveRoute()}>Save test route (Console)</button>
        <button onClick={() => gestorPODS.deleteRoutes()}>Delete all user routes</button>
        <button onClick={() => gestorPODS.seeRoutes()}>See routes (Console)</button>
        <button onClick={() => gestorPODS.test()}>TEST (Console)</button>
        <button onClick={async () => parser.parse(Array.from(await gestorPODS.seeRoutes())[0].gpx)}>Ver ruta</button>
        <button onClick={async () => parser.parse(Array.from(await gestorPODS.seeRoutes())[1].gpx)}>Ver ruta 2</button>
      </header>
      <div>
        <Suspense fallback={<div>Loading form...</div>}>
          <RouteForm></RouteForm>
        </Suspense>
      </div>
      <div id = "map">
      </div>
    </div>
  );
}

export default App;
