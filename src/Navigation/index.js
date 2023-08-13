import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import Auth from './Auth';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import api from '../Api/Auth';
import { useAuth } from '../context/AuthContext';
const RootNavigation = () => {
    
const {isAuthenticated}=useAuth();
    return (
        <NavigationContainer>
            { isAuthenticated ? <MainStack /> : <Auth />}
              
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({})

export default RootNavigation;
