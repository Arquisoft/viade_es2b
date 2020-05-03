import React from "react";
import { render } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import FriendItem from "./friendItem.component";

describe("FriendItem", () => {
  const { container } = render(
    <Router>
      <FriendItem pending={false}/>
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});