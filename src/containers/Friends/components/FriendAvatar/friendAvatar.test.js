import React from "react";
import { render } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import FriendAvatar from "./friendAvatar.component";

describe("FriendAvatar", () => {
  const { container } = render(
    <Router>
      <FriendAvatar pending={false}/>
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});