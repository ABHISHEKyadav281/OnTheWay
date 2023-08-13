import React from 'react'
import Login from '../Screens/Login'
import Registration from '../Screens/Registration'
import Welcome from '../Screens/Welcome'

import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './Tabs'
import Update from '../Screens/Update'
import Rewards from '../Screens/Rewards'
import History from '../Screens/History'
import Help from '../Screens/Help'
import About from '../Screens/About'
import Verify from '../Screens/Verify'
const Auth = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown: false, // Hide the navigation header for all screens
    }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Tab" component={Tabs} />
      <Stack.Screen name="Update" component={Update} />
      <Stack.Screen name="Rewards" component={Rewards} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Verify" component={Verify} />
    </Stack.Navigator>
  )
}

export default Auth;