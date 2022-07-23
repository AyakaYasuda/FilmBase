import { useSelector, useDispatch } from 'react-redux';
import { setError, resetError } from '../redux/errorSlice';

const useError = () => {
  const dispatch = useDispatch();
  const { message, status } = useSelector((state) => state.error);

  const resetErrorHandler = () => {
    dispatch(resetError());
  };

  const setErrorHandler = (message, status) => {
    dispatch(setError({ message, status }));
  };

  return { message, status, resetErrorHandler, setErrorHandler };
};

export default useError;
