import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const loggedOrNotRedirectAccordingly = async () => {
    const userObjectAsyncStorage = await AsyncStorage.getItem(
      'loggedUserObject',
    );
    // console.log(userObjectAsyncStorage)

    if (userObjectAsyncStorage === null) {
      navigation.navigate('SignUpScreen');
    } else {
      navigation.navigate('HomeScreen');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loggedOrNotRedirectAccordingly();
    }, 1000);
  }, []);

  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: '#fff'}}>
        Welcome to
      </Text>
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          color: '#fff',
          marginTop: 10,
        }}>
        Expense Tracker
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
