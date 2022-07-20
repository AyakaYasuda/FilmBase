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
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.members);
};

export const getUserById = (args) => {
  const { id, token } = args;
  return api
    .get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.member);
};

export const getFavoriteMovies = (args) => {
  const { userId, favoriteMoviesId, token } = args;
  return api
    .post(
      `/${userId}/favorite`,
      { favoriteMoviesId: [...favoriteMoviesId] },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data.movies);
};

export const addFavoriteMovie = (args) => {
  const { userId, movieId, token } = args;
  return api
    .put(
      `/movie/add/${userId}`,
      { movieId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

export const removeFavoriteMovie = (args) => {
  const { userId, movieId, token } = args;
  return api
    .put(
      `/movie/remove/${userId}`,
      { movieId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};
