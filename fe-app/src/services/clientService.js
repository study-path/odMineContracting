import axios from 'axios';
import config from '../config'

const axiousInstance = axios.create({
    baseURL: `${config.baseURL}/api`
});

const clientService = {
    create: (client) => {
        return axiousInstance
            .post('clients', client)
            .then(response => response.data);
    },
    getClients: () => {
        return axiousInstance
            .get('clients')
            .then(response => response.data);
    },
    getClient: (clientId) => {
        return axiousInstance
            .get(`clients/${clientId}/details`)
            .then(response => response.data);
    },
    update: (client) => {
        return axiousInstance
            .put(`clients/${client.id}`, client);
    },
    delete: (clientId) => {
        return axiousInstance
            .delete(`clients/${clientId}`);
    }
};

export default clientService;