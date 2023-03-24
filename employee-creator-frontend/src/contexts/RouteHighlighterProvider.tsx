import { createContext, useState } from "react";

interface Children {
    children: React.ReactNode,
}

interface ContextType {
    atCurrentNav: string;
    setAtCurrentNav: React.Dispatch<string>
}

const initialContext = {
    atCurrentNav: "",
    setAtCurrentNav: () => { }
}

export const RouteHighlighterContext = createContext<ContextType>(initialContext);

const RouteHighlighterProvider = ({ children }: Children) => {
    const [atCurrentNav, setAtCurrentNav] = useState<string>('');

    const data = { atCurrentNav, setAtCurrentNav };

    return (
        <RouteHighlighterContext.Provider value={data}>{children}</RouteHighlighterContext.Provider>
    )
}

export default RouteHighlighterProvider