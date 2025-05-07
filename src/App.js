<<<<<<< HEAD
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./routes";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <AppRoutes />
    </HelmetProvider>
  );
}
=======
import './App.css'
import ScrollToTop from './components/ScrollToTop';
import AppRoutes from './routes';


function App() {

  return (
    <>

      <ScrollToTop />
      <AppRoutes />
     
    </>
  );
}

>>>>>>> d918fe2 (cahnges by abdul qavi)
export default App;
