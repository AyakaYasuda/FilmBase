import { BrowserRouter, Route, Routes } from "react-router-dom";

import PopularMovies from "./pages/PopularMovies";
import FavoriteMovies from "./pages/FavoriteMovies";

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<PopularMovies />} />
          <Route path="/favorites" element={<FavoriteMovies />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
