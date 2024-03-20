import AsyncStorage from '@react-native-async-storage/async-storage';

export const setInAsyncStorage = async userData => {
  try {
    await AsyncStorage.setItem('loggedUserObject', JSON.stringify(userData));
  } catch (error) {
    console.log('Async Storage Error - ', error);
  }
};

export const removeAsyncLogout = async () => {
  try {
    await AsyncStorage.removeItem('loggedUserObject');
  } catch (e) {
    console.log('Error ', e);
  }
};

export const getDataFromAsyncStorage = async () => {
  try {
    const result = await AsyncStorage.getItem('loggedUserObject');
    return JSON.parse(result);
  } catch (e) {
    console.log('Error ', e);
  }
};