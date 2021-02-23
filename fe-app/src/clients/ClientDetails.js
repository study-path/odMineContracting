import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom';

import cityService from "./../services/cityService";
import clientService from "../services/clientService"

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 550px;
  margin: 0 auto;
  margin-top: 10px;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

const H1Styled = styled.h1`
  display: flex;
  justify-content: center;
`;

const CardActionsStyled = styled(CardActions)`
  display: flex;
  justify-content: center;
`;

const DivErrorStyled = styled.div`
  color: red;
`;

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "isPhone":
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(
            value.toLowerCase()
          )
            ? setPhoneError(false)
            : setPhoneError(true);
          break;
        case "isEmail":
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value.toLowerCase()
          )
            ? setEmailError(false)
            : setEmailError(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError || phoneError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, phoneError, emailError]);

  return {
    isEmpty,
    minLengthError,
    phoneError,
    emailError,
    inputValid,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
    setDirty(true);
  };

  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    setValue,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

const ClientDetails = () => {
  const history = useHistory();
  let { clientId } = useParams();
  const [cities, setCities] = useState([]);
  const [client, setClient] = useState();

  const companyName = useInput("", { isEmpty: true });
  const address1 = useInput("", { isEmpty: true });
  const address2 = useInput("", { isEmpty: true });
  const city = useInput("", { isEmpty: true });
  const postalCode = useInput("", { isEmpty: true });
  const contactName = useInput("", { isEmpty: true });
  const contactPhone = useInput("", { isEmpty: true, isPhone: true });
  const contactEmail = useInput("", { isEmpty: true, minLength: 5, isEmail: true });

  useEffect(() => {
    const cP = cityService.getCities()
      .then((cities) => setCities(cities));
    if (clientId)
    {
      cP.then(()=>{
        clientService.getClient(clientId)
        .then(client => {
          console.log(client);
          companyName.setValue(client.name);
          address1.setValue(client.address1);
          client.address2 && address2.setValue(client.address2);
          city.setValue(client.cityId);
          postalCode.setValue(client.postalCode);
          contactName.setValue(client.contactName);
          contactPhone.setValue(client.contactPhone);
          contactEmail.setValue(client.contactEmail);
        });
      })
    }
  }, []);

  function getTitle() {
    return clientId ? `Update details of client #${clientId}` : 'Create new client';
  }

  function getButtonTitle() {
    return clientId ? 'Update' : 'Create';
  }

  function isCreationDisabled() {
    return (
      !companyName.inputValid ||
      !address1.inputValid ||
      !city.inputValid ||
      !postalCode.inputValid ||
      !contactName.inputValid ||
      !contactPhone.inputValid ||
      !contactEmail.inputValid
    );
  }

  function onAction() {
    const client = {
      name: companyName.value,
      address1: address1.value,
      address2: address2.value,
      postalCode: postalCode.value,
      contactName: contactName.value,
      contactPhone: contactPhone.value,
      contactEmail: contactEmail.value,
      cityId: city.value
    };

    if (clientId)
    {
      client.id = clientId;
      clientService
        .update(client)
        .then(
          () => {
            alert(`Client has been updated.`);
            history.push('/');
          },
          err => {
            alert('Error occurs. Check logs');
            console.log('Error occured during client updating.', err.toJSON());
          });
    }
    else
    {
      clientService
        .create(client)
        .then(
          clientId => {
            alert(`Client has been created. Id is ${clientId}`);
            history.push('/');
          },
          err => {
            alert('Error occurs. Check logs');
            console.log('Error occured during client creation.', err.toJSON());
          });
    }
  }

  return (
    <CardStyled raised={true}>
      <CardContent>
        <H1Styled>{getTitle()}</H1Styled>
        <FormStyled>
          <TextField
            required
            label="Company name"
            value={companyName.value}
            onChange={(e) => companyName.onChange(e)}
            onBlur={(e) => companyName.onBlur(e)}
          />
          {companyName.isDirty && companyName.isEmpty && (
            <DivErrorStyled>A company name is required</DivErrorStyled>
          )}
          <TextField
            required
            label="Address 1"
            value={address1.value}
            onChange={(e) => address1.onChange(e)}
            onBlur={(e) => address1.onBlur(e)}
          />
          {address1.isDirty && address1.isEmpty && (
            <DivErrorStyled>An address is required</DivErrorStyled>
          )}
          <TextField
            label="Address 2"
            value={address2.value}
            onChange={(e) => address2.onChange(e)}
            onBlur={(e) => address2.onBlur(e)}
          />
          <TextField
            required
            select
            label="Please select client's city"
            value={city.value}
            onChange={(e) => city.onChange(e)}
            onBlur={(e) => city.onBlur(e)}
          >
            {cities.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {`${option.cityName}, ${option.provinceName}`}
              </MenuItem>
            ))}
          </TextField>
          {city.isDirty && city.isEmpty && (
            <DivErrorStyled>A city is required</DivErrorStyled>
          )}
          <TextField
            required
            label="Postal code"
            value={postalCode.value}
            onChange={(e) => postalCode.onChange(e)}
            onBlur={(e) => postalCode.onBlur(e)}
          />
          {postalCode.isDirty && postalCode.isEmpty && (
            <DivErrorStyled>A postal code is required</DivErrorStyled>
          )}
          <TextField
            required
            label="Contact name"
            value={contactName.value}
            onChange={(e) => contactName.onChange(e)}
            onBlur={(e) => contactName.onBlur(e)}
          />
          {contactName.isDirty && contactName.isEmpty && (
            <DivErrorStyled>A contact name is required</DivErrorStyled>
          )}
          <TextField
            required
            label="Contact phone. Format is ###-###-####"
            value={contactPhone.value}
            onChange={(e) => contactPhone.onChange(e)}
            onBlur={(e) => contactPhone.onBlur(e)}
          />
          {contactPhone.isDirty && contactPhone.isEmpty && (
            <DivErrorStyled>A phone is required</DivErrorStyled>
          )}
          {contactPhone.isDirty && contactPhone.phoneError && (
            <DivErrorStyled>
              Format is wrong. Please use ###-###-####
            </DivErrorStyled>
          )}
          <TextField
            required
            label="Contact email"
            value={contactEmail.value}
            onChange={(e) => contactEmail.onChange(e)}
            onBlur={(e) => contactEmail.onBlur(e)}
          />
          {contactEmail.isDirty && contactEmail.minLengthError && (
            <DivErrorStyled>The email is too short</DivErrorStyled>
          )}
          {contactEmail.isDirty && contactEmail.emailError && (
            <DivErrorStyled>Please enter a valid email</DivErrorStyled>
          )}
        </FormStyled>
      </CardContent>
      <CardActionsStyled>
        <Link to="/clients">
          <Button size="small">Cancel</Button>
        </Link>
        <Button
          color="primary"
          disabled={isCreationDisabled()}
          onClick={onAction}>
          {getButtonTitle()}
        </Button>
      </CardActionsStyled>
    </CardStyled>
  );
};

export default ClientDetails;
