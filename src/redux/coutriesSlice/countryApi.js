import axios from 'axios';

const countryUrl = 'https://restcountries.com/v3.1/all';

const getData = async () => {
    try {
        const response = await axios.get(countryUrl);
        return response.data;
    } catch(error) {
        return error
    }
};

export default getData;