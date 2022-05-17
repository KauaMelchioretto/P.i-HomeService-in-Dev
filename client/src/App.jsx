import React from "react";
import "./App.css";
import {
  Routes,
  Navigate,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import ResultScreen from "./pages/ResultScreen";
import InitScreen from "./pages/InitScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ServiceScreen from "./pages/ServiceScreen";
import About from "./pages/About";

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
            <Route path="/sobre" element={<About />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
