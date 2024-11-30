import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
    
    Inicio, Personas,
    Genera, Reportes,
    Mobiliario, Ubicaciones,
    QrScannerComponent
}
    from "../../screens"
import { Footer, Menu } from "../../components"
import Login from '../../screens/Login'
import PrivateRoutes from './PrivateRoutes'

function MyRoutes() {
    return (
        <BrowserRouter>
            <div>
                <Menu nombre="InventarioSys" usuario="Jaimito el Cartero" />
                <section className="content">
                    <Routes>
                        <Route index path="/" element={<Login />} />

                        <Route path="/Menu" element={
                            <PrivateRoutes>
                                <Inicio />
                            </PrivateRoutes>} />
                        <Route path="/Personas" element={
                            <PrivateRoutes>
                                <Personas />
                            </PrivateRoutes>} />
                        <Route path="/Qr" element={
                            <PrivateRoutes>
                                <Genera />
                            </PrivateRoutes>} />
                        <Route path="/Reportes" element={
                            <PrivateRoutes>
                                <Reportes />
                            </PrivateRoutes>} />
                        <Route path="/Escaneo" element={
                            <PrivateRoutes>
                                <QrScannerComponent />
                            </PrivateRoutes>} />
                        <Route path="/Ubicacion" element={
                            <PrivateRoutes>
                                <Ubicaciones />
                            </PrivateRoutes>} />
                        <Route path="/Mobiliario" element={
                            <PrivateRoutes>
                                <Mobiliario />
                            </PrivateRoutes>} />



                    </Routes>
                </section>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default MyRoutes