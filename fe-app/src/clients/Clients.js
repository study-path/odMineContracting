import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import clientService from "../services/clientService";
import React, { useEffect, useState } from "react";

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

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

const DivStyled = styled.div`
  height: 400px;
  width: 100%;
`;

const Clients = () => {
  const history = useHistory();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    clientService.getClients().then((clients) => setClients(clients));
  }, []);

  const columns = [
    { field: "id", headerName: "Id", width: 70 },
    { field: "name", headerName: "Company Name", flex: 1 },
    { field: "address1", headerName: "Address 1", width: 180 },
    { field: "address2", headerName: "Address 2", width: 180 },
    { field: "cityId", headerName: "City Id", width: 100 },
    { field: "cityName", headerName: "City Name", width: 160 },
    { field: "contactName", headerName: "Contact Name", width: 160 },
    { field: "contactPhone", headerName: "Contact Phone", width: 160 },
    { field: "contactEmail", headerName: "Contact Email", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <>
          <EditIconStyled onClick={() => onEdit(params.getValue("id"))} />
          <DeleteForeverIconStyled
            onClick={() => onDelete(params.getValue("id"))}
          />
        </>
      ),
    },
  ];

  function onEdit(clientId) {
    history.push(`/clients/${clientId}/details`);
  }

  function onDelete(clientId) {
    if (window.confirm(`You are going to delete client with id ${clientId}. Are you sure?`)) {
      clientService
        .delete(clientId)
        .then(() => {
          alert(`The client with id ${clientId} has been successfully removed`);
          setClients(clients.filter(c => c.id != clientId));
        });
    }
  }

  return (
    <CardStyled raised={true}>
      <CardContent>
        <DivFlexed>
          <h1>Clients</h1>
          <Link to="/clients/new">Add new client</Link>
        </DivFlexed>
        <DivStyled style={{ height: 400, width: "100%" }}>
          <DataGrid rows={clients} columns={columns} pageSize={5} />
        </DivStyled>
      </CardContent>
    </CardStyled>
  );
};

export default Clients;
