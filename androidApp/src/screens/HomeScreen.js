import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();
// Bottom Tabs Imports 
import HomeTab from './BottomTabs/HomeTab';
import CategoryTab from './BottomTabs/CategoryTab';
import ExpensesTab from './BottomTabs/ExpensesTab';
import UserProfileTab from './BottomTabs/UserProfileTab';

const HomeScreen = () => {
  return (
    <>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="HomeTab"
          component={HomeTab}
          options={{headerShown: false}}
        />
        <BottomTab.Screen
          name="CategoryTab"
          component={CategoryTab}
          options={{headerShown: false}}
        />
        <BottomTab.Screen
          name="ExpensesTab"
          component={ExpensesTab}
          options={{headerShown: false}}
        />
        <BottomTab.Screen
          name="UserProfileTab"
          component={UserProfileTab}
          options={{headerShown: false}}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
