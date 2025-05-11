import { useEffect, useRef, useState } from 'react';
import Context from './Context';
import Environment from './components/environment/environment';
import LoopContainer from './components/loopContainer';

function App() {

    const elementsEnum = {
        organic: 0,
        inorganic: 1,
        glue: 2,
        unGlue: 3,
        water: 4,
        light: 5
    };

    const elementsRef = useRef();

    return(
        <>
            <Context.Provider
                value={{
                    elementsEnum,

                }}
            >
                <LoopContainer />
            </Context.Provider>
        </>
    )
}

export default App;