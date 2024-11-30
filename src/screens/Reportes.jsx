import React, { useState, useEffect, useRef } from 'react';
import QRCodeGenerator from './QRCodeGenerator';
import { DTable, Title } from '../components';
import * as echarts from 'echarts';

export const Reportes = () => {
    const [filters, setFilters] = useState({
        empleado: 'Todos',
        ubicacion: 'Todas',
        tipoArticulo: 'Todos los tipos',
        fecha: new Date().toISOString().split('T')[0]
    });

    const [data, setData] = useState([
        { id: 1, identificador: 'ZACSFE346', ubicacion: 'Mesa' },
        { id: 2, identificador: 'ZACSFE347', ubicacion: 'Silla' },
        { id: 3, identificador: 'ZACSFE348', ubicacion: 'Escritorio' },
    ]);

    const [selectedRow, setSelectedRow] = useState(null); // Estado para la fila seleccionada (código QR)
    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleFilterSubmit = () => {
        console.log('Filters applied:', filters);
    };

    const handleGenerateQR = (row) => {
        setSelectedRow(row); // Guarda los datos de la fila seleccionada
    };

    const handleCloseQRModal = () => {
        setSelectedRow(null); // Cierra el modal y limpia la fila seleccionada
    };

    useEffect(() => {
        const pieChart = echarts.init(pieChartRef.current);
        const barChart = echarts.init(barChartRef.current);

        const pieOption = {
            title: { text: 'Referencias del Sitio Web', subtext: 'Datos simulados', left: 'center' },
            tooltip: { trigger: 'item' },
            legend: { orient: 'vertical', left: 'left' },
            series: [
                {
                    name: 'Acceso a Web',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ]
        };

        const barOption = {
            title: { text: 'Resultados de Ventas' },
            tooltip: {},
            legend: { data: ['2015', '2016', '2017'] },
            xAxis: { data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'] },
            yAxis: {},
            series: [
                { name: '2015', type: 'bar', data: [40, 80, 60, 100] },
                { name: '2016', type: 'bar', data: [70, 60, 50, 90] },
                { name: '2017', type: 'bar', data: [90, 100, 80, 70] }
            ]
        };

        pieChart.setOption(pieOption);
        barChart.setOption(barOption);

        return () => {
            pieChart.dispose();
            barChart.dispose();
        };
    }, []);

    return (
        <div className="content-wrapper">
            <Title title="Informes" breadcrums={["Ubicaciones", "Menú"]} />

            <div className="row">
                {/* Filtros */}
                <div className="col-12 col-md-4 col-lg-3">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Informes</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Empleado</label>
                                <select name="empleado" className="form-control" value={filters.empleado} onChange={handleInputChange}>
                                    <option>Todos</option>
                                    <option>Empleado 1</option>
                                    <option>Empleado 2</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Ubicación</label>
                                <select name="ubicacion" className="form-control" value={filters.ubicacion} onChange={handleInputChange}>
                                    <option>Todas</option>
                                    <option>Sala A</option>
                                    <option>Sala B</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tipo de Artículo</label>
                                <select name="tipoArticulo" className="form-control" value={filters.tipoArticulo} onChange={handleInputChange}>
                                    <option>Todos los tipos</option>
                                    <option>Tipo 1</option>
                                    <option>Tipo 2</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Fecha</label>
                                <input type="date" name="fecha" className="form-control" value={filters.fecha} onChange={handleInputChange} />
                            </div>
                            <button className="btn btn-primary" onClick={handleFilterSubmit}>Aceptar</button>
                            <button className="btn btn-secondary ml-2">Cancelar</button>
                        </div>
                    </div>
                </div>

                {/* Resultados */}
                <div className="col-12 col-md-8 col-lg-9">
                    <div className="row">
                        {/* Gráfica de pastel (PieChart) */}
                        <div className="col-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Resultados - Pie Chart</h4>
                                </div>
                                <div className="card-body">
                                    <div ref={pieChartRef} style={{ width: '100%', height: '300px' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Gráfica de barras (BarChart) */}
                        <div className="col-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Resultados - Bar Chart</h4>
                                </div>
                                <div className="card-body">
                                    <div ref={barChartRef} style={{ width: '100%', height: '300px' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Tabla de resultados */}
                        <div className="col-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Tabla de Resultados</h4>
                                </div>
                                <div className="card-body">
                                    <DTable
                                        cols={[
                                            { name: 'Identificador', selector: row => row.identificador },
                                            { name: 'Ubicación', selector: row => row.ubicacion },
                                            {
                                                name: 'Opciones',
                                                cell: row => (
                                                    <div>
                                                        <button className="btn btn-success btn-sm mr-2">Editar</button>
                                                        <button className="btn btn-danger btn-sm mr-2">Eliminar</button>
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => handleGenerateQR(row)}
                                                        >
                                                            Generar QR
                                                        </button>
                                                    </div>
                                                ),
                                                ignoreRowClick: true
                                            }
                                        ]}
                                        info={data}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal para mostrar el código QR generado */}
                        {selectedRow && (
                            <QRCodeGenerator
                                data={selectedRow} // Pasa los datos de la fila seleccionada
                                onClose={handleCloseQRModal} // Función para cerrar el modal
                            />
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};
