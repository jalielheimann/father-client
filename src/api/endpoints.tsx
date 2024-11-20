// src/api/endpoints.jsx

const endpoints = {
    companies: {
        validateCNPJ: '/companies/exists', // Endpoint para validar CNPJ
        // Outros endpoints relacionados a companies...
    },
    contacts: {
        validateEmail: '/contacts/validate-email', // Endpoint para validar Email
        // Outros endpoints relacionados a contacts...
    },
    users: {
        // Defina endpoints relacionados a users, se necessário
    }
    // Adicione mais recursos conforme necessário
};

export default endpoints;
