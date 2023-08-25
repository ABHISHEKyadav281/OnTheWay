import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons'
import CustomIconName from 'react-native-vector-icons/FontAwesome5';
import Rewards from '../Screens/Rewards';
import Order from '../Screens/order';
import Home from '../Screens/Home';
import Account from '../Screens/Account';
import History from '../Screens/History';
// import {modrateScale} from 'react-native-size-matters'
const Tabs = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#0071dc',
                // activeTintColor: '#062743',
                inactiveTintColor: '#9ea9b3',
                showLabel: false,
            }}
        >

            <Tab.Screen name="Account"
                component={Account}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="person-sharp" size={size} color={color} />
                    )
                }} />
            <Tab.Screen name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="home-sharp" size={size} color={color} />
                    )
                }} />
            <Tab.Screen name="Order"
                component={Order}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <CustomIconName name='map-marker' size={size} color={color} />
                    )
                }} />
            <Tab.Screen name="History"
                component={History}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <CustomIconName name='history' size={size} color={color} />
                    )
                }} />

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Tabs;
