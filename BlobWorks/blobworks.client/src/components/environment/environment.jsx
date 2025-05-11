import React, { useCallback, useContext, useEffect, useState } from "react";
import Context from "../../Context";
import Element from "../element/element";
import helpers from "../../helpers/helpers";

export const Environment = ({loopRef}) => {

    useEffect(() => {
    },[]);

    return (
        <div data-testid="environment">
            Environment
            <svg
                viewBox={`0 0 100 100`}
                width={`${40}vw`}
                height={`${40}vw`}
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    border: "solid",
                }}
            >
                {
                    loopRef?.current?.data?.elements?.length && 
                    loopRef.current.data.elements.map((e, i) => 
                    <Element type={e} key={i} />)
                }
                <rect
                    x={0}
                    y={0}
                    width={1}
                    height={1}
                    stroke='orange'
                    fill='orange'
                />
                <rect
                    x={100}
                    y={0}
                    width={1}
                    height={1}
                    stroke='orange'
                    fill='orange'
                />
                <rect
                    x={0}
                    y={100}
                    width={1}
                    height={1}
                    stroke='orange'
                    fill='orange'
                />
                <rect
                    x={100}
                    y={100}
                    width={1}
                    height={1}
                    stroke='orange'
                    fill='orange'
                />
            </svg>
        </div>
    );
}

export default Environment;