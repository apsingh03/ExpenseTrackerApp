import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const BottomTab = createBottomTabNavigator();

import HomeTab from './BottomTabs/HomeTab';
import CategoryTab from './BottomTabs/CategoryTab';
import ExpensesTab from './BottomTabs/ExpensesTab';
import UserProfileTab from './BottomTabs/UserProfileTab';


const HomeScreen = () => {
  return (
    <>
    
    <BottomTab.Navigator>
      <BottomTab.Screen name="HomeTab" component={HomeTab} />
      <BottomTab.Screen name="CategoryTab" component={CategoryTab} />
      <BottomTab.Screen name="ExpensesTab" component={ExpensesTab} />
      <BottomTab.Screen name="UserProfileTab" component={UserProfileTab} />

    </BottomTab.Navigator>

    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})