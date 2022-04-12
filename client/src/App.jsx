import React from "react";
import "./App.css";
import {
  Routes,
  Navigate,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import ResultScreen from "./pages/ResultScreen";
import MainScreen from "./components/MainScreen";
import InitScreen from "./pages/InitScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ServiceScreen from "./pages/ServiceScreen";
import RatingScreen from "./pages/RatingScreen";


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

function App() {
  return (
    <div className="app--container">
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="inicio" />} />
            <Route path="/inicio" element={<InitScreen />} />
            <Route path="/resultados" exact element={<ResultScreen />} />
            <Route path="/registros" element={<RegisterScreen />} />
            <Route path="/servico" element={<ServiceScreen />} />
            <Route path="/avaliacao" element={<RatingScreen />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
