import React from "react";
import { screen,render } from "@testing-library/react";
import '@testing-library/jest-dom'
import Element from "./element";
import Context from "../../Context";

describe("When rendering an element", () => {
    it("Should have test id of 'element'", async () => {
        await render(<Context.Provider
                        value={{elementsEnum: jest.fn()}}
                    >
                        <Element 
                            type={{
                                eId: 1,
                                xPos: 1,
                                yPos: 1,
                                r: 1,
                                border: "red",
                                color: "yellow"
                            }}
                        />
                    </Context.Provider>);
        let element = await screen.findByTestId("element");
        expect(element).toBeInTheDocument();
    });
});