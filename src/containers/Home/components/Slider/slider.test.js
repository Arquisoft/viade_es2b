import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import SliderWrapper from "./slider.component.js";

describe("Slider", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <SliderWrapper />
    </Router>
  );

  test("App renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});