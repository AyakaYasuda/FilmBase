import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_FILMBASE_API_MOVIES,
});

export const createMovie = (movieData, token) => {
  return api
    .post('/', movieData, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data);
};
