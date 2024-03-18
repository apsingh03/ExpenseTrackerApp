import AsyncStorage from '@react-native-async-storage/async-storage';

export const setInAsyncStorage = async (token) => {
    try {
      await AsyncStorage.setItem('loggedDataToken', token);
    } catch (error) {
      console.log("Async Storage Error - "  , error  );
    }  
  }