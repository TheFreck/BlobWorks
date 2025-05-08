import React from "react";
import { screen,render } from "@testing-library/react";
import '@testing-library/jest-dom'
import Element from "./element/element";

describe("When rendering an element", () => {
    it("Should have test id of 'element'", async () => {
        await render(<Element />);
        let element = await screen.findByTestId("element");
        expect(element).toBeInTheDocument();
    });
});