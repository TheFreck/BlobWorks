

const elementsEnum = {
    organic: 0,
    inorganic: 1,
    glue: 2,
    unGlue: 3,
    water: 4,
    light: 5
};

export const createElements = (n, r, cb) => {
    let elements = [];
    for(var i=0; i<n; i++){
        let coords = getCoords(r);
        let eType = Math.random() > .2 ? 1 : 0;
        elements.push({
            type: eType,
            letter: eType === 0 ? "F" : "N",
            color: eType === 0 ? "green" : "gray",
            border: eType === 0 ? "yellow" : "black",
            eId: i,
            pos: coords,
            vel: [(Math.random()*2-1)*.1,(Math.random()*2-1)*.1],
            r: r,
            north: null,
            south: null,
            east: null,
            west: null
        });
    }
    cb(elements);
};

const ePositions = [];

const getCoords = (r) => {
    const coords = [null,null];
    do {
        coords[0] = Math.random() * (100 - 2 * r) + 2 * r;
        coords[1] = Math.random() * (100 - 2 * r) + 2 * r;
    }
    while (!validateCoordsAgainstElements(coords, r));
    ePositions.push(coords);
    return coords;
};

const validateCoordsAgainstElements = ([ x, y ], r) => {
    if (x < r || x > 100 - r || y < r || y > 100 - r) return false;
    for (let coord of ePositions) {
        let dist = Math.sqrt(Math.pow(x - coord[0], 2) + Math.pow(y - coord[1], 2));
        if (dist < 2 * r) return false;
    }
    return true;
}

export const calculateFrame = async (frame, elements, cb) => {
    let next = frame + 1;
    calculateMovement(elements, moved => {
        cb({
            data: { elements: moved },
            frame: next
        });
    })
}

export const calculateMovement = (elements, cb) => {
    let els = [];
    checkCollisions(elements, cb => {
        for (let i = 0; i < cb.length; i++) {
            let [xPos,yPos] = checkWalls(cb[i].pos,cb[i].r);
            els.push({
                type: cb[i].type,
                letter: cb[i].letter,
                color: cb[i].color,
                border: cb[i].border,
                eId: cb[i].eId,
                pos: [
                    cb[i].vel[0]+cb[i].pos[0]+xPos,
                    cb[i].vel[1]+cb[i].pos[1]+yPos
                ],
                vel: [
                    Math.random()*2-1,
                    Math.random()*2-1
                ],
                r: cb[i].r,
                north: cb[i].north,
                south: cb[i].south,
                east: cb[i].east,
                west: cb[i].west
            });
        }
    });
    cb(els);
}

export const checkWalls = (pos,r) => {
    let outcome = [0,0];
        if(pos[0] + r >= 100) {
            outcome[0] = -r/2;
        }
        if(pos[0] - r <= 0){
            outcome[0] = r/2;
        } 
        if(pos[1] + r >= 100){
            outcome[1] = -r/2;
        } 
        if(pos[1] - r <= 0){
            outcome[1] = r/2;
        } 
    return outcome;
}

const checkCollisions = (elements, cb) => {
    let r = elements[0].r;
    for (let i = 0; i < elements.length; i++) {
        for (let j = i + 1; j < elements.length; j++) {
            if(Math.abs(elements[i].pos[0] - elements[j].pos[0]) <= 2*r &&
                Math.abs(elements[i].pos[1] - elements[j].pos[1]) <= 2*r
            ){
                let mTop = elements[i].pos[1]-elements[j].pos[1];
                let mBot = elements[i].pos[0]-elements[j].pos[0];
                if(mTop > 0){
                    if(mTop/mBot > 1 || mTop/mBot < -1){
                        elements[i].south = elements[j].eId;
                        elements[j].north = elements[i].eId;
                        let adjustment = (elements[j].pos[0]-elements[i].pos[0])/2;
                        elements[i].pos[0] += adjustment;
                        elements[j].pos[0] -= adjustment;
                    }
                    else 
                    if(mTop/mBot < 1 && mTop/mBot > -1){
                        elements[i].west = elements[j].eId;
                        elements[j].east = elements[i].eId;
                        let adjustment = (elements[j].pos[1]-elements[i].pos[1])/2;
                        elements[i].pos[1] += adjustment;
                        elements[j].pos[1] -= adjustment;
                    }
                }
                else {
                    if(mTop/mBot > 1 || mTop/mBot < -1){
                        elements[i].north = elements[j].eId;
                        elements[j].south = elements[i].eId;
                        let adjustment = (elements[j].pos[0]-elements[i].pos[0])/2;
                        elements[i].pos[0] += adjustment;
                        elements[j].pos[0] -= adjustment;
                    }
                    else 
                    if(mTop/mBot < 1 && mTop/mBot > -1){
                        elements[i].east = elements[j].eId;
                        elements[j].west = elements[i].eId;
                        let adjustment = (elements[j].pos[1]-elements[i].pos[1])/2;
                        elements[i].pos[1] += adjustment;
                        elements[j].pos[1] -= adjustment;
                    }
                }
            }
        }
    }
    cb(elements);
}

export default {
    createElements,
    calculateMovement
}