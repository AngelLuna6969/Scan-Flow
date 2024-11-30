import React from 'react';
import { useNavigate } from 'react-router-dom'; 

export const Inicio = () => {
    const navigate = useNavigate(); 
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Bienvenido</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        {/* Opción Escaneo */}
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>Escaneo</h3>
                                    <p>Escanea códigos QR</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-qrcode"></i>
                                </div>
                                <button
                                    onClick={() => navigate('/escaneo')}
                                    className="small-box-footer"
                                >
                                    Ir a Escaneo <i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* Opción Ubicaciones */}
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>Ubicaciones</h3>
                                    <p>Gestiona las ubicaciones</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <button
                                    onClick={() => navigate('/ubicacion')}
                                    className="small-box-footer"
                                >
                                    Ir a Ubicaciones <i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* Opción Informes */}
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>Informes</h3>
                                    <p>Genera informes</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-file-alt"></i>
                                </div>
                                <button
                                    onClick={() => navigate('/reportes')}
                                    className="small-box-footer"
                                >
                                    Ir a Informes <i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* Opción Mobiliario */}
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>Mobiliario</h3>
                                    <p>Gestiona el mobiliario</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-couch"></i>
                                </div>
                                <button
                                    onClick={() => navigate('/mobiliario')}
                                    className="small-box-footer"
                                >
                                    Ir a Mobiliario <i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


