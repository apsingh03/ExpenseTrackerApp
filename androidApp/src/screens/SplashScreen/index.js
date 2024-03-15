import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignUpScreen');
    }, 3000);
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
          marginTop: 30,
        }}>
        Expense Tracker
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
