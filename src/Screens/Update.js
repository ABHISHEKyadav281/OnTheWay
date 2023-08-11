import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

// uname email phoneno pass
// email pass
function Update() {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style={[styles.heading1]}>Welcome to OnTheWay</Text>
                    <View style={styles.closebox}>
                        <Text style={[styles.heading2,{alignSelf:'flex-start'}]}>Update profile</Text>
                        <Text>Name</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder="Full name"
                            keyboardType='default'
                        />
                        <Text>Phone no.</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder="phone number"
                            keyboardType="numeric"
                        />
                        
                        <Text> Password</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder="Password"
                            keyboardType="default"
                        />
                        <Text>previous Password</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder=" previous Password"
                            keyboardType="default"
                        />

                        <TouchableOpacity style={styles.btn} >
                            <Text style={{fontSize:20,color:'white'}}>Update</Text>
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
        height:'100%',
        alignItems: 'center',
        // justifyContent: 'center',
        gap: 10,
        backgroundColor: 'white',
    },
    heading1: {
        width:'100%',
        backgroundColor:'yellow',
        color: 'skyblue',
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
        backgroundColor: 'gray',
        borderRadius: 30,
        overflow:'hidden',
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

export default Update