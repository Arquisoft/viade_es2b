import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import RouteList from "./RouteList";
import { SnackbarProvider } from "notistack";

describe("RoutesList", () => {
    afterAll(cleanup);

    const { container } = render(
        <SnackbarProvider>
            <Router>
                <RouteList {... {friendsList:[]}} />
            </Router>
        </SnackbarProvider>
    );

    test("renders without crashing", () => {
        expect(container).toBeTruthy();
    });
});