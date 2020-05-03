import React from "react";
import { render, cleanup } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import ShareComponent from "./ShareComponent";

describe.only("ShareComponent", () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <Router>
      <ShareComponent />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
