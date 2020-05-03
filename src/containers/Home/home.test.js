import React from "react";
import { render, cleanup } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { HomeComponent } from "./home.container";
// import { Trans, useTranslation } from "react-i18next";

library.add(fas);

const props = {
  webId: "https://exmaple.com/#me"
};

describe.only("Home", () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <Router>
      <HomeComponent {...{ ...props }} />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders with styled components", () => {
    expect(getByTestId("home-wrapper")).toBeTruthy();
    expect(document.querySelector(".card")).toBeTruthy();
  });
});
