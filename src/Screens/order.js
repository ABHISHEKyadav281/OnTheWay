import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const Order = () => {


return (
  <SafeAreaView style={{flex: 1}}>
    <Text style={[styles.heading1]}>OnTheWay</Text>
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude:  23.2547,
          longitude: 77.4029,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapStyle}>
        <Marker
          draggable
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          onDragEnd={
            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
          }
          title={'Test Marker'}
          description={'This is a description of the marker'}
        />
      </MapView>
    </View>
  </SafeAreaView>
);
};

const mapStyle = [
{elementType: 'geometry', stylers: [{color: 'white'}]},
{elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
{elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
{
  featureType: 'administrative.locality',
  elementType: 'labels.text.fill',
  stylers: [{color: '#d59563'}],
},
{
  featureType: 'poi',
  elementType: 'labels.text.fill',
  stylers: [{color: '#d59563'}],
},
{
  featureType: 'poi.park',
  elementType: 'geometry',
  stylers: [{color: '#263c3f'}],
},
{
  featureType: 'poi.park',
  elementType: 'labels.text.fill',
  stylers: [{color: '#6b9a76'}],
},
{
  featureType: 'road',
  elementType: 'geometry',
  stylers: [{color: '#38414e'}],
},
{
  featureType: 'road',
  elementType: 'geometry.stroke',
  stylers: [{color: '#212a37'}],
},
{
  featureType: 'road',
  elementType: 'labels.text.fill',
  stylers: [{color: '#9ca5b3'}],
},
{
  featureType: 'road.highway',
  elementType: 'geometry',
  stylers: [{color: '#746855'}],
},
{
  featureType: 'road.highway',
  elementType: 'geometry.stroke',
  stylers: [{color: '#1f2835'}],
},
{
  featureType: 'road.highway',
  elementType: 'labels.text.fill',
  stylers: [{color: '#f3d19c'}],
},
{
  featureType: 'transit',
  elementType: 'geometry',
  stylers: [{color: '#2f3948'}],
},
{
  featureType: 'transit.station',
  elementType: 'labels.text.fill',
  stylers: [{color: '#d59563'}],
},
{
  featureType: 'water',
  elementType: 'geometry',
  stylers: [{color: '#17263c'}],
},
{
  featureType: 'water',
  elementType: 'labels.text.fill',
  stylers: [{color: '#515c6d'}],
},
{
  featureType: 'water',
  elementType: 'labels.text.stroke',
  stylers: [{color: '#17263c'}],
},
];
const styles = StyleSheet.create({
container: {
  position: 'absolute',
  top: 50,
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
});

export default Order;
