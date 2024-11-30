import React, { useState } from 'react';
import { Title, DTable } from "../components";

export const Personas = () => {
    const [personas, setPersonas] = useState([
        { id: 1, matricula: "NX02154", nombre: "Alfredo", apellidoPaterno: "Adame", apellidoMaterno: "Buenrostro", telefono: "111222333", correo: "yomero@correo.net" },
        { id: 2, matricula: "NX02155", nombre: "Juan", apellidoPaterno: "Pérez", apellidoMaterno: "García", telefono: "222333444", correo: "jperez@correo.net" }
    ]);

    const [formData, setFormData] = useState({
        id: null,
        matricula: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        telefono: '',
        correo: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (persona) => {
        setFormData(persona);
        setIsEditing(true);
    };

    const handleSave = () => {
        if (isEditing) {
            setPersonas(personas.map(p => (p.id === formData.id ? formData : p)));
        } else {
            setPersonas([...personas, { ...formData, id: personas.length + 1 }]);
        }
        resetForm();
    };

    const handleDelete = (id) => {
        setPersonas(personas.filter(p => p.id !== id));
    };

    const resetForm = () => {
        setFormData({
            id: null,
            matricula: '',
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            telefono: '',
            correo: ''
        });
        setIsEditing(false);
    };

    const columns = [
        { name: 'Matricula', selector: row => row.matricula, width: '12%' },
        { name: 'Nombre Completo', selector: row => `${row.nombre} ${row.apellidoPaterno} ${row.apellidoMaterno}`, width: '25%' },
        { name: 'Teléfono', selector: row => row.telefono, width: '16%' },
        { name: 'Correo', selector: row => row.correo, width: '20%' },
        {
            name: 'Acciones',
            cell: row => (
                <div className="d-flex flex-row">
                    <button className="btn btn-warning btn-sm mr-1" onClick={() => handleEdit(row)}>
                        Editar
                    </button>
                    <button className="btn btn-danger btn-sm mr-1" onClick={() => handleDelete(row.id)}>
                        Eliminar
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            width: '25%'
        }
    ];

    return (
        <>
            <div className="content-wrapper">
                <Title title="Personas" breadcrums={["Personas", "Menú"]} />
                <section className="content">
                    <div className="row">
                        <div className="col-4">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">{isEditing ? "Editar persona" : "Agregar persona"}</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Matricula/Identificador/No. de empleado</label>
                                            <input
                                                className="form-control"
                                                name="matricula"
                                                value={formData.matricula}
                                                onChange={handleInputChange}
                                                placeholder="NX02154"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Nombre(s)</label>
                                            <input
                                                className="form-control"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                placeholder="Alfredo"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Paterno</label>
                                            <input
                                                className="form-control"
                                                name="apellidoPaterno"
                                                value={formData.apellidoPaterno}
                                                onChange={handleInputChange}
                                                placeholder="Adame"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Materno</label>
                                            <input
                                                className="form-control"
                                                name="apellidoMaterno"
                                                value={formData.apellidoMaterno}
                                                onChange={handleInputChange}
                                                placeholder="Buenrostro"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Teléfono</label>
                                            <input
                                                className="form-control"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleInputChange}
                                                placeholder="111222333"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Correo electrónico</label>
                                            <input
                                                className="form-control"
                                                name="correo"
                                                value={formData.correo}
                                                onChange={handleInputChange}
                                                placeholder="yomero@correo.net"
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-secondary" onClick={resetForm}>Cancelar</button>
                                    <button className="btn btn-lg btn-primary float-right" onClick={handleSave}>{isEditing ? "Guardar cambios" : "Aceptar"}</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Personas registradas</h4>
                                </div>
                                <div className="card-body">
                                    <DTable
                                        cols={columns}
                                        info={personas}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
