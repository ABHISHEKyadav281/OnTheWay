import React from 'react';
import {View, StyleSheet} from 'react-native';
import Auth from './Auth';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Auth></Auth>
            {/* <MainStack></MainStack> */}
       </NavigationContainer>
    );
}

const styles = StyleSheet.create({})

export default RootNavigation;
