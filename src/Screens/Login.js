import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import * as Font from "expo-font";
// import {FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Login({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style={[styles.heading1]}>Welcome to OnTheWay</Text>
                    <View style={styles.closebox}>
                        <Text style={[styles.heading2, { alignSelf: 'flex-start' }]}>Login here</Text>

                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder="email"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder="Password"
                            keyboardType="default"
                        />
                        <Text style={{ color: 'blue', alignSelf: 'flex-start', marginTop: -8, paddingLeft: 5, marginBottom: 15 }} onPress={() => navigation.navigate('Registration')}>forgot Password</Text>

                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#1877f2' }]} onPress={() => navigation.navigate('Tab')}>
                            <Text style={{ fontSize: 20, color: 'white' }} >Log in</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>OR</Text>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#fdcb09' }]} onPress={() => navigation.navigate('Tab')} >
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
        // justifyContent: 'center',
        gap: 10,
        backgroundColor: 'white',
        padding: 15,
    },
    heading1: {
        width: '100%',
        backgroundColor: 'yellow',
        color: 'skyblue',
        fontSize: 22,
        fontWeight: '900',
        height: 50,
        paddingVertical: 10,
        paddingLeft: 10,
    },
    heading2: {
        color: 'black',
        paddingLeft: 15,
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 25,
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
    }
})

export default Login