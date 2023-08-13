import React from 'react';
import {View, StyleSheet, Text,SafeAreaView} from 'react-native';

const About = () => {
    return (
        <SafeAreaView>
             <Text style={[styles.heading1]}>OnTheWay</Text>
            <Text>About</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
})

export default About;
