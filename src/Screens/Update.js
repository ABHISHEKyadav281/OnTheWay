import React, { useState } from 'react'

import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';

import { launchImageLibrary } from 'react-native-image-picker';
import api from '../Api/Auth';
import { useAuth } from '../context/AuthContext';

const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};
function Update({ navigation }) {

    const {userProfile}=useAuth();

    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const handleupdate = async () => {
        try {

            {
                handleUploadPhoto();
                const response = await api.put('/profile', {
                    name: fullName,
                    phoneNumber: phoneNumber,
                    newPassword: newPassword,
                    password: oldPassword,
                });

                if (response.data.success) {

                    console.log('updation successful');
                    navigation.navigate('Tab');
                } else {

                    console.log('Updation failed:', response.data.msg);
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const [photo, setPhoto] = useState(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            console.log(response.assets[0].uri);
            if (response) {
                setPhoto(response);
            }
        });
    };

    const handleUploadPhoto = () => {
        fetch(`http://192.168.40.159:3000/api/users/upload-profile`, {
            method: 'POST',
            body: createFormData(photo, { userId: userProfile._id }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log('response', response);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={[styles.heading1]}>Welcome to OnTheWay</Text>
                <View style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:'white',paddingBottom:'40%'}}>
                    <View style={styles.closebox}> 
                        <Text style={[styles.heading2, { alignSelf: 'flex-start' }]}>Update profile</Text>


                        <Text>DP</Text>

                        <View style={styles.btnn}>
                            {photo && (
                                <>
                                    <Image
                                        source={{ uri: photo.assets[0].uri }}
                                        style={{ width: 100, minHeight: 100, objectFit: 'cover', marginVertical: 5, borderRadius: 50, borderColor: 'gray' }}
                                    />
                                    {/* <Text style={[styles.input,{display:'flex',justifyContent:'center',paddingVertical:15,backgroundColor:'yellow'}]}  onPress={handleUploadPhoto}>Upload Photo</Text> */}
                                </>
                            )}
                            <Text style={[styles.input, { display: 'flex', justifyContent: 'center', paddingVertical: 15 }]} onPress={handleChoosePhoto}>Choose Photo</Text>
                        </View>

                        <Text>Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setFullName}
                            value={fullName}
                            placeholder="Full name"
                            keyboardType='default'
                        />

                        <Text>Phone no.</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPhoneNumber}
                            value={phoneNumber}
                            placeholder="phone number"
                            keyboardType="numeric"
                        />

                        <Text> Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNewPassword}
                            value={newPassword}
                            placeholder="Password"
                            keyboardType="default"
                        />
                        <Text>previous Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setOldPassword}
                            value={oldPassword}
                            placeholder=" previous Password"
                            keyboardType="default"
                        />
                    </View>

                        <TouchableOpacity style={[styles.btn, { justifyContent: 'center' }]} onPress={handleupdate}>
                            <Text style={{ fontSize: 20, color: 'white' }} >Update</Text>
                        </TouchableOpacity>
                    
                </View>




            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    closebox: {
        display: 'flex',
        width:'100%',
        alignItems: 'flex-start',
        gap: 10,
        backgroundColor: 'white',
        padding: 15,
        // paddingBottom: '40%'
    },
    heading1: {
        width: '100%',
        backgroundColor: '#0071dc',
        color: 'white',
        fontSize: 22,
        fontWeight: '900',
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    heading2: {
        color: 'black',
        paddingLeft: 15,
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 20,
    },
    input: {
        width: '90%',
        height: 50,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 5,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom:5,
    },
    btn: {
        width: '40%',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 30,
        paddingVertical: 6,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        elevation: 6,
    },
    btnn: {
        width: '100%',
        height: 'auto',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -15
    },

})

export default Update