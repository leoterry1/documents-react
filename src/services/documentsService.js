import api from '../config/api';


export const getDocument = async id => api.get(`/documents/${id}`);

export const getDocuments = async () => api.get('/documents');

export const getOwners = async () => api.get('/owners');

export const postDocument = async (form) => api.post('/documents', form);

export const putDocument = async (id, form) => api.put(`/documents/${id}`, form);

export const deleteDocument = async id => api.delete(`/documents/${id}`);

export const findDocument = async (form) => {
    const { name, date, owner } = form;
    return api.get(`/documents/search?name=${name}&date=${date}&owner=${owner}`)
}

export const getUsers = async () => api.get(`/users`);

export const associateUsers = async (id, usersIds)=> api.put(`/documents/${id}/users`, { users: usersIds});
