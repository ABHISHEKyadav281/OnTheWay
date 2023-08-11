import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, Pressable } from 'react-native';

const Account = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.upperbox}>
                    <View style={{width: 80,backgroundColor:'red',height: 80,borderRadius:40,overflow: 'hidden',marginBottom:15}}>
                        <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/331/828/small/delivery-boy-riding-scooter-with-cityline-background-vector.jpg' }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </View>
                    <Text style={{fontWeight:'800',fontSize:22,fontStyle:'italic'}}>Abhishek Yadav</Text>
                    <Text style={{fontWeight:'800',fontSize:12,fontStyle:'italic'}}> <Text style={{fontWeight:'800',fontSize:12,color:'green'}}>◉</Text> online</Text>
                </View>
                <View style={styles.lowerbox}>
                    
                    <Pressable style={styles.taag}><Text style={styles.tag}>Update profile</Text></Pressable>
                    <Pressable style={styles.taag}><Text style={styles.tag}>History</Text></Pressable>
                    <Pressable style={styles.taag}><Text style={styles.tag}>Verify yourself</Text></Pressable>
                    <Pressable style={styles.taag}><Text style={styles.tag}>Rewards</Text></Pressable>
                    <Pressable style={styles.taag}><Text style={styles.tag}>Help & support</Text></Pressable>
                    <Pressable style={styles.taag}><Text style={styles.tag}>About</Text></Pressable>
                    <Pressable style={styles.taag}><Text style={styles.tag}>Logout</Text></Pressable>
                    
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 15,
    },
    upperbox: {
        width: '100%',
        height: '32%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lowerbox: {
        width: '100%',
        height: '50%',
        // backgroundColor: 'red',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 15,
    },
    taag: {
        width: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 25,
        fontSize:22,
        paddingVertical:7,
        backgroundColor:'#F5F5F5',paddingHorizontal:20,
        borderRadius:20,
    },
    tag: {
        fontSize:22,
        fontWeight:'700',
        fontFamily:'Gilroy'
    },
    
    

})

export default Account;
