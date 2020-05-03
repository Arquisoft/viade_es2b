import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import RouteForm from "./FormEditRoute";

describe("FormEditRoute", () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <RouteForm route={[]}/>
        </Router>
    );

    test("renders without crashing", () => {
        expect(container).toBeTruthy();
    });
});