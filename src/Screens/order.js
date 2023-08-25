import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import api from '../Api/Auth';
import { useAuth } from '../context/AuthContext';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
// otp send otp



const Order = ({navigation}) => {
  const { token } = useAuth();
  const [locations, setLocations] = useState({ riderLocations: [] });


  const [otp, setOtp] = useState();
  const [place1, setPlace1] = useState('');
  const [place2, setPlace2] = useState('');

  const [orderd, setOrderd] = useState(false);
  const [acptorderd, setAcptOrderd] = useState(false);
  const [startpt, setStartpt] = useState({
    latitude: 23.2547,
    longitude: 77.4029
  })
  const [endpt, setEndpt] = useState({
    latitude: 23.2540,
    longitude: 77.4038,
  })
  const pathCoordinates = [startpt, endpt];

  const haldelAccepter = () => {
    // setEndpt( {
    //   latitude: 23.2540,
    //   longitude: 78.4038,})
      setAcptOrderd(false);
      setOrderd(true);
  }
  const haldeldeleverd = () => {
    navigation.navigate('Rewards')
    // setEndpt( {latitude: null,
    //   longitude: null})
      setOrderd(false);

  }

  const getPlaceName1 = () => {
    const baseUrl = 'https://nominatim.openstreetmap.org/reverse';
    const params = {
      lat: startpt.latitude,
      lon: startpt.longitude,
      format: 'json',
    };

    axios
      .get(baseUrl, { params })
      .then((response) => {
        if (response.data.display_name) {
          // setPlace1(awadhpuri);
          setPlace1(response.data.display_name);
          setError(null);
        } else {
          setPlace1('');
          setError('Place name not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching place name:', error);
        setPlace2('');
        setError('Error fetching place name. Please check the coordinates.');
      });
  };
  const getPlaceName2 = () => {
    const baseUrl = 'https://nominatim.openstreetmap.org/reverse';
    const params = {
      lat: endpt.latitude,
      lon: endpt.longitude,
      format: 'json',
    };

    axios
      .get(baseUrl, { params })
      .then((response) => {
        if (response.data.display_name) {
          // setPlace2(mpNagar);
          setPlace2(response.data.display_name);
          setError(null);
        } else {
          setPlace2('');
          setError('Place name not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching place name:', error);
        setPlace2('');
        setError('Error fetching place name. Please check the coordinates.');
      });
  };


  useEffect(() => {
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const { latitude, longitude } = position.coords;
    //     setStartpt({ latitude, longitude });
    //   },
    //   error => alert("Error getting current location: " + error.message),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );

    const getLoc = async () => {
      try {
        const response = await api.get('/get-location', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.riderLocations[0]);
        if (response.data.riderLocations.length!=0) {
          // setLocations(response.data.riderLocations[0]);
          setLocations(response.data.riderLocations[0]);
          setStartpt({
            latitude: 23.2243,
            longitude: 77.4885,
          })
          setEndpt({
            latitude: 23.2313,
            longitude:77.4310,
          })
         setPlace1( "Awadhpuri");
          setPlace2("BoardOffice");
          setAcptOrderd(true);
          setOtp("");

        }

      } catch (error) {
        console.error('Error loc not found:', error);
      }
    };
    getLoc();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={[styles.heading1]}>OnTheWay</Text>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 23.2243,
            longitude: 77.4885,
            latitudeDelta: 0.02,
            longitudeDelta:0.2 ,
          }}
          customMapStyle={mapStyle}>
          <Marker

            draggable
            coordinate={startpt}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
            pinColor='#87CEEB'
          // image={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9niofrPgHzCju6GzJlAqbyjCkjiNRDjzI9rgOoZJ0rw&s'}}
          // style={{width:0.2,height:0.2,borderRadius:'50%',overflow:'hidden'}} 
          />

          <Marker
            coordinate={endpt}
            title={'Location 2'}
            description={'This is the second location'}
          />

          <Polyline
            coordinates={pathCoordinates}
            strokeColor="green" // Specify the color of the path
            strokeWidth={4}
            lineDashPattern={[15, 5]}
          />
        </MapView>
      </View>
      <View style={{backgroundColor:'white',paddingVertical:20, display:'flex',alignItems:'center',justifyContent:'center',color:'black', height:150, position: 'absolute',
    top: 50,
    left: 0,
    right: 0, borderColor:'pink',elevation:2,borderWidth:1}}>

          <Text style={{color:'black',fontSize:19,fontWeight:'700'}}>No order Assigned</Text>
        </View>
      {acptorderd &&
        <View style={{backgroundColor:'white',paddingVertical:20, display:'flex',alignItems:'center',color:'black', height:150, position: 'absolute',
        top: 50,
        left: 0,
        right: 0, borderColor:'pink',elevation:2,borderWidth:1}}>
          <Text style={{color:'black',fontSize:19,fontWeight:'600'}}>{place1} <Text style={{color:'red'}}> To </Text>  {place2}</Text>
          <Text style={styles.btn} onPress={haldelAccepter}>accept</Text>
        </View>
      }

      {orderd &&
        <View style={{backgroundColor:'white' ,paddingVertical:20,display:'flex',alignItems:'center',color:'black', height:150, position: 'absolute',
        top: 50,
        left: 0,
        right: 0, borderColor:'pink',elevation:2,borderWidth:1}}> 
          <TextInput
            style={styles.input}
            onChangeText={setOtp}
            value={otp}
            placeholder="Enter otp"
            keyboardType="numeric"
          />
          <Text style={styles.btn}  onPress={haldeldeleverd}>Complete</Text>
        </View>
      }
    </SafeAreaView>
  );
};



const mapStyle = [];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 200,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
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
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  input: {
    width: '90%',
    paddingHorizontal: 30,
    borderRadius: 30,
    overflow:'hidden',
    backgroundColor:'white',
    color:'black',
    borderColor:'gray',
    borderWidth:1
},
btn: {
  width:'60%',
  alignItems:'center',
   backgroundColor: 'springgreen',
   borderRadius: 30,
   paddingVertical: 6,
   paddingHorizontal: 10,
   color: 'white',
   fontSize: 30,
   fontWeight: 'bold',
   elevation: 6,
   textAlign:'center',
   marginVertical:10,
}
});

export default Order;
