import React from 'react';
import { useUser } from '../contexts/UserContext';
import Chatbot from './Chatbot';

function Dashboard() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <p>Welcome, {user.name}!</p>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
      </div>
      <Chatbot />
    </div>
  );
}

export default Dashboard;
