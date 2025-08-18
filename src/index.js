import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { validateToken } from './redux/slices/userSlice'; // Import the action
import { store } from './redux/store/store';
import reportWebVitals from './reportWebVitals';

// Initialize auth state before rendering the app
const initializeApp = async () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    await store.dispatch(validateToken());  // Dispatch synchronously
  }
  return store;
};

// Create root and render after initialization
const root = ReactDOM.createRoot(document.getElementById('root'));

initializeApp().then((initializedStore) => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={initializedStore}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
});

reportWebVitals();