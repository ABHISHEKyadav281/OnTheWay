import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, Pressable } from 'react-native';
import api from '../../Backend/Auth';
import { useAuth } from '../context/AuthContext';

const Account = ({navigation}) => {

    const { userProfile, isAuthenticated, login, logout,token } = useAuth();
  console.log(userProfile);
    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            if (isAuthenticated) {
              const response = await api.get('/profile',{  headers: {
                Authorization: `Bearer ${token}`,
              }, }); 
    
            //   if (response.data) {
            //     login(response.data);
            //   }
            }
          } catch (error) {
            // console.error('Error fetching user profile:', error);
          }
        };
    
        fetchUserProfile();
      }, [isAuthenticated, login]); 

      const handleLogout=()=>{
          navigation.navigate('Welcome');
          logout();
      }

    return (
        <SafeAreaView>
            <Text style={[styles.heading1]}>OnTheWay</Text>
            <View style={styles.container}>
                <View style={styles.upperbox}>
                    <View style={{width: 80,backgroundColor:'red',height: 80,borderRadius:40,overflow: 'hidden',marginBottom:15}}>
                        {userProfile? <Image source={{ uri:userProfile.avatar }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        :
                        <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/331/828/small/delivery-boy-riding-scooter-with-cityline-background-vector.jpg' }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        }
                        <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/331/828/small/delivery-boy-riding-scooter-with-cityline-background-vector.jpg' }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </View>
                    <Text style={{fontWeight:'800',fontSize:22,fontStyle:'italic'}}>{userProfile?.name}</Text>
                    <Text style={{fontWeight:'800',fontSize:12,fontStyle:'italic'}}> <Text style={{fontWeight:'800',fontSize:12,color:'green'}}>◉</Text> online</Text>
                </View>
                <View style={styles.lowerbox}>
                    
                    <Pressable style={styles.taag} onPress={() => navigation.navigate('Update')}><Text style={styles.tag}>Update profile</Text></Pressable>
                    <Pressable style={styles.taag} onPress={() => navigation.navigate('History')}><Text style={styles.tag}>History</Text></Pressable>
                    <Pressable style={styles.taag} onPress={() => navigation.navigate('Verify')}><Text style={styles.tag}>Verify yourself</Text></Pressable>
                    <Pressable style={styles.taag} onPress={() => navigation.navigate('Rewards')}><Text style={styles.tag}>Rewards</Text></Pressable>
                    <Pressable style={styles.taag} onPress={() => navigation.navigate('Help')}><Text style={styles.tag}>Help & support</Text></Pressable>
                    <Pressable style={styles.taag} onPress={() => navigation.navigate('About')}><Text style={styles.tag}>About</Text></Pressable>
                    <Pressable style={styles.taag} onPress={handleLogout}><Text style={styles.tag}>Logout</Text></Pressable>
                    
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
        backgroundColor:'white',
        paddingHorizontal:20,
        borderRadius:20,
        elevation: 6,
    },
    tag: {
        fontSize:22,
        fontWeight:'700',
        fontFamily:'Gilroy',
        color:'gray'
    },
    
    

})

export default Account;
