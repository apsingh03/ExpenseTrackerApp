import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();
// Bottom Tabs Imports
import HomeTab from './BottomTabs/HomeTab';
import CategoryTab from './BottomTabs/CategoryTab';
import ExpensesTab from './BottomTabs/ExpensesTab';
import UserProfileTab from './BottomTabs/UserProfileTab';
import ChartTab from './BottomTabs/ChartTab';
// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

const HomeScreen = () => {
  return (
    <>
      <BottomTab.Navigator initialRouteName="HomeTab">
        <BottomTab.Screen
          name="HomeTab"
          component={HomeTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarInactiveBackgroundColor: '#2f2cd8',
            tabBarActiveBackgroundColor: '#fff',
            tabBarActiveTintColor: '#2f2cd8',
            tabBarInactiveTintColor: '#fff',

            tabBarIcon: ({color, size}) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="CategoryTab"
          component={CategoryTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Category',
            tabBarInactiveBackgroundColor: '#2f2cd8',
            tabBarActiveBackgroundColor: '#fff',
            tabBarActiveTintColor: '#2f2cd8',
            tabBarInactiveTintColor: '#fff',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="category" size={size} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="ChartTab"
          component={ChartTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Chart',
            tabBarInactiveBackgroundColor: '#2f2cd8',
            tabBarActiveBackgroundColor: '#fff',
            tabBarActiveTintColor: '#2f2cd8',
            tabBarInactiveTintColor: '#fff',
            tabBarIcon: ({color, size}) => (
              <FontAwesome5
                name="chart-bar"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="ExpensesTab"
          component={ExpensesTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Expenses',
            tabBarInactiveBackgroundColor: '#2f2cd8',
            tabBarActiveBackgroundColor: '#fff',
            tabBarActiveTintColor: '#2f2cd8',
            tabBarInactiveTintColor: '#fff',
            tabBarIcon: ({color, size}) => (
              <FontAwesome6
                name="circle-dollar-to-slot"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="UserProfileTab"
          component={UserProfileTab}
          options={{
            headerShown: false,
            tabBarLabel: 'User',
            tabBarInactiveBackgroundColor: '#2f2cd8',
            tabBarActiveBackgroundColor: '#fff',
            tabBarActiveTintColor: '#2f2cd8',
            tabBarInactiveTintColor: '#fff',
            tabBarIcon: ({color, size}) => (
              <Entypo name="user" size={size} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
