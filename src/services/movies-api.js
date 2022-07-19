import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_FILMBASE_API_MOVIES,
});

export const createMovie = (arg) => {
  const { data, token } = arg;
  return api
    .post('/', data, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data);
};
