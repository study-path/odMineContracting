import { DataGrid } from '@material-ui/data-grid';
import * as React from 'react';
import { Link } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 180 },
  { field: 'lastName', headerName: 'Last name', width: 180 },
  { field: 'age', headerName: 'Age',  type: 'number',  width: 100, },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 180,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const firstNameActions = 
  {
    icon: <span className="glyphicon glyphicon-remove" />,
    callback: () => {
      alert("Deleting");
    }
  }


function getCellActions(column, row) {
  const cellActions = {
    firstName: firstNameActions
  };
  return row.id % 2 === 0 ? cellActions[column.key] : null;
}

function addNewClient(){
  alert('add new client')
}

const Clients = () => {
  return (
    <>
      <Link to="/clients/new">Add new client</Link>
      
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5}  getCellActions={getCellActions} />
      </div>
    </>
  );
}

export default Clients;