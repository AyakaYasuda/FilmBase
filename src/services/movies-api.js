import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_FILMBASE_API_MOVIES,
});

export const getAllMovies = () => {
  return api.get('/').then((res) => res.data.movies);
};

export const getMovieById = (args) => {
  const { movieId, token } = args;
  return api
    .get(`/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.movie);
};

export const createMovie = (args) => {
  const { data, token } = args;
  return api
    .post('/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
