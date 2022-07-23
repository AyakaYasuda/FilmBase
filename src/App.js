import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { login, logout } from './redux/usersSlice';

import Auth from './pages/Auth';
import PopularMovies from './pages/PopularMovies';
import FavoriteMovies from './pages/FavoriteMovies';
import Reviews from './pages/Reviews';
import MyReviews from './pages/MyReviews';
import CreateReview from './pages/CreateReview';
import EditReview from './pages/EditReview';
import UsersReviews from './pages/UsersReviews';
import UsersLikes from './pages/UsersLikes';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.users);
  const [storedData, setStoredData] = useState();
  const token = storedData?.token;
  const userId = storedData?.uid;
  const expiration = storedData?.expiration;

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/auth" />;
    }
    return children;
  };

  const autoLogin = useCallback(
    (userId, token, tokenExpirationDate) => {
      dispatch(login({ userId, token }));

      localStorage.setItem(
        'userData',
        JSON.stringify({
          uid: userId,
          token: token,
          expiration: tokenExpirationDate,
        })
      );
    },
    [dispatch]
  );

  const autoLogout = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem('userData');
  }, [dispatch]);

  useEffect(() => {
    setStoredData(JSON.parse(localStorage.getItem('userData')));
  }, [isLoggedIn]);

  useEffect(() => {
    if (token && new Date(expiration) > new Date()) {
      autoLogin(userId, token, new Date(expiration));
    }
  }, [token, userId, expiration, autoLogin]);

  useEffect(() => {
    let logoutTimer;
    if (token && expiration) {
      const remainingTime = new Date(expiration) - new Date().getTime();
      console.log(remainingTime);

      logoutTimer = setTimeout(autoLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, expiration, autoLogout]);

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route exact path="/auth" element={<Auth />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <PopularMovies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorite"
            element={
              <ProtectedRoute>
                <FavoriteMovies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <Reviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews/:uid"
            element={
              <ProtectedRoute>
                <UsersReviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/likes/:uid"
            element={
              <ProtectedRoute>
                <UsersLikes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-reviews/:id"
            element={
              <ProtectedRoute>
                <MyReviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-reviews/:id/new"
            element={
              <ProtectedRoute>
                <CreateReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-reviews/:uid/edit/:rid"
            element={
              <ProtectedRoute>
                <EditReview />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={'/auth'} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
