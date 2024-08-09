import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import InterviewSimulator from './components/InterviewSimulator';
import CodeEditor from './components/CodeEditor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de importar los estilos de Toastify
import { UserProvider } from './contexts/UserContext';

export function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <ToastContainer />
          <h1>Bienvenido a Coding Coach</h1>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview" element={<InterviewSimulator />} />
            <Route path="/editor" element={<CodeEditor />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}
