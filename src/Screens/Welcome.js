import React from 'react'
import { SafeAreaView, Image, ScrollView, StyleSheet, Text, View, Linking } from 'react-native'
// import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';


function Welcome({navigation}) {
    // onPress={() => Linking.openURL('http://google.com')} use to link
    return (
        <SafeAreaView>
            <View style={styles.closebox}>
                <View style={styles.timg}>
                    <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/331/828/small/delivery-boy-riding-scooter-with-cityline-background-vector.jpg' }}
                        style={styles.imgs} />
                    <Text style={styles.slog}>
                        Bringing your cravings to your doorstep, one tap at a time.
                    </Text>
                </View>

                <View>
                {/* onPress = () => {
    props.navigation.navigate('ScreenTwo');
  }; */}
                    <Text style={styles.btn}  onPress={()=>navigation.navigate('Registration')}>Get Started 
                     <Icon name='arrow-forward' size={20}  ></Icon>
                    </Text>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', paddingLeft: 40 }}  onPress={()=>navigation.navigate('Login')}>Already have an account ? <Text style={{ color: 'blue', fontSize: 16, fontWeight: 'bold' }}>
                        Login
                    </Text>
                    </Text>
                </View>

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    closebox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#f2f7f6',
        paddingVertical: 40,
        gap: 100,
    },
    timg: {
        width: '100%',
        height: '60%',

    },
    imgs: {
        width: '100%',
        height: '60%',
        objectFit: 'cover',

    },
    btn: {
        borderRadius: 30,
        backgroundColor: '#0071dc',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 60,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    slog: {
        color: 'skyblue',
        fontSize: 30,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 35,

    },

})

export default Welcome