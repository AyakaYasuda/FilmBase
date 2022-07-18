import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Auth from './pages/Auth';
import PopularMovies from './pages/PopularMovies';
import FavoriteMovies from './pages/FavoriteMovies';
import Reviews from './pages/Reviews';
import MyReviews from './pages/MyReviews';
import CreateReview from './pages/CreateReview';
import EditReview from './pages/EditReview';
import Header from './components/UI/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/movies" element={<PopularMovies />} />
          <Route path="/movies/favorites" element={<FavoriteMovies />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/:id" element={<MyReviews />} />
          <Route path="/reviews/new" element={<CreateReview />} />
          <Route path="/reviews/edit" element={<EditReview />} />
          <Route path="*" element={<Navigate to={'/auth'} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
