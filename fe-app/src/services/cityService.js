import axios from 'axios';
import config from './../config'

const axiousInstance = axios.create({
    baseURL: `${config.baseURL}/api/cities`
});

const cityService = {
    getCities: () => {
        return axiousInstance
            .get()
            .then(response => response.data);
    }
};

export default cityService;