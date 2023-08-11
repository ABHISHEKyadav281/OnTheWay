import React from 'react'
import Login from '../Screens/Login'
import Registration from '../Screens/Registration'
import Welcome from '../Screens/Welcome'

import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './Tabs'

const MainStack=()=> {
    const Stack=createStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  )
}
export default MainStack;
