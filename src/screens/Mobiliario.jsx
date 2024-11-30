import React, { useState } from 'react';
import QRCodeGenerator from './QRCodeGenerator';
import { DTable } from '../components';

export const Mobiliario = () => {
    const [mobiliarios, setMobiliarios] = useState([
        { id_mobiliario: 1, nombre: "Silla", descripcion: "Silla de oficina", fecha_registro: "2023-10-01", estado: "En uso", activo: true, codigo: "A001", id_ubicacion: 1 },
        { id_mobiliario: 2, nombre: "Mesa", descripcion: "Mesa de reuniones", fecha_registro: "2023-09-12", estado: "Disponible", activo: true, codigo: "A002", id_ubicacion: 2 },
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id_mobiliario: '',
        nombre: '',
        descripcion: '',
        estado: '',
        codigo: '',
        id_ubicacion: ''
    });

    const [selectedQRData, setSelectedQRData] = useState(null);

    // Maneja los cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Agregar o editar mobiliario
    const handleSave = () => {
        if (isEditing) {
            // Modificar mobiliario existente
            setMobiliarios(mobiliarios.map(mob => mob.id_mobiliario === formData.id_mobiliario ? formData : mob));
        } else {
            // Agregar nuevo mobiliario
            const newMobiliario = {
                ...formData,
                id_mobiliario: mobiliarios.length + 1,
                fecha_registro: new Date().toISOString().split('T')[0],
            };
            setMobiliarios([...mobiliarios, newMobiliario]);
        }
        resetForm();
    };

    // Restablece el formulario
    const resetForm = () => {
        setFormData({ id_mobiliario: '', nombre: '', descripcion: '', estado: '', codigo: '', id_ubicacion: '' });
        setIsEditing(false);
    };

    // Preparar la edición de mobiliario
    const handleEdit = (mobiliario) => {
        setFormData(mobiliario);
        setIsEditing(true);
    };

    // Eliminar mobiliario
    const handleEliminar = (id) => {
        setMobiliarios(mobiliarios.filter(mob => mob.id_mobiliario !== id));
    };

    // Generar QR
    const handleGenerateQR = (codigo) => {
        setSelectedQRData({ codigo });
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Gestión de Mobiliario</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-4">
                        <div className="card card-primary">
                            <div className="card-header">
                                <h4 className="card-title">{isEditing ? "Editar mobiliario" : "Agregar mobiliario"}</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            placeholder="Silla, Mesa, etc."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="descripcion"
                                            value={formData.descripcion}
                                            onChange={handleInputChange}
                                            placeholder="Descripción breve"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Estado</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="estado"
                                            value={formData.estado}
                                            onChange={handleInputChange}
                                            placeholder="En uso, Disponible, etc."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Código</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="codigo"
                                            value={formData.codigo}
                                            onChange={handleInputChange}
                                            placeholder="A001, A002, etc."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ubicación</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="id_ubicacion"
                                            value={formData.id_ubicacion}
                                            onChange={handleInputChange}
                                            placeholder="ID de la ubicación"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-secondary" onClick={resetForm}>Cancelar</button>
                                <button className="btn btn-lg btn-primary float-right" onClick={handleSave}>
                                    {isEditing ? "Guardar cambios" : "Aceptar"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-8">
                        <div className="card card-primary">
                            <div className="card-header">
                                <h4 className="card-title">Mobiliario registrado</h4>
                            </div>
                            <div className="card-body">
                                <DTable
                                    cols={[
                                        { name: 'ID', selector: row => row.id_mobiliario, width: '6%' },
                                        { name: 'Nombre', selector: row => row.nombre, width: '10%' },
                                        { name: 'Descripción', selector: row => row.descripcion, width: '18%' },
                                        { name: 'Estado', selector: row => row.estado, width: '13%' },
                                        { name: 'Código', selector: row => row.codigo, width: '12%' },
                                        {
                                            name: 'Opciones',
                                            cell: row => (
                                                <div className="d-flex flex-row">
                                                    <button className="btn btn-warning btn-sm mr-1" onClick={() => handleEdit(row)}>
                                                        Editar
                                                    </button>
                                                    <button className="btn btn-danger btn-sm mr-1" onClick={() => handleEliminar(row.id_mobiliario)}>
                                                        Eliminar
                                                    </button>
                                                    <button className="btn btn-primary btn-sm" onClick={() => handleGenerateQR(row)}>
                                                        Generar QR
                                                    </button>
                                                </div>
                                            ),
                                            ignoreRowClick: true,
                                            width: '45%'
                                        }
                                    ]}
                                    info={mobiliarios}
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
