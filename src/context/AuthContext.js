import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userProfileData) => {
    setUserProfile(userProfileData);
    console.log(userProfile);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserProfile(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userProfile, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};