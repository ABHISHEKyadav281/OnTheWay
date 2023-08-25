import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import api from '../Api/Auth';
import { useAuth } from '../context/AuthContext';
import moment from 'moment';
const History = () => {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {

    fetchUserHistory();
  }, []);

  const fetchUserHistory = async () => {
    try {
      const response = await api.get('/get-history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
          
            {
              userHistory.length != 0 ? (userHistory.map((historyItem, index) => (
                <View style={styles.box} key={index}>
                  <Text style={{ color: 'black' }}>Date : <Text style={{ color: 'gray' }}> {moment(historyItem.timestamp)
                    .utcOffset('+05:30')
                    .format('DD-MM-YY  hh:mm A')}</Text></Text>
                  <View style={{ backgroundColor: 'white', width: '110%', height: 1, marginLeft: -15, elevation: 4, marginVertical: 10 }}></View>
                  <Text style={{ color: 'black' }}>From : <Text style={{ color: 'gray' }}>{historyItem.startingpt}</Text></Text>
                  <Text style={{ color: 'black' }}>To : <Text style={{ color: 'gray' }}>{historyItem.destinationpt}</Text></Text>
                  <Text style={{ color: 'black' }}>Status : <Text style={{ color: 'springgreen' }}>success </Text></Text>
                </View>
              ))) :
                <View>
                  <Text style={styles.lines}>No History Available</Text>
                </View>
            }
      </ScrollView>
          
        )}
    </SafeAreaView>
  );
};


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
  box: {
    width: '90%',
    height: 'auto',
    elevation: 5,
    borderColor: 'gray',
    backgroundColor: 'white',
    elevation: 5,
    marginVertical: 15,
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15
  },
  lines: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
    textAlign: 'center',
    paddingTop: 50,
  }

})

export default History;
