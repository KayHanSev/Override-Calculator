import { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export function useScore() {
    return useContext(ScoreContext);
}

export function ScoreProvider({children}) {
    const [red, setRed] = useState(0);
    const [blue, setBlue] = useState(0);

    return (
        <ScoreContext.Provider value={{ red, setRed, blue, setBlue }}>
            {children}
        </ScoreContext.Provider>
    );
}


