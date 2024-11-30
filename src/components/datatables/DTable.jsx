import DataTable from 'react-data-table-component';

export const DTable = ({ cols, info }) => {

    const columnas = cols;

    const data = info;

    return (
        <DataTable
            columns={columnas}
            data={data}
            pagination
            highlightOnHover

		/>
    )
}

DTable.defaultProps = {
    cols: [],
    info: []
}