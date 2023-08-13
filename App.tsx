
import React from 'react'
import RootNavigation from './src/Navigation'

// import { Provider } from 'react-redux';
// import Store from './src/Redux/Store';

import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <RootNavigation></RootNavigation>
    </AuthProvider>
  )
}

export default App