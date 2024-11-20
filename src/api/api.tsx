// src/api/api.ts

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.father.srv.br/api/v2', // URL base definida diretamente
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
