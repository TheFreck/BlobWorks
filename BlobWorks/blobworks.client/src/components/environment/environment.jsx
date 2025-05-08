import React, { useCallback, useContext, useEffect, useState } from "react";
import Context from "../../Context";
import Element from "../element/element";
import helpers from "../../helpers/helpers";

export const Environment = () => {
    const { elementsEnum } = useContext(Context);
    const [elements, setElements] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        helpers.createElements(11, 5, els => {
            let elmts = [{
                color: "green",
                border: "yellow",
                letter: "F",
                xPos: els[0].x,
                yPos: els[0].y,
                eId: 0,
                r: 10
            }];
            for (let i = 1; i < 11; i++) {
                elmts.push({
                    color: "gray",
                    border: "black",
                    letter: "N",
                    xPos: els[i].x,
                    yPos: els[i].y,
                    eId: i,
                    r: 10
                });
            }
            setElements(elmts);
            setReady(true);
        })
    }, []);

    const EnvironmentCallback = useCallback(() => (
        <svg
            viewBox={`0 0 100 100`}
            width={`${75}vw`}
            height={`${40}vw`}
            xmlns="http://www.w3.org/2000/svg"
            style={{
                border: "solid",
            }}
        >
            {
                elements.length && elements.map((e, i) => <Element type={e} key={i} />)
            }
        </svg>),
        [elements,ready]);

    return (
        <div data-testid="environment">
            Environment
            {
                ready && 
                <EnvironmentCallback />
            }
        </div>
    );
}

export default Environment;