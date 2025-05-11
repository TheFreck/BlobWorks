import { Suspense, useCallback, useEffect, useState } from "react";
import { calculateFrame } from "../helpers/helpers";
import Environment from "./environment/environment";

export const LoopMechanism = ({loopRef}) => {
    const [frame,setFrame] = useState(0);

    useEffect(() => {
        if(loopRef) {
            if(loopRef?.current?.loopFrame !== undefined){
                setFrame(loopRef.current.loopFrame);
                if(loopRef?.current?.isRunning){
                    loopRef.current.intId = setInterval(march,50,cb => {
                        setFrame(cb.frame);
                        loopRef.current.loopFrame = cb.frame;
                        loopRef.current.data = cb.data;
                        loopRef.current.isComplete = cb.continue;
                        if(!cb.continue) clearInterval(loopRef?.current?.intId);
                    });
                }
            }
            return () => clearInterval(loopRef?.current?.intId);
        }
    },[]);

    const march = (cb) => {
        if(loopRef && loopRef.current && loopRef.current.intId !== 0 && loopRef.current.isComplete){
            loopRef.current.isComplete = false;
            calculateFrame(loopRef.current.loopFrame,loopRef.current.data.elements,loop => {
                if(loopRef.current.isRunning) loop.continue = true;
                cb(loop);
            });
        }
    }

    const EnvironmentCallback = useCallback(() => <Environment loopRef={loopRef} />,[frame]);

    return (
        <div>
            <EnvironmentCallback />
        </div>
    );
}

export default LoopMechanism;