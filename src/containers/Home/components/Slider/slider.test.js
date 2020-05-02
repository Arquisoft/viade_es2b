import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import Slider from "./slider.component.js";

describe("Slider", () => {
  afterAll(cleanup);
  global.URL.createObjectURL = jest.fn();

  const { container } = render(
    <Router>
      <Slider imgs={[new Blob(["src/docs/images/010_QualityTree.png"]), {"type": "image/jpg"}]}/>
    </Router>
  );

  test("App renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders with styled components", () => {
    expect(document.querySelector(".slider-wrapper")).toBeTruthy();
    expect(document.querySelector(".image-list")).toBeTruthy();
    expect(document.querySelector(".image-container")).toBeTruthy();
    expect(document.querySelector(".image-wrapper")).toBeTruthy();
    expect(document.querySelector(".modal")).toBe(null);
  })
});