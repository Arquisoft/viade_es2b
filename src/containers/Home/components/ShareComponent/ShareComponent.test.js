import React from "react";
import { render, fireEvent, cleanup, getByTestId, getByText } from "react-testing-library";
import ShareComponent from "./ShareComponent";
import Route from "../../../../Route"

describe.only('FormRoute', () => {
    afterAll(cleanup);
    const testRoute = new Route("test_ID", "Test route", "Test description", "Test gpx", ["img1", "img2"]);
    const { container } = render(
        <ShareComponent route={testRoute}>
        </ShareComponent>
    );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test('Testing share button of ShareComponent', () => {
    const button = getByTestId(container, "buttonShare");

    fireEvent.click(button);
});

test('Testing list of ShareComponent', () => {
    const listFriends = getByText(container, "share.placeholder");

    fireEvent.click(listFriends);

    expect(listFriends).not.toBe(null);
});

test('render of styled component', () => {
    const shareWrapper = getByTestId(container, 'shareWrapper');
    expect(shareWrapper).not.toBe(null);
});


});
