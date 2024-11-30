import { createContext } from "react";
import { useLocalStorage } from '../../hook/useLocalStorage';

const fullcrudContext = createContext();

const ContextProvider = ({ children }) => {
    // En lugar de usar `useState`, usaremos `useLocalStorage` para mantener el estado de `usuario`
    const [usuario, setUsuario] = useLocalStorage("usuario", {
        "id_usuario": 0,
        "usuario": "",
        "contrasena": ""
    });

    return (
        <fullcrudContext.Provider
            value={{
                usuario,
                setUsuario,
            }}
        >
            {children}
        </fullcrudContext.Provider>
    );
}

export { fullcrudContext };
export default ContextProvider;
