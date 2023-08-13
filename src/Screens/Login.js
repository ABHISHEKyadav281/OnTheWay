import React, { useState } from 'react'
import api from '../Api/Auth';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import * as Font from "expo-font";
// import {FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useDispatch } from 'react-redux';
// import { login,logout } from '../Redux/Actions/AuthActions';
import { useAuth } from '../context/AuthContext';


function Login({ navigation }) {
const {login}=useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      if (response.data.token) {
        login(response.data);
        console.log('Login successful');
        setToken(response.data.token);
        navigation.navigate('Tab');
      } else {
        console.log('Login failed:', response.data.msg);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleWalmart = async () => {
    try {
      const response = await api.post('/walmart-register');

      if (response.data && response.data.token) {
        login(response.data);
        console.log(response.data);
        console.log('Login successful');
        setToken(response.data.token);
        navigation.navigate('Tab');
      } else {
        console.log('Login failed:', response.data.msg);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                <Text style={[styles.heading1]}>OnTheWay</Text>
                    <View style={styles.closebox}>
                        <Text style={ { alignSelf: 'flex-start',fontSize:22,fontWeight:'800',color:'black' }}>Login here</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="email"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Password"
                            keyboardType="default"
                        />
                        <Text style={{ color: 'blue', alignSelf: 'flex-start', marginTop: -8, paddingLeft: 5, marginBottom: 15 }} onPress={() => navigation.navigate('Registration')}>forgot Password</Text>

                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#1877f2' }]} onPress={handleLogin}>
                            <Text style={{ fontSize: 20, color: 'white' }} >Log in</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>OR</Text>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#fdcb09' }]} onPress={handleWalmart} >
                            <Text style={{ fontSize: 18, color: 'white' }}><Icon name='arrow-forward' size={20}  ></Icon> Continue with Walmart</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#1877f2' }]} onPress={() => navigation.navigate('Tab')}>
                            <Text style={{ fontSize: 18, color: 'white', }}><Icon name='arrow-forward' size={20}  ></Icon> Continue with Google</Text>
                        </TouchableOpacity>
                    </View>

                </View>



            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    closebox: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        flex:1,
        gap: 10,
        backgroundColor: 'white',
        padding: 15,
        paddingBottom:'94%'
    },
    // 
    heading1: {
        width:'100%',
        backgroundColor:'#0071dc',
        color: 'white',
        fontSize:22,
        fontWeight:'900',
        height:50,
        paddingVertical:10,
        paddingLeft:10,
    },
    input: {
        width: '100%',
        paddingHorizontal: 30,
        borderRadius: 30,
        overflow: 'hidden',
        borderColor:'gray',
        borderWidth:2,
        color:'black'
    },
    btn: {
        width: '80%',
        alignItems: 'center',
        borderRadius: 30,
        paddingVertical: 6,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        elevation: 6,
    }
})

export default Login