import AsyncStorage from '@react-native-async-storage/async-storage';

export const setInAsyncStorage = async token => {
  try {
    await AsyncStorage.setItem('loggedDataToken', token);
  } catch (error) {
    console.log('Async Storage Error - ', error);
  }
};

export const removeAsyncLogout = async () => {
  try {
    await AsyncStorage.removeItem('loggedDataToken');
    console.log('--- Logged Out ---- ');
  } catch (e) {
    // error reading value
    console.log('Error ', e);
  }
};

export const getDataFromAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('loggedDataToken');
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
    console.log('Error ', e);
  }
};

export const extractDataFromJwtToken = async () => {
  try {
    const value = await AsyncStorage.getItem('loggedDataToken');
    if (value !== null) {
      // value previously stored
      console.log('value - ', value);
      const userObject = jwtDecode(value).fullName;
      console.log('userObject - ', userObject);
    } else {
      console.log('No token found in async storage');
    }
  } catch (e) {
    // error reading value
    console.log('Error ', e);
  }
};
