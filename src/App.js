import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import { validateToken } from './redux/slices/userSlice';
import AppRoutes from './routes';

function App() {
  const dispatch = useDispatch();

  // Add this useEffect to validate token on app load
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(validateToken());
    }
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;