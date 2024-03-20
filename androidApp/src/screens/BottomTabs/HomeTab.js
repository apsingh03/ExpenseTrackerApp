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
import {getDataFromAsyncStorage} from '../../Utils/HelperFunctions';

import {useSelector, useDispatch} from 'react-redux';
import {setLoggedData} from '../../redux/slice/SignInSlice';
import {getLeaderBoardAsync} from '../../redux/slice/getLeaderBoardSlice';
import {getCategoryAsync} from '../../redux/slice/CategorySlice';
import {getDownloadHistoryAsync} from '../../redux/slice/FileDownloadHistorySlice';
import {ActivityIndicator} from 'react-native-paper';

const HomeTab = ({navigation}) => {
  // redux

  const dispatch = useDispatch();
  const signInRedux = useSelector(state => state.signIn);
  const leaderboardRedux = useSelector(state => state.leaderboard);
  const usersRedux = useSelector(state => state.users);
  const categoryRedux = useSelector(state => state.category);
  const fileDownloadHistoryRedux = useSelector(
    state => state.fileDownloadHistory,
  );
  const expensesRedux = useSelector(state => state.expenses);

  const setUserLoggedDataInSlice = async () => {
    try {
      const data = await getDataFromAsyncStorage();
      dispatch(setLoggedData(data)); // Dispatch action to store logged data
    } catch (error) {
      console.error('Error - ', error);
    }
  };

  useEffect(() => {
    // console.log("dashboard")
    setUserLoggedDataInSlice();

    dispatch(getLeaderBoardAsync());
    dispatch(getCategoryAsync());
    dispatch(getDownloadHistoryAsync());
  }, []);
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

        <Text>
          <ActivityIndicator
            animating={
              categoryRedux?.isLoading ||
              fileDownloadHistoryRedux?.isLoading ||
              leaderboardRedux?.isLoading
            }
            color={'#131129'}
            size={'small'}
          />
        </Text>

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
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
              Total Categories
            </Text>
            <Text style={{fontSize: 30, color: '#fff', fontWeight: '600'}}>
              3
            </Text>
          </View>

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
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
              Total Categories
            </Text>
            <Text style={{fontSize: 30, color: '#fff', fontWeight: '600'}}>
              3
            </Text>
          </View>

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
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
              Total Categories
            </Text>
            <Text style={{fontSize: 30, color: '#fff', fontWeight: '600'}}>
              3
            </Text>
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

            {signInRedux?.loggedData?.isUserLogged === true ? (
              leaderboardRedux?.data &&
              leaderboardRedux?.data.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={[cssFile.flexRow, {marginTop: 10, padding: 5}]}>
                    <Text style={cssFile.tbodyText} numberOfLines={1}>
                      {index + 1}
                    </Text>

                    <Text style={cssFile.tbodyText} numberOfLines={1}>
                      {data?.fullname.substring(0, 5) + '...'}
                    </Text>

                    <Text style={cssFile.tbodyText} numberOfLines={1}>
                      {data?.email}
                    </Text>

                    <Text style={cssFile.tbodyText} numberOfLines={1}>
                      {data?.totalExpense}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  padding: 10,
                }}>
                User Not Logged In
              </Text>
            )}
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
              Your Download History
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
                Link
              </Text>

              <Text style={cssFile.theadText} numberOfLines={1}>
                Action
              </Text>
            </View>

            {signInRedux?.loggedData?.isUserLogged === true
              ? fileDownloadHistoryRedux?.data &&
                fileDownloadHistoryRedux?.data.map((data, index) => {
                  return (
                    <View
                      key={index}
                      style={[cssFile.flexRow, {marginTop: 10, padding: 5}]}>
                      <Text style={cssFile.tbodyText} numberOfLines={1}>
                        {index + 1}
                      </Text>

                      <Text style={cssFile.tbodyText} numberOfLines={1}>
                        {data.url && data.url.substring(0, 10) + '...'}
                      </Text>

                      <Text style={cssFile.tbodyText} numberOfLines={1}>
                        <Button title="Delete" color={'red'} />
                      </Text>
                    </View>
                  );
                })
              : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({});
