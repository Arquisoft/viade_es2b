import React from "react";
import { render } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import ModalGroupForm from "./ModalGroupForm.component";

describe("ModalGroupForm", () => {
  const { container } = render(
    <Router>
      <ModalGroupForm show={true}/>
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders with styled components", () => {
    expect(document.querySelector(".modal-container")).toBeTruthy();
    expect(document.querySelector(".modal-wrapper")).toBeTruthy();
  });
});