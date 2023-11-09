import React, { useEffect, useState } from 'react';

import {View, StyleSheet ,SafeAreaView,Text, Image} from 'react-native';
import api from '../../Backend/Auth';
import { useAuth } from '../context/AuthContext';
const Rewards = () => {
    const { token } = useAuth(); 
    const [rewardPoints, setRewardPoints] = useState(0);
    useEffect(() => {
      // Fetch reward points from the backend
    //   console.log("yogita")
      const getRewardPoints = async () => {
          try {
            const response = await api.get('/get-reward',
             { headers: { Authorization: `Bearer ${token}` }
           });
            const rp = response.data.rewardPoints;
            console.log(rp);
            setRewardPoints(rp);
          } catch (error) {
            console.error(error);
          }
        };
        
          getRewardPoints();
 
    }, []);

    return (
        <SafeAreaView>
             <Text style={[styles.heading1]}>OnTheWay</Text>

            <View style={{flex:1,backgroundColor:'white',alignItems:'center',justifyContent:'center',minHeight:700,width:'100%'}}>
                
                <Image source={{uri:"https://play-lh.googleusercontent.com/yeB9XKBeHfHChSDwjsFztdBYY-jcdgUpVQwtahFE6AeoKhKHowZMm9wJ4-W8VvML2w"}}
                style={{width: 180,backgroundColor:'red',height: 180,borderRadius:90,overflow: 'hidden',marginBottom:15}}></Image>

                <Text style={{color:'black',fontSize:23,fontWeight:'800',marginVertical:25}}>YOur Reward : <Text style={{color:'green',fontSize:26,fontWeight:'900'}}>{rewardPoints} 🎉</Text></Text>
              <Text style={[styles.input, { display: 'flex', height: 'auto', paddingHorizontal: '35%', paddingVertical: 15, backgroundColor: '#1877f2', fontSize: 22, fontWeight: '800',marginVertical:30 ,color:'white',borderRadius:30}]} onPress={console.log(()=>"handleclame")}>Clame</Text>

            </View>
        </SafeAreaView>
    );
}

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
})

export default Rewards;
