import React from "react";
import { render, cleanup } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { HomeComponent } from "./home.container";
import { SnackbarProvider } from "notistack";

library.add(fas);

const props = {
  webId: "https://exmaple.com/#me"
};

describe.only("Home", () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <SnackbarProvider>
      <Router>
        <HomeComponent {...{ ...props }} />
      </Router>
    </SnackbarProvider>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders with styled components", () => {
    expect(getByTestId("home-wrapper")).toBeTruthy();
    expect(document.querySelector(".card")).toBeTruthy();
  });
});
