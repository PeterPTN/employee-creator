import { createContext, useState } from "react";

interface Children {
    children: React.ReactNode,
}

interface ContextType {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<boolean>
}

const initialContext = {
    isModalOpen: false,
    setIsModalOpen: (arg0: boolean) => { }
}

export const ModalContext = createContext<ContextType>(initialContext);

const ModalProvider = ({ children }: Children) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const data = { isModalOpen, setIsModalOpen };

    return (
        <ModalContext.Provider value={data}>{children}</ModalContext.Provider>
    )
}

export default ModalProvider