import { Navbar } from "./Navbar"
import { useContext, useEffect } from "react";
import { fullcrudContext } from "../context/ContextProvider";


export const Menu = ({ nombre}) => {

    const { usuario } = useContext(fullcrudContext)
  

    return (

        <div className="Menu">
            <Navbar />
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a className="brand-link">
                    <span className="brand-text font-weight-light">{nombre}</span>
                </a>

                {/* Nombre de Usuario */}
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                        </div>
                        <div className="info">
                            <a className="d-block">{usuario.usuario.toUpperCase()}</a>
                        </div>
                    </div>

                    {/* Items de Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <a href="#mobiliario" className="nav-link">
                                    {/* Icono del item */}
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Mobiliario
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>

                            </li>

                            <li className="nav-item">
                                <a href="/#escaneo" className="nav-link">
                                    {/* Icono del item */}
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Escanear QR
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>

                            </li>

                            <li className="nav-item">
                                <a href="/#qr" className="nav-link">
                                    {/* Icono del item */}
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Generar QR
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>

                            </li>

                            <li className="nav-item">
                                <a href="#/personas" className="nav-link">
                                    {/* Icono del item */}
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Personas
                                        <span className="right fas fa-angle-left"></span>
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#ubicacion" className="nav-link">
                                    {/* Icono del item */}
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Ubicaciones
                                        <i className="fas fa-angle-left right"></i>

                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#reportes" className="nav-link">
                                    {/* Icono del item */}
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Informes
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    )
}