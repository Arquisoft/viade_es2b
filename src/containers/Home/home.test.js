import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from './home.container';

library.add(fas);

const props = {
  webId: 'https://exmaple.com/#me',
  image: 'test.png',
  updatePhoto: 'updated.png',
  name: 'example'
};

describe.only('Home', () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <Router>
      <HomeComponent {...{ ...props }} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('renders with styled components', () => {
    expect(getByTestId('home-wrapper')).toBeTruthy();
    expect(document.querySelector('.card')).toBeTruthy();
  });
});
