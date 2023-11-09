
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../../Backend/Auth';
import ImagePicker from 'react-native-image-picker';

import { launchImageLibrary } from 'react-native-image-picker';

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


const Verify = () => {
  const {  isAuthenticated,login,token } = useAuth();
  const [isVerified, setIsVerified ] = useState(false);

 
useEffect(() => {
  const fetchData = async () => {
    try {
      console.log("hii")
      const response = await api.get('/get-verification',{  headers: {
        Authorization: `Bearer ${token}`,
      }, });
      // console.log("hii2")
        console.log(response.data.Verification);
      setIsVerified(response.data.Verification);
        console.log("first")
      
    } catch (error) {
      console.error('Error fetching verification status:', error);
    }
  };

  fetchData();
}, []);
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
    fetch(`http://192.168.40.159:3000/api/users/verify-status`, {
      method: 'POST',
      body: createFormData(photo, { userId: isVerified._id }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
        setIsVerified(true);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <SafeAreaView>
      <Text style={[styles.heading1]}>OnTheWay</Text>
      {
        
        isVerified?<View style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'white',width:'100%',height:'90%',padding:20}}>
          <Image source={{ uri:"data:image/png;base64,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" }}
                style={{ width: 180, minHeight: 250, objectFit: 'cover', borderColor: 'gray', borderRadius:90 }}></Image>
        </View>:
      <View style={styles.closebox}>
        <Text style={{ fontSize: 22, color: 'black', paddingVertical: 12,fontWeight:'800' }}>Upload Adhar</Text>
        <View style={styles.btnn}>
          {photo ? (
            <>
              <Image
                source={{ uri: photo.assets[0].uri }}
                style={{ width: "90%", minHeight: 180, objectFit: 'cover', marginVertical: 8, borderRadius: 10, borderColor: 'gray' }}
              />
              <Text style={[styles.input, { display: 'flex', justifyContent: 'center', paddingVertical: 15 }]} onPress={handleChoosePhoto}>Choose another Photo</Text>
              <Text style={[styles.input, { display: 'flex', height: 'auto', paddingHorizontal: '35%', paddingVertical: 15, backgroundColor: '#1877f2', fontSize: 22, fontWeight: '800',marginVertical:30 ,color:'white'}]} onPress={handleUploadPhoto}>Verify</Text>
            </>
          ) :
            <Text style={[styles.input, { display: 'flex', justifyContent: 'center', paddingVertical: 15 }]} onPress={handleChoosePhoto}>Choose Photo</Text>
          }
        </View>
        <Text style={{fontSize:18,fontWeight:'600',marginTop:35,lineHeight:22}}>Uploading an Aadhaar card involves submitting a digital copy of the Aadhaar card document to an online platform or system. Aadhaar is a 12-digit unique identification number issued by the Indian government to residents of India. It serves as a proof of identity and address.</Text>
      </View>
        }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closebox: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    // gap: 10,
    backgroundColor: 'white',
    padding: 15,
    paddingBottom:'100%'
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
    marginBottom: 5,
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

export default Verify;




