import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const Registration = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://192.168.40.159:3000/api/users/registration', {
        name: fullName,
        email,
        phoneNumber,
        password,
      });

      if (response.data.success) {
        console.log('Registration successful');
        navigation.navigate('Login');
      } else {
        console.log('Registration failed:', response.data.msg);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    //   backgroundColor: '',
      padding: 20,
      color:'black',
    },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'blue',
      marginTop: 20,
    },
    subheading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      color:'black',
      justifyContent:'flex-start',
    },
    input: {
      width: '90%',
      paddingHorizontal: 30,
      borderRadius: 30,
      overflow: 'hidden',
      borderColor: 'gray',
      borderWidth: 2,
      marginVertical: 10,
      color: 'black', 
    //   placeholderTextColor:'black',
    //   backgroundColor:'gray',
    },
    btn: {
      width: '40%',
      backgroundColor: 'blue',
      borderRadius: 30,
      paddingVertical: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    btnText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    loginText: {
      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
    },
    loginLink: {
      color: 'blue',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>OnTheWay</Text>
        <Text style={styles.subheading}>Create Account</Text>
        <TextInput
          style={[styles.input,{color:'black'}]}
          onChangeText={setFullName}
          value={fullName}
          placeholder="Full name"
          placeholderTextColor="gray" 
        />
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="Phone number"
          placeholderTextColor="gray" 
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="gray" 
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="gray" 
          secureTextEntry
        />
        <TouchableOpacity style={styles.btn} onPress={handleRegistration}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </View>
    </ScrollView>
  );
};



export default Registration;
