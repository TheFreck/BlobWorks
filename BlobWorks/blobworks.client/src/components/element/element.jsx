import React, { useContext, useEffect } from "react";
import Context from "../../Context";

export const Element = ({type}) => {
    const {elementsEnum} = useContext(Context);

    useEffect(() => {
        console.log("type: ", type);
    })
    return (
        <>
            <rect
                data-testid="element"
                data-elementid={"element-" + type.eId}
                x={type.xPos}
                y={type.yPos}
                width={type.r}
                height={type.r}
                stroke={type.border}
                fill={type.color}
                stroke-width={.1}
            />
            <text
                x={type.xPos+type.r*.2}
                y={type.yPos+type.r*.8}
                stroke={type.border}
                stroke-width={.1}
                style={{
                    font: `bold ${.05*type.r}em sans-serif`
                }}
            >
                {type.letter}
            </text>
        </>
    );
}

export default Element;