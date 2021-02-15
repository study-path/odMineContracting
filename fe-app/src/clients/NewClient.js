import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import citiesService from './../services/citiesService';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
]; 


const CardStyled = styled(Card)`
  display:flex;
  flex-direction: column;
  width: 550px;  
  display: flex;   
  margin: 0 auto;
  margin-top: 10px;
`;

const Form = styled.form`
  display:flex;
  flex-direction: column;  
`;

const H1 = styled.h1`
  display: flex;
  justify-content: center;
`;

const CardActionsStyled = styled(CardActions)`
  display: flex;
  justify-content: center;
`;



const NewClient = () => {
  const [city, setCity] = useState();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    citiesService
      .getCities()
      .then(cities => setCities(cities));
  }, []);

  const onCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <CardStyled raised={true}>
      <CardContent>
        <H1>Create new client</H1>
        <Form >
          <TextField label="Company name" />
          <TextField label="Address 1" />
          <TextField label="Address 2" />
          <TextField
            id="standard-select-currency"
            select
            label="Select"
            onChange={onCityChange}
            helperText="Please select client's city"
          >
            {cities.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {`${option.cityName} ${option.province}`}
              </MenuItem>
            ))}
          </TextField>
          <TextField label="Postal code" />
          <TextField label="Contact name" />
          <TextField label="Contact phone" />
          <TextField label="Contact email" />
        </Form>
      </CardContent>
      <CardActionsStyled>
        <Button size="small">Cancel</Button>
        <Button color="primary">Create</Button>
      </CardActionsStyled>
    </CardStyled>
      
   
  )
}

export default NewClient
