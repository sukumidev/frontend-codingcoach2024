import React, { createContext, useContext, useState, useEffect } from 'react';
import { isUserLoggedIn } from '../services/Auth';
import { logout as logoutService } from '../services/Auth';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = isUserLoggedIn();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []); 

  const logout = async () => {
    setUser(null);
    await logoutService();
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
