import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_FILMBASE_API_MEMBERS,
});

export const signup = (userData) => {
  console.log(process.env.REACT_APP_FILMBASE_API_MEMBERS);
  return api.post('/signup', userData).then((res) => res.data);
};

export const login = (userData) => {
  return api.post('/login', userData).then((res) => res.data);
};

export const getAllUsers = (token) => {
  return api
    .get('/', {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data.members);
};

export const getUserById = (id, token) => {
  return api
    .get(`/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data.member);
};
