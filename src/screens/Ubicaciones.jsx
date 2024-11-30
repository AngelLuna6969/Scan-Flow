import React, { useState } from 'react';
import { Title, DTable } from "../components"; // Asegúrate de importar DTable
import QRCodeGenerator from './QRCodeGenerator';

export const Ubicaciones = () => {
    const [ubicaciones, setUbicaciones] = useState([
        { id_ubicacion: 1, edificio: 'Edificio A', departamento: 'Recursos Humanos', area: 'Oficina' },
        { id_ubicacion: 2, edificio: 'Edificio B', departamento: 'Contabilidad', area: 'Área común' },
        { id_ubicacion: 3, edificio: 'Edificio C', departamento: 'Sistemas', area: 'Sala de servidores' },
    ]);

    const [formData, setFormData] = useState({ id_ubicacion: '', edificio: '', departamento: '', area: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedQRData, setSelectedQRData] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = () => {
        if (isEditing) {
            // Modificar ubicación existente
            setUbicaciones(ubicaciones.map(ubicacion => 
                ubicacion.id_ubicacion === formData.id_ubicacion ? formData : ubicacion
            ));
        } else {
            // Agregar nueva ubicación
            setUbicaciones([...ubicaciones, { ...formData, id_ubicacion: ubicaciones.length + 1 }]);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({ id_ubicacion: '', edificio: '', departamento: '', area: '' });
        setIsEditing(false);
    };

    const handleEdit = (ubicacion) => {
        setFormData(ubicacion);
        setIsEditing(true);
    };

    const handleEliminar = (id_ubicacion) => {
        setUbicaciones(ubicaciones.filter(ubicacion => ubicacion.id_ubicacion !== id_ubicacion));
    };

    const handleGenerateQR = (codigo) => {
        setSelectedQRData({ codigo });
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Gestión de Ubicaciones</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-primary">
                            <div className="card-header">
                                <h4 className="card-title">{isEditing ? "Editar Ubicación" : "Agregar Nueva Ubicación"}</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Edificio</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="edificio"
                                            value={formData.edificio}
                                            onChange={handleInputChange}
                                            placeholder="Introduce el edificio"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Departamento</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="departamento"
                                            value={formData.departamento}
                                            onChange={handleInputChange}
                                            placeholder="Introduce el departamento"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Área</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="area"
                                            value={formData.area}
                                            onChange={handleInputChange}
                                            placeholder="Introduce el área"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-secondary" onClick={resetForm}>Cancelar</button>
                                <button className="btn btn-lg btn-primary float-right" onClick={handleSave}>
                                    {isEditing ? "Guardar Cambios" : "Agregar Ubicación"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card card-primary">
                            <div className="card-header">
                                <h4 className="card-title">Ubicaciones Registradas</h4>
                            </div>
                            <div className="card-body">
                                <DTable
                                    cols={[
                                        { name: 'ID', selector: row => row.id_ubicacion, width: '8%' },
                                        { name: 'Edificio', selector: row => row.edificio, width: '18%' },
                                        { name: 'Departamento', selector: row => row.departamento, width: '20%' },
                                        { name: 'Área', selector: row => row.area, width: '20%' },
                                        {
                                            name: 'Opciones',
                                            cell: row => (
                                                <div className="d-flex flex-row">
                                                    <button className="btn btn-warning btn-sm mr-1" onClick={() => handleEdit(row)}>
                                                        Editar
                                                    </button>
                                                    <button className="btn btn-danger btn-sm mr-1" onClick={() => handleEliminar(row.id_ubicacion)}>
                                                        Eliminar
                                                    </button>
                                                    <button className="btn btn-primary btn-sm" onClick={() => handleGenerateQR(row.id_ubicacion)}>
                                                        Generar QR
                                                    </button>
                                                </div>
                                            ),
                                            ignoreRowClick: true,
                                            width: '35%'
                                        }
                                    ]}
                                    info={ubicaciones}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal para mostrar el código QR */}
                {selectedQRData && (
                    <QRCodeGenerator
                        data={selectedQRData.codigo}
                        onClose={() => setSelectedQRData(null)}
                    />
                )}
            </section>
        </div>
    );
};
