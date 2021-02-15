import { DataGrid } from '@material-ui/data-grid';
import * as React from 'react';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

const EditIconStyled = styled(EditIcon)`
  margin-right: 20px;
  cursor: pointer;
`;

const DeleteForeverIconStyled = styled(DeleteForeverIcon)`
  cursor: pointer;
`;

const DivFlexed = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 20px;
`;

const Clients = () => {
  const history = useHistory();

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
      flex: 1,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 100,
      renderCell: (params) => 
      <>
        <EditIconStyled onClick={() => onEdit(params.getValue('id'))} />
        <DeleteForeverIconStyled onClick={() => 
          onDelete(params.getValue('id'), `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`)}/>
      </>
    }
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

  function onEdit(id) {
    history.push(`/clients/${id}`);
  }
  
  function onDelete(id, fullName) {
    if (window.confirm(`You are going to delete client ${fullName}, with id ${id}. Are you sure?`)) {
      alert('ondelete');
    }    
  }

  return (
    <>
      <DivFlexed>
        <h1>Clients</h1>
        <Link to="/clients/new">Add new client</Link>
      </DivFlexed>      
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </>
  );
}

export default Clients;