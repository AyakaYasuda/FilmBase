import { BrowserRouter, Route, Routes } from "react-router-dom";

import MoviesList from "./pages/MoviesList";
import FavoriteMoviesList from "./pages/FavoriteMoviesList";

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/favorites" element={<FavoriteMoviesList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
