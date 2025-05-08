import React from "react";
import { screen,render } from "@testing-library/react";
import '@testing-library/jest-dom'
import Environment from "./environment";
import Context from "../../Context";

describe("When rendering an environment", () => {
    it("Should have test id of 'environment'", async () => {
        await render(
            <Context.Provider
                value={{elementsEnum: jest.fn()}}
            >
                <Environment />
            </Context.Provider>
        );
        let environment = await screen.findByTestId("environment");
        expect(environment).toBeInTheDocument();
    });
});