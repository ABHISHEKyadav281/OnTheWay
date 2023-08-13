import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

const Home = () => {
    const [startpt, setStartpt] = useState('');
    const [endpt, setEndpt] = useState('');
    return (
        <SafeAreaView>
            <Text style={[styles.heading1]}>OnTheWay</Text>
            <View style={styles.entrybox}>

           
            <Text style={{fontSize:18,fontWeight:'600',marginBottom:10}}>Start your Journey</Text>
            <TextInput
                style={styles.input}
                onChangeText={setStartpt}
                value={startpt}
                placeholder="Starting Location"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={setEndpt}
                value={endpt}
                placeholder="End Location"
                keyboardType="default"
            />
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#1877f2' }]} onPress={ ()=>(console.log("first"))}>
                <Text style={{ fontSize: 20, color: 'white' }} >Post</Text>
            </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading1: {
        width: '100%',
        backgroundColor: '#0071dc',
        color: 'white',
        fontSize: 22,
        fontWeight: '900',
        height: 50,
        paddingVertical: 10,
        paddingLeft: 10,
    },
    entrybox:{
        width:'100%',
        // height:'60%',
        borderWidth:.5,
        borderColor:"white",
        elevation:8,
        display:'flex',
        alignItems:'center',
        borderRadius:20,
        padding:20,
        backgroundColor:'white',
        marginTop:10,
    },
    input: {
        width: '100%',
        paddingHorizontal: 30,
        borderRadius: 30,
        overflow: 'hidden',
        borderColor: 'gray',
        borderWidth: 2,
        color: 'black',
        marginBottom:10,
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
        marginVertical:10,
    }
})

export default Home;
