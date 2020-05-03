import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import Modal from "./Modal.component";

describe("Slider", () => {
  afterAll(cleanup);

  const { container, getByTestId } = render(
    <Router>
      <Modal show={true} />
    </Router>
  );

  test("App renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders with styled components", () => {
    expect(document.querySelector(".modal-container")).toBeTruthy();
    expect(document.querySelector(".modal-wrapper")).toBeTruthy();
  });

  const { container2 } = render(
    <Router>
      <Modal show={false} />
    </Router>
  );

  test("App does not render if show is false", () => {
    expect(container2).toBe(undefined);
  });

});