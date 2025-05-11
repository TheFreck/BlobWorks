import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import LoopMechanism from "./loopMechanism";
import { createElements } from "../helpers/helpers";

export const LoopContainer = () => {
    const [ready,setReady] = useState(false);
    const loopRef = useRef();

    useEffect(() => {
        init();
    },[]);

    const init = () => {
        createElements(5, 10, elements => {
            loopRef.current = {
                loopFrame: 0,
                intId: 0,
                isRunning: false,
                isComplete: true,
                data: {
                    elements
                }
            }
            setReady(true);
        });
    }

    const startStop = () => {
        loopRef.current.isRunning = !loopRef.current.isRunning;
        setReady(!ready);
    }

    const LoopMechanismCallback = useCallback(() => <LoopMechanism loopRef={loopRef} />, [ready]);

    return (
        <div>
            <button 
                type="button" 
                onClick={startStop}
            >
                {loopRef?.current?.isRunning ? "STOP" : "START"}
            </button>
            <br/>
            <LoopMechanismCallback />
        </div>
    );
}

export default LoopContainer;