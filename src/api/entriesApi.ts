import axios from 'axios';

const entriesApi=axios.create({
    baseURL:'http://localhost:3000/api'
});


export default entriesApi;