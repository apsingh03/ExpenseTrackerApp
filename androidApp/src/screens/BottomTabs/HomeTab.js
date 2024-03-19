import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {cssFile} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {DataTable, Divider} from 'react-native-paper';
import DatePicker from '../../components/StartDatePicker';
import StartDatePicker from '../../components/StartDatePicker';
import EndDatePicker from '../../components/EndDatePicker';
import Chart from '../../components/Chart';
import {
  extractDataFromJwtToken,
  getDataFromAsyncStorage,
} from '../../Utils/HelperFunctions';

const HomeTab = ({navigation}) => {
  const [selectStartDate, setselectStartDate] = useState('');
  const [selectEndDate, setselectEndDate] = useState('');

  // console.log('Start Date - ', selectStartDate);
  // console.log('End Date - ', selectEndDate);
  return (
    <View style={cssFile.bottomTabsParentContainer}>
      <View
        style={[
          cssFile.rowBetweenCenter,
          {padding: 10, backgroundColor: '#fff'},
        ]}>
        <Pressable
          onPress={() => navigation.navigate('SignUpScreen')}
          style={{
            borderWidth: 1,
            borderColor: '#131129',
            backgroundColor: '#131129',
            padding: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 15, lineHeight: 20}}>
            Sign Up
          </Text>
        </Pressable>

        <Pressable
          onPress={() => console.log('dsjkfaksdhfkdasj')}
          style={{
            borderWidth: 1,
            borderColor: '#131129',
            backgroundColor: '#131129',
            padding: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 15, lineHeight: 20}}>
            Buy Premium
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            cssFile.rowBetweenCenter,
            {
              paddingHorizontal: 10,
              paddingVertical: 20,
              backgroundColor: '#1d1933',
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#ffff',
            },
          ]}>
          <FlatList
            data={['', '', '']}
            renderItem={({}) => {
              return (
                <>
                  <View
                    style={[
                      cssFile.colBetweenCenter,
                      {
                        backgroundColor: '#131129',
                        width: windowWidth / 2.5,
                        height: 100,
                        padding: 10,
                        marginRight: 15,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                      },
                    ]}>
                    <Text
                      style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
                      Total Categories
                    </Text>
                    <Text
                      style={{fontSize: 30, color: '#fff', fontWeight: '600'}}>
                      3
                    </Text>
                  </View>
                </>
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View
          style={[
            {
              paddingHorizontal: 10,
              paddingVertical: 20,
              backgroundColor: '#1d1933',
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#ffff',
            },
          ]}>
          <View style={cssFile.rowBetweenCenter}>
            <Text style={{fontSize: 15, fontWeight: '600', color: '#fff'}}>
              Premium Users Leader Board
            </Text>
            <Text>
              <Pressable
                onPress={() => console.log('dsjkfaksdhfkdasj')}
                style={{
                  borderWidth: 1,
                  borderColor: '#2f2cd8',
                  backgroundColor: '#2f2cd8',
                  padding: 5,
                }}>
                <Text style={{color: '#fff', fontSize: 13, lineHeight: 20}}>
                  Download
                </Text>
              </Pressable>
            </Text>
          </View>

          <View
            style={[
              cssFile.flexColumn,
              {marginTop: 15, backgroundColor: '#fff', padding: 10},
            ]}>
            <View
              style={[
                cssFile.flexRow,
                {borderBottomWidth: 0.5, borderBottomColor: '#000', padding: 5},
              ]}>
              <Text style={cssFile.theadText} numberOfLines={1}>
                S.NO
              </Text>

              <Text style={cssFile.theadText} numberOfLines={1}>
                Full Name
              </Text>

              <Text style={cssFile.theadText} numberOfLines={1}>
                Email
              </Text>

              <Text style={cssFile.theadText} numberOfLines={1}>
                Total Expense
              </Text>
            </View>

            <View style={[cssFile.flexRow, {marginTop: 10, padding: 5}]}>
              <Text style={cssFile.tbodyText} numberOfLines={1}>
                1
              </Text>

              <Text style={cssFile.tbodyText} numberOfLines={1}>
                Ajay Pratap Singh jhhhhhhhhhhhhhhhhhhhhhhhhhhh
              </Text>

              <Text style={cssFile.tbodyText} numberOfLines={1}>
                Ajay@gma
              </Text>

              <Text style={cssFile.tbodyText} numberOfLines={1}>
                658
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            {
              paddingHorizontal: 10,
              paddingVertical: 20,
              backgroundColor: '#1d1933',
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#ffff',
            },
          ]}>
          <View style={cssFile.rowBetweenCenter}>
            <Text style={{fontSize: 15, fontWeight: '600', color: '#fff'}}>
              Premium Users Download History
            </Text>
            <Text>
              <Pressable
                onPress={() => console.log('dsjkfaksdhfkdasj')}
                style={{
                  borderWidth: 1,
                  borderColor: '#2f2cd8',
                  backgroundColor: '#2f2cd8',
                  padding: 5,
                }}>
                <Text style={{color: '#fff', fontSize: 13, lineHeight: 20}}>
                  Download
                </Text>
              </Pressable>
            </Text>
          </View>

          <View
            style={[
              cssFile.flexColumn,
              {marginTop: 15, backgroundColor: '#fff', padding: 10},
            ]}>
            <View
              style={[
                cssFile.flexRow,
                {borderBottomWidth: 0.5, borderBottomColor: '#000', padding: 5},
              ]}>
              <Text style={cssFile.theadText} numberOfLines={1}>
                S.NO
              </Text>

              <Text style={cssFile.theadText} numberOfLines={1}>
                Full Name
              </Text>

              <Text style={cssFile.theadText} numberOfLines={1}>
                Email
              </Text>

              <Text style={cssFile.theadText} numberOfLines={1}>
                Total Expense
              </Text>
            </View>

            <View style={[cssFile.flexRow, {marginTop: 10, padding: 5}]}>
              <Text style={cssFile.tbodyText} numberOfLines={1}>
                1
              </Text>

              <Text style={cssFile.tbodyText} numberOfLines={1}>
                Ajay Pratap Singh jhhhhhhhhhhhhhhhhhhhhhhhhhhh
              </Text>

              <Text style={cssFile.tbodyText} numberOfLines={1}>
                Ajay@gma
              </Text>

              <Text style={cssFile.tbodyText} numberOfLines={1}>
                658
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            {
              paddingHorizontal: 10,
              paddingVertical: 20,
              backgroundColor: '#1d1933',
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#ffff',
            },
          ]}>
          <View style={cssFile.rowBetweenCenter}>
            <View style={cssFile.flexRow}>
              <Text style={{marginRight: 10}}>
                <StartDatePicker setselectStartDate={setselectStartDate} />

                {/* <Text style={{ fontSize : 20, color : "#fff" }} > {selectStartDate  } </Text> */}
              </Text>

              <Text>
                <EndDatePicker setselectEndDate={setselectEndDate} />

                {/* <Text> {selectEndDate} </Text> */}
              </Text>
            </View>

            <View>
              <Button
                title="Click Here"
                color={'#2f2cd8'}
                onPress={() => console.log('Fetching Data')}
              />
            </View>
          </View>

          <View
            style={[
              cssFile.flexColumn,
              {marginTop: 15, backgroundColor: '#fff', padding: 10},
            ]}>
            <View
              style={[
                cssFile.flexRow,
                {borderBottomWidth: 0.5, borderBottomColor: '#000', padding: 5},
              ]}>
              <Text style={cssFile.theadText} numberOfLines={1}>
                S.NO
              </Text>

              <Text style={cssFile.theadText} numberOfLines={1}>
                Full Name
              </Text>

              <Text style={cssFile.theadText} numberOfLines={1}>
                Email
              </Text>

              <Text style={cssFile.theadText} numberOfLines={1}>
                Total Expense
              </Text>
            </View>

            <View style={[cssFile.flexRow, {marginTop: 10, padding: 5}]}>
              <Text style={cssFile.tbodyText} numberOfLines={1}>
                1
              </Text>

              <Text style={cssFile.tbodyText} numberOfLines={1}>
                Ajay Pratap Singh jhhhhhhhhhhhhhhhhhhhhhhhhhhh
              </Text>

              <Text style={cssFile.tbodyText} numberOfLines={1}>
                Ajay@gma
              </Text>

              <Text style={cssFile.tbodyText} numberOfLines={1}>
                658
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            {
              paddingHorizontal: 10,
              paddingVertical: 0,
              backgroundColor: '#1d1933',
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#ffff',
            },
          ]}>
          <Chart />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({});
