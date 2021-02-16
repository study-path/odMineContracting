import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import citiesService from './../services/citiesService';


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


const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect( () => {
    for (const validation in validations){
      switch(validation) {
        case'minLength':
          value.length  < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true)
          break;          
        case 'isEmail' :
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          re.test(String(value).toLowerCase())? setEmailError(false) : setEmailError(true)
         break;
      }
    }
  }, [value])

  useEffect( () => {
    if(isEmpty || minLengthError || emailError){
      setInputValid(false)
    }
    else{
      setInputValid(true)
    }

  } , [isEmpty, minLengthError, emailError ])
  return{
    isEmpty,
    minLengthError, 
    emailError,
    inputValid
  }
}


const useInput = (initialValue, validations)=> {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setDirty] = useState(false)
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = () =>{
    setDirty(true)
  }

  return {
    value, 
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}


const NewClient = () => {
  const [city, setCity] = useState();
  const [cities, setCities] = useState([]);

  const contactName = useInput('');
  const companyName = useInput('');
  const address1 = useInput('');
  const address2 = useInput('');
  const postalCode  = useInput('');
  const phoneNumber = useInput('', {isEmpty:true, minLength:10});
  const email = useInput('', {isEmpty:true, minLength:3, isEmail:true});


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
          <TextField required label="Company name" value= {companyName.value} onChange={e=>companyName.onChange(e)} onBlur={e => companyName.onBlur(e)}/>
          <TextField required label="Address 1" value={address1.value} onChange={e=>address1.onChange(e)} onBlur={e => address1.onBlur(e)}/>
          <TextField label="Address 2" value={address2.value}  onChange={e=>address2.onChange(e)} onBlur = {e =>address2.onBlur(e)}/>
          <TextField
            required
            id="standard-select-city"
            select
            label="Please select client's city"
            onChange={onCityChange}           
          >
            {cities.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {`${option.cityName} ${option.province}`}
              </MenuItem>
            ))}
          </TextField>
          <TextField required label="Postal code"  value={postalCode.value} onChange={e=>postalCode.onChange(e)} onBlur={e => postalCode.onBlur(e)}/>
          <TextField required label="Contact name"  value={contactName.value} onChange={e=>contactName.onChange(e)} onBlur={e => contactName.onBlur(e)}/>
          {(phoneNumber.isDirty && phoneNumber.isEmpty) && <div style={{color:'red'}}>This field is required.</div>}
          {(phoneNumber.isDirty && phoneNumber.minLengthError) && <div style={{color:'red'}}>Please enter a valid phone number. <p style={{fontSize: '0.765em'}}>Example:###-###-####</p></div>}
          <TextField required label="Contact phone" value={phoneNumber.value}  onChange={e=>phoneNumber.onChange(e)} onBlur={e => phoneNumber.onBlur(e)}/>
          {(email.isDirty && email.isEmpty) && <div style={{color:'red'}}>This field is required.</div>}
          {(email.isDirty && email.minLengthError) && <div style={{color:'red'}}>Please enter a valid email.</div>}
          {(email.isDirty && email.emailError) && <div style={{color:'red'}}>Email is not valid.</div>}
          <TextField required label="Contact email" value={email.value}  onChange={e=>email.onChange(e)} onBlur={e => email.onBlur(e)} />
        </Form>
      </CardContent>
      <CardActionsStyled>
        <Button size="small" >Cancel</Button>
        <Button color="primary" disabled ={!email.inputValid || !phoneNumber.inputValid}>Create</Button>
      </CardActionsStyled>
    </CardStyled>
      
   
  )
}

export default NewClient
