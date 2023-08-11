import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator}from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons'
import Rewards from '../Screens/Rewards';
import Order from '../Screens/order';
import Home from '../Screens/Home';
import Account from '../Screens/Account';
// import {modrateScale} from 'react-native-size-matters'
const Tabs = () => {
    const Tab=createBottomTabNavigator();
    return (
       <Tab.Navigator>
        {/* tabBarOptions={{
            activeTintColor:'#062743',
        inactiveTintColor:'#9ea9b3',

        // tabStyle:{
        //     marginVertical:modrateScale(10),
        // },
        showLabel:false,

    }} */}
    
        <Tab.Screen name="Home"
         component={Home}
          options={{
            tabBarIcon:({size,color})=>(
                <Icon name="home-sharp" size={size} color={color} />
            )
        }} />
        <Tab.Screen name="Order"
         component={Order}
          options={{
            tabBarIcon:({size,color})=>(
                <Icon name="home-sharp" size={size} color={color} />
            )
        }} />
        <Tab.Screen name="Rewards"
         component={Rewards}
          options={{
            tabBarIcon:({size,color})=>(
                <Icon name="heart-sharp" size={size} color={color} />
            )
        }} />
        <Tab.Screen name="Account"
         component={Account}
          options={{
            tabBarIcon:({size,color})=>(
                <Icon name="person-sharp" size={size} color={color} />
            )
        }} />
       </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Tabs;
