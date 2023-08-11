import React from 'react'
import Login from '../Screens/Login'
import Registration from '../Screens/Registration'
import Welcome from '../Screens/Welcome'

import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './Tabs'
const Auth=()=> {
    const Stack=createStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tab" component={Tabs} />
    </Stack.Navigator>
  )
}

export default Auth;