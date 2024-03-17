import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {cssFile} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserProfileTab = () => {
  return (
    <View style={cssFile.bottomTabsParentContainer}>
      <View style={{backgroundColor: '#fff', padding: 10, marginTop: 10}}>
        <View style={cssFile.flexRow}>
          <Text>
            {' '}
            <Entypo name="user" size={30} color={'#000'} />{' '}
          </Text>
          <Text
            style={{
              fontSize: 25,
              color: '#000',
              fontWeight: '600',
              marginLeft: 20,
            }}>
            Ajay Pratap Singh
          </Text>
        </View>

        <View style={[cssFile.flexRow, {marginTop: 20}]}>
          <Text>
            {' '}
            <MaterialCommunityIcons
              name="email"
              size={30}
              color={'#000'}
            />{' '}
          </Text>
          <Text
            style={{
              fontSize: 25,
              color: '#000',
              fontWeight: '600',
              marginLeft: 20,
            }}>
            ajay@gmail.com
          </Text>
        </View>

        <View style={[cssFile.flexRow, {marginTop: 20}]}>
          <Text>
            {' '}
            <MaterialIcons
              name="workspace-premium"
              size={30}
              color={'#000'}
            />{' '}
          </Text>
          <Pressable
            onPress={() => console.log('dsjkfaksdhfkdasj')}
            style={{
              borderWidth: 1,
              borderColor: 'blue',
              backgroundColor: 'blue',
              paddingVertical: 10,
              paddingHorizontal: 50,
              marginLeft: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 15, lineHeight: 20}}>
              Premium User
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{backgroundColor: '#fff', padding: 10, marginTop: 10}}>
        <View style={[cssFile.flexRow, {marginTop: 20}]}>
          <Text>
            {' '}
            <MaterialIcons name="logout" size={30} color={'#000'} />{' '}
          </Text>
          <Pressable
            onPress={() => console.log('dsjkfaksdhfkdasj')}
            style={{
              borderWidth: 1,
              borderColor: 'blue',
              backgroundColor: 'blue',
              paddingVertical: 10,
              paddingHorizontal: 50,
              marginLeft: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 15, lineHeight: 20}}>
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default UserProfileTab;

const styles = StyleSheet.create({});
