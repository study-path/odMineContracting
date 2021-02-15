import axios from 'axios';
import config from './../config'

const axiousInstance = axios.create({
    baseURL: `${config.baseURL}/api/clients`
});

export const clientsService = {
    createClient = (id) => {

    },
    getClients = () => {

    },
    getClient = (id) => {

    },    
    updateClient = (id) => {

    },
    deleteClient = (id) => {

    }
};