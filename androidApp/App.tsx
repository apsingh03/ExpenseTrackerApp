// import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import AppNavigator from './src/AppNavigator';

import {store} from './src/redux/Store';
import {Provider} from 'react-redux';

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </>
  );
}

export default App;
