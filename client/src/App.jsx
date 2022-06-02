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
import LoginPage from "./pages/LoginPage";
import UserRegister from "./pages/UserRegister";
import { AuthProvider } from "./containers/PrivateContainer";
import RequireAuth from "./containers/RequireAuth";

function App() {
  return (
    <div className="app--container">
      <main>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate replace to="inicio" />} />
              <Route path="/inicio" element={<InitScreen />} />
              <Route path="/resultados" exact element={<ResultScreen />} />
              <Route
                path="/registros"
                element={
                  <RequireAuth>
                    <RegisterScreen />
                  </RequireAuth>
                }
              />
              <Route path="/servico" element={<ServiceScreen />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registroUsuario" element={<UserRegister />} />
            </Routes>
          </Router>
        </AuthProvider>
      </main>
    </div>
  );
}

export default App;
