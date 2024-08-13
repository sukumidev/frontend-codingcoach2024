import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

// External Components
import { ToastContainer } from 'react-toastify';
import TransitionWrapper from './components/TransitionWrapper';

// Screens
import Login from './screens/login';
import Register from './screens/register';
import Dashboard from './components/Dashboard';
import InterviewSimulator from './components/InterviewSimulator';
import CodeEditor from './components/CodeEditor';
import LoadingScreen from './screens/loading';

// Custom
import 'react-toastify/dist/ReactToastify.css';

// Styles
import './App.sass';

export function App() {
  return (
    <UserProvider>
      <Router>
        <ToastContainer />
        <TransitionWrapper>
          <Routes>
            <Route path="/" element={<LoadingScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </TransitionWrapper>
      </Router>
    </UserProvider>
  );
}