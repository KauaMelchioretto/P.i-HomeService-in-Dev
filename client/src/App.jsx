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
import Login from "./pages/Login";
import UserRegister from "./pages/UserRegister";

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
            <Route path="/login" element={<Login/>} />
            <Route path="/registroUsuario" element={<UserRegister/>} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
