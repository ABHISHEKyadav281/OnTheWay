import React from 'react';
import {View, StyleSheet ,SafeAreaView,Text} from 'react-native';

const Rewards = () => {
    return (
        <SafeAreaView>
             <Text style={[styles.heading1]}>OnTheWay</Text>
            <Text>Rewards</Text>
            <View>
                
            </View>
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

export default Rewards;
