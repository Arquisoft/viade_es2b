import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import RouteList from "./RouteList";


test("Arreglo momentaneo", () => {
    expect(true);
  });

describe("RoutesList", () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <RouteList />
        </Router>
    );

    test("renders without crashing", () => {
        expect(container).toBeTruthy();
    });
});