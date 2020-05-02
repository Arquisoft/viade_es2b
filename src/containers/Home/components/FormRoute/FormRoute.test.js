import React from "react";
import { render } from "react-testing-library";
import FormRoute from "./FormRoute";

describe("RouteForm", () => {
  const { container, getByTestId } = render(
    <FormRoute>
    </FormRoute>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders Form bootstrap properly", () => {
    expect(getByTestId("form")).toBeTruthy();
  });

  test("renders BootStrap form group properly", () => {
    expect(getByTestId("formNameRoute")).toBeTruthy();
  });

  test("renders BootStrap label properly", () => {
    expect(getByTestId("formNameRouteLabel")).toBeTruthy();
  });

  test("renders BootStrap control properly", () => {
    expect(getByTestId("formNameRouteControl")).toBeTruthy();
  });

});
