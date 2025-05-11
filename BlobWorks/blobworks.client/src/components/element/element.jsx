import React, { useContext, useEffect } from "react";
import Context from "../../Context";

export const Element = ({type}) => {
    useEffect(() => {
        // console.log("type: ", type);
    },[]);

    return (
        <>
            <polygon
                points={`
                    ${type.pos[0]-type.r/2},${type.pos[1]-type.r/2} 
                    ${type.pos[0]-type.r/2},${type.pos[1]+type.r/2} 
                    ${type.pos[0]+type.r/2},${type.pos[1]+type.r/2}
                    ${type.pos[0]+type.r/2},${type.pos[1]-type.r/2} 
                `}
                data-testid="element"
                data-elementid={"element-" + type.eId}
                stroke={type.border}
                fill={type.color}
                strokeWidth={.1}
            />
            <text
                x={type.pos[0]+type.r/10}
                y={type.pos[1]-type.r/10}
                stroke={type.border}
                strokeWidth={.1}
                style={{
                    font: `bold ${.025*type.r}em sans-serif`
                }}
            >
                {type.letter}
            </text>
            {
                type.north && 
                <Element type={type.north} />
            }
            {
                type.south &&
                <Element type={type.south} />
            }
            {
                type.east &&
                <Element type={type.east} />
            }
            {
                type.west &&
                <Element type={type.west} />
            }
        </>
    );
}

export default Element;