import React, {useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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
    <div>
      <form>
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
      </form>
    </div>
  )
}

export default NewClient
