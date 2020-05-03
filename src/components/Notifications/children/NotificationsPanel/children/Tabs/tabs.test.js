import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import { Tabs } from "./tabs.component";

describe("Tabs", () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <Tabs />
        </Router>
    );

    test("renders without crashing", () => {
        expect(container).toBeTruthy();
    });
});