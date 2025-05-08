export const createElements = (n,r,cb) => {
    let elements = [];
    for(var i=0; i<n; i++){
        let coords = getCoords(r);
        elements.push({
            x: coords.x,
            y: coords.y
        });
    }
    cb(elements);
};

const ePositions = [];

const getCoords = (r) => {
    const coords = {x:null,y:null};
    do{
        coords.x = Math.random()*(100-2*r)+2*r;
        coords.y = Math.random()*(100-2*r)+2*r;
    }
    while(!validateCoordsAgainstElements(coords,r));
    ePositions.push(coords);
    return coords;
};

const validateCoordsAgainstElements = ({x,y},r) => {
    if(x<r || x>100-r || y<r || y>100-r) return false;
    for(let coord of ePositions){
        let dist = Math.sqrt(Math.pow(x-coord.x,2)+Math.pow(y-coord.y,2));
        if(dist < 2*r) return false;
    }
    return true;
}

export default {
    createElements
}