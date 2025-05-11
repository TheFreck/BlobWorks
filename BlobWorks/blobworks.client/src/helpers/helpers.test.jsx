import React from "react";
import '@testing-library/jest-dom'
import helpers from "../helpers/helpers";

describe("When creating elements", () => {
    let elements = [];
    let qty = 2;
    let r = 10;
    beforeAll(() => {
        helpers.createElements(qty,r,els => {
            elements = els;
        })
    });

    it("Should create qty traders", () => {
        expect(elements.length).toBe(qty);
    });

    it("Should give it coordinates", () => {
        for(var el of elements){
            expect(el.pos[0]).not.toBeNull();
            expect(el.pos[0]).not.toBe(undefined);
            expect(el.pos[1]).not.toBeNull();
            expect(el.pos[1]).not.toBe(undefined);
        }
    });

    it("Should give it a velocity", () => {
        for(var el of elements){
            expect(el.vel[0]).not.toBeNull();
            expect(el.vel[0]).not.toBe(undefined);
            expect(el.vel[1]).not.toBeNull();
            expect(el.vel[1]).not.toBe(undefined);
        }
    })

    it("Should give it a type", () => {
        for(var el of elements){
            expect(el.type).not.toBeNull();
            expect(el.type).not.toBe(undefined);
        }
    });
    
    it("Should give it a letter", () => {
        for(var el of elements){
            expect(el.letter).not.toBeNull();
            expect(el.letter).not.toBe(undefined);
        }
    });
    
    
    it("Should give it an eId", () => {
        for(var el of elements){
            expect(el.eId).not.toBeNull();
            expect(el.eId).not.toBe(undefined);
        }
    });
    
    
    it("Should give it a radius", () => {
        for(var el of elements){
            expect(el.r).not.toBeNull();
            expect(el.r).not.toBe(undefined);
        }
    });

    it("Should give it a background color", () => {
        for(let el of elements){
            expect(el.color).not.toBeNull();
            expect(el.color).not.toBe(undefined);
        }
    });

    it("Should give it a border color", () => {
        for(let el of elements){
            expect(el.border).not.toBeNull();
            expect(el.border).not.toBe(undefined);
        }
    })
});

describe("When calculating element's movement without collisions", () => {
    let elements = [];
    beforeAll(() => {
        helpers.createElements(2,1,els => {
            elements = els;
        });
    });
    
    it("Should modify x and y positions", () => {
        helpers.calculateMovement(elements,cb => {
            for(let i=0; i<cb.length; i++){
                expect(cb[i].pos[0]).not.toBeNull();
                expect(cb[i].pos[0]).not.toBe(undefined);
                expect(cb[i].pos[0]).not.toBe(elements[i].pos[0]);
                expect(cb[i].pos[1]).not.toBeNull();
                expect(cb[i].pos[1]).not.toBe(undefined);
                expect(cb[i].pos[1]).not.toBe(elements[i].pos[1]);
            }
        });
    });

    it("Should modify x and y velocities", () => {
        helpers.calculateMovement(elements,cb => {
            for(let i=0; i<cb.length; i++){
                expect(cb[i].pos[0]).not.toBeNull();
                expect(cb[i].pos[0]).not.toBe(undefined);
                expect(cb[i].pos[0]).not.toBe(elements[i].pos[0]);
                expect(cb[i].pos[1]).not.toBeNull();
                expect(cb[i].pos[1]).not.toBe(undefined);
                expect(cb[i].pos[1]).not.toBe(elements[i].pos[1]);
            }
        });
    });
});

