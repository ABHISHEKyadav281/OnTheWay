import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../Api/Auth';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

const Home = () => {
  const { token } = useAuth();
  const [p1, setP1] = useState('....');
  const [p2, setP2] = useState('....');
  const [error, setError] = useState(null);
  const [placeName1, setPlaceName1] = useState('');
  const [coordinates1, setCoordinates1] = useState({
    latitude: null,
            longitude: null
  });
  const [placeName2, setPlaceName2] = useState('');
  const [coordinates2, setCoordinates2] = useState({
    latitude: null,
            longitude: null
  });

  const getLocationCoordinates1 = () => {
    const baseUrl = 'https://nominatim.openstreetmap.org/search';
    const params = {
      q: placeName1,
      format: 'json',
    };

    axios.get(baseUrl, { params })
      .then(response => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];

          setCoordinates1({
            latitude: lat,
            longitude: lon
          })
          setError(null);
        } else {
          setCoordinates2({
            latitude: null,
            longitude: null
          })
          setError("Location not found");
        }
      })
      .catch(error => {
        console.error("Error fetching coordinates:", error);
        setLatitude(null);
        setLongitude(null);
        setError("Error fetching coordinates. Please check the location name.");
      });
  }

  const getLocationCoordinates2 = () => {
    const baseUrl = 'https://nominatim.openstreetmap.org/search';
    const params = {
      q: placeName2,
      format: 'json',
    };

    axios.get(baseUrl, { params })
      .then(response => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];

          setCoordinates2({
            latitude: lat,
            longitude: lon,
          })
          setError(null);
        } else {
          setCoordinates2({
            latitude: null,
            longitude: null,
          })
          setError("Location not found");
        }
      })
      .catch(error => {
        console.error("Error fetching coordinates:", error);
        setLatitude(null);
        setLongitude(null);
        setError("Error fetching coordinates. Please check the location name.");
      });
  }


  const handleUpdateStatus = async () => {
    // try {
      getLocationCoordinates1();
      getLocationCoordinates2();

      setP1(placeName1);
      setP2(placeName2);
      setPlaceName1('');
      setPlaceName2('');

      console.log("cord1: ", coordinates1, "  cord2: ", coordinates2);

      // if (coordinates1 && coordinates2) {
      //   // Now you can use the coordinates in your post request
      //   const response = await api.post('/upload-status', {
      //     startingpt: coordinates1,
      //     destinationpt: coordinates2,
      //   }, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
  
      //   if (response.data && response.data.message) {
      //     console.log('User status updated successfully');
      //   }
      // }
    // } catch (error) {
    //   console.error('Error updating user status:', error);
    // }
  };
  



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={[styles.heading1]}>OnTheWay</Text>
      
     

      <View style={styles.entrybox}>
        <Text style={{ fontSize: 26, fontWeight: '600', marginBottom: 10 ,color:'black' ,marginBottom:20}}>Today's Trip</Text>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 ,color:'green'}}>{p1} <Text style={{color:'black'}}> To </Text> {p2}</Text>
        
      </View>
      <View style={styles.entrybox}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 ,color:'black'}}>Update your Trip</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPlaceName1(text)}
          value={placeName1}
          placeholder="Starting Location"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPlaceName2}
          value={placeName2}
          placeholder="End Location"
          keyboardType="default"
        />
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#1877f2' }]} onPress={handleUpdateStatus}>
          <Text style={{ fontSize: 20, color: 'white' }} >Update</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}


const mapStyle = [];
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
  entrybox: {
    width: '100%',
    // height:'60%',
    borderWidth: .5,
    borderColor: "white",
    elevation: 8,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  input: {
    width: '100%',
    paddingHorizontal: 30,
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: 'gray',
    borderWidth: 2,
    color: 'black',
    marginBottom: 10,
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
    marginVertical: 10,
  },
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
   backgroundColor:"red",
   minHeight:650,
   flex:1
  },
})

export default Home;
