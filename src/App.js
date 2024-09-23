import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { Provider } from 'react-redux';
import  store  from './contexts/redux/store';

// External Components
import { ToastContainer } from 'react-toastify';
import TransitionWrapper from './components/TransitionWrapper';

import { NavigationBar } from "./components/NavigationBar";
import { SideBar } from './components/Sidebar';

// Screens
import Login from './screens/login';
import Register from './screens/register';
import Dashboard from './screens/dashboard';
import InterviewSimulator from './components/InterviewSimulator';
import CodeEditor from './components/CodeEditor';
import Loading from './screens/loading';
import Chatbot from './screens/chatbot';

// Custom
import 'react-toastify/dist/ReactToastify.css';

// Styles
import './App.sass';


export function MainLayout() {
  return (
    <div className='Outlet'>
      <SideBar />
      <div className='OutletMain'>
        <NavigationBar />
        <Outlet />
      </div>
    </div>
  );
}

export function SimpleLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export function RouterLayout() {
  return (
    <>
      <ToastContainer />
      <TransitionWrapper>
      <Routes>
          <Route element={<SimpleLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Loading />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chatbot />} />
          </Route>
      </Routes>
      </TransitionWrapper>
    </>
  );
}


export function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <UserProvider>
          <BrowserRouter>
            <RouterLayout />
          </BrowserRouter>
        </UserProvider>
      </Provider>
    </div>
  );
}