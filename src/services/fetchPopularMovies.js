const API_KEY = process.env.REACT_APP_API_KEY;

const fetchPopularMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  return response.json();
};

export default fetchPopularMovies;
