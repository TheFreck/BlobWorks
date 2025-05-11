import React, { useContext, useEffect } from "react";
import Context from "../../Context";

export const Element = ({type}) => {
    useEffect(() => {
        // console.log(type.eId,type.neighbors);
        // if(type.neighbors[0]) console.log(type.eId,"north");
        // if(type.neighbors[1]) console.log(type.eId,"east");
        // if(type.neighbors[2]) console.log(type.eId,"south");
        // if(type.neighbors[3]) console.log(type.eId,"west");
    })

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
                x={type.pos[0] - type.r/10}
                y={type.pos[1] + type.r/10}
                    style={{
                        font: `bold ${.025*type.r}em sans-serif`
                    }}
            >
                {type.eId}
            </text>
            <text
                x={type.pos[0] - type.r/10}
                y={type.pos[1] - type.r/5}
                style={{
                    font: `bold ${.025*type.r}em sans-serif`
                }}
                stroke={type.neighbors[0] ? "red" : "black"}
                strokeWidth={.1}
            >
                {type.neighbors[0] ? type.neighbors[0] : "n"}
            </text>
            <text
                x={type.pos[0] - type.r/10}
                y={type.pos[1] + type.r/2.5}
                style={{
                    font: `bold ${.025*type.r}em sans-serif`
                }}
                stroke={type.neighbors[2] ? "red" : "black"}
                strokeWidth={.1}
            >
                {type.neighbors[2] ? type.neighbors[2] : "s"}
            </text>
            <text
                x={type.pos[0] + type.r/5}
                y={type.pos[1] + type.r/10}
                style={{
                    font: `bold ${.025*type.r}em sans-serif`
                }}
                stroke={type.neighbors[1] ? "red" : "black"}
                strokeWidth={.1}
            >
                {type.neighbors[1] ? type.neighbors[1] : "e"}
            </text>
            <text
                x={type.pos[0] - type.r/2.5}
                y={type.pos[1] + type.r/10}
                style={{
                    font: `bold ${.025*type.r}em sans-serif`
                }}
                stroke={type.neighbors[3] ? "red" : "black"}
                strokeWidth={.1}
            >
                {type.neighbors[3] ? type.neighbors[3] : "w"}
            </text>
            
            {/* <text
                x={type.pos[0]+type.r/10}
                y={type.pos[1]-type.r/10}
                stroke={type.border}
                fill={type.border}
                strokeWidth={.1}
                style={{
                    font: `bold ${.025*type.r}em sans-serif`
                }}
            >
                {type.letter}
            </text> */}
        </>
    );
}

export default Element;