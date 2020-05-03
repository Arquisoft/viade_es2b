import React from "react";
import { render } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import GroupFriendItem from "./groupfrienditem.component";

describe("GroupFriendItem", () => {
  const { container } = render(
    <Router>
      <GroupFriendItem group={[]} />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});