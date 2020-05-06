import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import RouteForm from "./FormEditRoute";
import { SnackbarProvider } from "notistack";

describe("FormEditRoute", () => {
    afterAll(cleanup);

    const { container } = render(
        <SnackbarProvider>
            <Router>
                <RouteForm route={[]}/>
            </Router>
        </SnackbarProvider>
    );

    test("renders without crashing", () => {
        expect(container).toBeTruthy();
    });
});