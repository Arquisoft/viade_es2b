import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import Map from '../src/Map';

describe('Map', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <Map />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});