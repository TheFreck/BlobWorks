import { useEffect, useRef, useState } from 'react';
import Context from './Context';
import Environment from './components/environment/environment';

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

    const init = () => {
        
    }

    return(
        <>
            <Context.Provider
                value={{
                    elementsEnum,

                }}
            >
                <Environment
                >

                </Environment>
            </Context.Provider>
        </>
    )
}

export default App;