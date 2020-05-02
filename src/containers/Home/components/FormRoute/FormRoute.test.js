import React from "react";
import { render, fireEvent, cleanup, getByTestId } from "react-testing-library";
import FormRoute from "./FormRoute";

describe.only('FormRoute', () => {
    afterAll(cleanup);
    const { container } = render(
        <FormRoute>
        </FormRoute>
    );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test('Testing new route form', () => {
    const inputName = getByTestId(container, "formNameRouteControl");
    const inputDescription = getByTestId(container, 'formDescriptionRouteControl');
    const switchPriv = getByTestId(container, 'formSwitchRouteControl');
    const inputGpx = getByTestId(container, 'formRouteGpx');
    const inputImg = getByTestId(container, 'formRouteImages');
    const buttonSave = getByTestId(container, 'formSendButton');

    fireEvent.change(inputName, {target: {value: "Test"}});
    fireEvent.change(inputDescription, {target: {value: "Description tests"}});
    fireEvent.change(switchPriv, {target: {checked: true}});

    expect(inputName.value).toEqual("Test");
    expect(inputDescription.value).toEqual("Description tests");
    expect(switchPriv.checked).toEqual(true);

    const image = new File(["Soy una imagen :D"], "image.png", {
        type: "image/png"
    });

    const gpx = new File(["Y yo una ruta"], "ruta.gpx", {
        type: "application/gpx+xml"
    });

    Object.defineProperty(inputImg, "files", {
        value: [image]
    });
    fireEvent.change(inputImg);

    Object.defineProperty(inputGpx, "files", {
        value: [gpx]
    });
    fireEvent.change(inputGpx);

    fireEvent.click(buttonSave);
});


});
