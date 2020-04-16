import React from 'react';
import { render, cleanup } from 'react-testing-library';
import ImageBackground from '../src/components/Utils/ImageBackground/image-background.component';

afterAll(cleanup);

const { container } = render(<ImageBackground />);

describe('ImageBackground', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
