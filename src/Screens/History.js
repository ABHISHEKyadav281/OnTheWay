import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet,ScrollView } from 'react-native';

import api from '../Api/Auth';

const History = () => {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchUserHistory();
  }, []);

  const fetchUserHistory = async () => {
    try {
      const response = await api.get('/get-history'); 
      if (response.data) {
        setUserHistory(response.data);
      }
    } catch (error) {
      console.error('Error fetching user history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.heading1}>OnTheWay</Text>
      {loading ? (
        <Text style={styles.lines}>Loading user history...</Text>
      ) : (
        <ScrollView>
          {userHistory?(userHistory.map((historyItem, index) => (
            <View style={styles.box} key={index}>
              <Text> Date : {historyItem.timestamp}</Text>
              <Text>From : {historyItem.startingpt}</Text>
              <Text>To : {historyItem.destinationpt}</Text>
              <Text>Status : Sucess</Text>
            </View>
          ))):
          <View>
            <Text style={styles.lines}>No History Available</Text>
            </View>}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};


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
    box:{
        width:'100%',
        height:'auto',
        elevation:5,
        borderWidth:2,
        borderColor:'gray',
        backgroundColor:'white',
        elevation:5,
        marginVertical:5,
    },
    lines:{
        fontSize:18,
        fontWeight:'800',
        color:'black'
    }

})

export default History;
