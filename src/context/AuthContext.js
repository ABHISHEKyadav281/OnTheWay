import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  const login = (userProfileData,authToken) => {
    setUserProfile(userProfileData);
    setIsAuthenticated(true);
    setToken(authToken);
    // console.log("yogi "+userProfile);

  };

  const logout = () => {
    setUserProfile(null);
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ userProfile, isAuthenticated,token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};