import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import { Title } from '../components';

export const Genera = () => {
    const [qrData, setQrData] = useState('');
    const [showQr, setShowQr] = useState(false);
    const [formData, setFormData] = useState({
        idMobiliario: '',
        idPersona: '',
        ubicacion: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const generateQrCode = () => {
        const data = JSON.stringify(formData);
        setQrData(data);
        setShowQr(true);
    };

    return (
        <div className='content-wrapper'>
            <Title title="Código QR" breadcrums={["Código QR", "Menú" ]} /* ruta={"personas"} */ />

            <div className="container ">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Generador de Código QR</h3>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="idMobiliario">ID Mobiliario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="idMobiliario"
                                    name="idMobiliario"
                                    value={formData.idMobiliario}
                                    onChange={handleInputChange}
                                    placeholder="Introduce el ID del mobiliario"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="idPersona">ID Persona</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="idPersona"
                                    name="idPersona"
                                    value={formData.idPersona}
                                    onChange={handleInputChange}
                                    placeholder="Introduce el ID de la persona"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ubicacion">Ubicación</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ubicacion"
                                    name="ubicacion"
                                    value={formData.ubicacion}
                                    onChange={handleInputChange}
                                    placeholder="Introduce la ubicación"
                                />
                            </div>

                            <button
                                type="button"
                                className="btn btn-primary mt-3"
                                onClick={generateQrCode}
                            >
                                Generar Código QR
                            </button>
                        </form>
                    </div>
                </div>

                {showQr && (
                    <div className="card card-secondary mt-4">
                        <div className="card-header">
                            <h3 className="card-title">Código QR Generado</h3>
                        </div>
                        <div className="card-body text-center">
                            <QRCodeSVG value={qrData} size={256} /> {/* Cambiado a QRCodeSVG */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

