import React from "react";
import '@testing-library/jest-dom'
import helpers from "../helpers/helpers";

describe("When creating elements", () => {
    it("Should give it coordinates", () => {
        let qty = 2;
        helpers.createElements(qty,1, els => {
            expect(els.length).toBe(qty);
            for(var el in els){
                expect(el.x).not.toBeNull();
                expect(el.y).not.toBeNull();
            }
        });
    });
});