import React from "react";
import { render, cleanup } from "react-testing-library";
import App from "./App";

test("Test temporal", () => {
  expect(true);
});

it("App renders without crashing", () => {
  afterAll(cleanup);
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