describe("When an element hits a wall", () => {
    let elements = [];
    beforeAll(() => {
        helpers.createElements(4,5,els => {
            elements = els;
        });
    });

    it("Should move away from the wall", () => {
        elements[0].pos = [100,50];
        elements[0].vel = [1,0];
        elements[1].pos = [50,100];
        elements[1].vel = [0,1];
        elements[2].pos = [0,50];
        elements[2].vel = [-1,0];
        elements[3].pos = [50,0];
        elements[3].vel = [0,-1];
        helpers.calculateMovement(elements,moved => {
            expect(moved[0].pos[0]).toBeLessThan(100);
            expect(moved[1].pos[1]).toBeLessThan(100);
            expect(moved[2].pos[0]).toBeGreaterThan(0);
            expect(moved[3].pos[1]).toBeGreaterThan(0);
        });
    });
});

describe("When two elements collide", () => {
    let elements = [];
    beforeAll(() => {
        helpers.createElements(16,5,els => {
            // north-south
            els[0].pos = [8,12];
            els[0].vel = [0,-1];
            els[1].pos = [12,7];
            els[1].vel = [0,1];
            els[2].pos = [32,7];
            els[2].vel = [0,1];
            els[3].pos = [28,12];
            els[3].vel = [0,-1];
            els[4].pos = [48,7];
            els[4].vel = [0,-1];
            els[5].pos = [52,12];
            els[5].vel = [0,1];
            els[6].pos = [72,12];
            els[6].vel = [0,1];
            els[7].pos = [68,7];
            els[7].vel = [0,-1];
            // east-west
            els[8].pos = [8,28];
            els[8].vel = [1,0];
            els[9].pos = [13,32];
            els[9].vel = [-1,0];
            els[10].pos = [33,32];
            els[10].vel = [1,0];
            els[11].pos = [28,28];
            els[11].vel = [-1,0];
            els[12].pos = [48,32];
            els[12].vel = [1,0];
            els[13].pos = [53,28];
            els[13].vel = [-1,0];
            els[14].pos = [73,28];
            els[14].vel = [1,0];
            els[15].pos = [68,32];
            els[15].vel = [-1,0];
            helpers.calculateMovement(els,moved => {
                elements = moved;
            });
        });
    });

    it("Should add the elements to the side of the collision", () => {
        // north-south
        expect(elements[0].south).toBe(elements[1].eId);
        expect(elements[1].north).toBe(elements[0].eId);
        expect(elements[2].north).toBe(elements[3].eId);
        expect(elements[3].south).toBe(elements[2].eId);
        expect(elements[4].north).toBe(elements[5].eId);
        expect(elements[5].south).toBe(elements[4].eId);
        expect(elements[6].south).toBe(elements[7].eId);
        expect(elements[7].north).toBe(elements[6].eId);
        // east-west
        expect(elements[8].east).toBe(elements[9].eId);
        expect(elements[9].west).toBe(elements[8].eId);
        expect(elements[10].west).toBe(elements[11].eId);
        expect(elements[11].east).toBe(elements[10].eId);
        expect(elements[12].west).toBe(elements[13].eId);
        expect(elements[13].east).toBe(elements[12].eId);
        expect(elements[14].east).toBe(elements[15].eId);
        expect(elements[15].west).toBe(elements[14].eId);
    });

    it("Should line up collided elements", () => {
        expect(elements[0].pos[0]).toBe(elements[1].pos[0]);
        expect(elements[2].pos[0]).toBe(elements[3].pos[0]);
        expect(elements[4].pos[0]).toBe(elements[5].pos[0]);
        expect(elements[6].pos[0]).toBe(elements[7].pos[0]);
        expect(elements[8].pos[1]).toBe(elements[9].pos[1]);
        expect(elements[10].pos[1]).toBe(elements[11].pos[1]);
        expect(elements[12].pos[1]).toBe(elements[13].pos[1]);
        expect(elements[14].pos[1]).toBe(elements[15].pos[1]);
    });

    it("Should synchromize velocity", () => {
        expect(elements[0].vel[0]).toBe(elements[1].vel[0]);
        expect(elements[0].vel[1]).toBe(elements[1].vel[1]);
        expect(elements[2].vel[0]).toBe(elements[3].vel[0]);
        expect(elements[2].vel[1]).toBe(elements[3].vel[1]);
        // yet to be implemented
    })
});