import React from 'react';
import QRCode from 'react-qr-code';

export const QRCodeGenerator = ({ data,onClose }) => {
    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Código QR Generado</h4>
                        <button type="button" className="close" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        {/* Generar código QR con los datos */}
                        <QRCode value={JSON.stringify(data)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
