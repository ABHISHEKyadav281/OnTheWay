import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Linking } from 'react-native'

// uname email phoneno pass
// email pass
function Registration({navigation}) {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style={[styles.heading1]}>OnTheWay</Text>
                    <View style={styles.closebox}>
                        <Text style={[styles.heading2,{alignSelf:'flex-start'}]}>Create Account</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder="Full name"
                            keyboardType='default'
                        />
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder="phone number"
                            keyboardType="numeric"
                        />
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

                        <TouchableOpacity style={styles.btn} >
                            <Text style={{fontSize:20,color:'white'}}  onPress={()=>navigation.navigate('Tab')}>Register</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}  onPress={()=>navigation.navigate('Login')}>Already have an account ? <Text style={{ color: 'blue', fontSize: 16, fontWeight: 'bold' }}>
                        Login
                    </Text>
                    </Text>
                    </View>

                </View>
                


            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    closebox: {
        display: 'flex',
        height:'100%',
        alignItems: 'center',
        // justifyContent: 'center',
        gap: 10,
        backgroundColor: 'white',
    },
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
    heading2: {
        color: 'black',
        paddingLeft:15,
        fontSize:18,
        fontWeight:'bold',
        paddingTop:50,
    },
    input: {
        width: '90%',
        paddingHorizontal: 30,
        borderRadius: 30,
        overflow:'hidden',
        borderColor:'gray',
        borderWidth:2,
        color:'black'
    },
    btn: {
       width:'40%',
       alignItems:'center',
        backgroundColor: 'blue',
        borderRadius: 30,
        paddingVertical: 6,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default Registration