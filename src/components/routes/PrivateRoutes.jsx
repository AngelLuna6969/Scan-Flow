import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { fullcrudContext } from "../context/ContextProvider";

const PrivateRoutes = ({ children }) => {
    const { usuario } = useContext(fullcrudContext);

    // Verificamos si el usuario está autenticado
    const isAuthenticated = usuario && usuario.id_usuario !== 0;

    return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoutes;
