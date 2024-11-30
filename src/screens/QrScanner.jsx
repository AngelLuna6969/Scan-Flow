import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';

export const QrScannerComponent = ({ onScanResult }) => {
    const [scanResult, setScanResult] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [permissionError, setPermissionError] = useState(null);
    const [config, setConfig] = useState({});

    // Cargar configuración desde un archivo JSON
    useEffect(() => {
        fetch('/config.json')
            .then((response) => response.json())
            .then((data) => setConfig(data.camera))
            .catch((error) => console.error('Error al cargar JSON:', error));
    }, []);

    // Manejo del resultado del escaneo
    const handleScan = (result) => {
        if (result) {
            try {
                const jsonData = JSON.parse(result); // Intentar parsear el JSON
                console.log('JSON válido:', jsonData);
                setScanResult(jsonData); // Guardar resultado en estado
                onScanResult(jsonData); // Enviar al componente padre
                stopCamera(); // Detener la cámara después del escaneo exitoso
            } catch (error) {
                console.error('Código QR inválido:', error);
                setScanResult(result); // Mostrar el resultado aunque no sea JSON válido
            }
        }
    };

    const handleError = (error) => {
        console.error('Error al escanear:', error);
        setPermissionError(config.errorScan || 'Error al escanear el código.');
    };

    const startCamera = () => {
        setCameraActive(true);
    };

    const stopCamera = () => {
        setCameraActive(false);
    };

    const toggleCamera = () => {
        cameraActive ? stopCamera() : startCamera();
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{config.scanTitle || 'Escáner de Código QR'}</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">
                                {config.scanTitle || 'Escanear Código QR'}
                            </h3>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-primary mb-4" onClick={toggleCamera}>
                                {cameraActive
                                    ? config.closeCamera || 'Cerrar Cámara'
                                    : config.openCamera || 'Abrir Cámara'}
                            </button>

                            {cameraActive && (
                                <div className="camera-wrapper">
                                    <QrScanner
                                        delay={300}
                                        onError={handleError}
                                        onScan={handleScan}
                                        style={{ width: '100%' }}
                                        facingMode="environment" // Cámara trasera
                                    />
                                </div>
                            )}

                            {permissionError && (
                                <div className="alert alert-danger mt-2">
                                    {permissionError}
                                </div>
                            )}

                            {scanResult && (
                                <div className="alert alert-success mt-4">
                                    <strong>Código Escaneado:</strong>
                                    <pre>{JSON.stringify(scanResult, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

