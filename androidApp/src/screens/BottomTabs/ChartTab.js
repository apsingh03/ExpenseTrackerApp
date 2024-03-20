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
import {ActivityIndicator, DataTable, Divider} from 'react-native-paper';
import DatePicker from '../../components/StartDatePicker';
import StartDatePicker from '../../components/StartDatePicker';
import EndDatePicker from '../../components/EndDatePicker';
import Chart from '../../components/Chart';

import {useSelector, useDispatch} from 'react-redux';
import {getExpensesByDatesAsync} from '../../redux/slice/ExpensesSlice';
import {setLoggedData} from '../../redux/slice/SignInSlice';
import {getDataFromAsyncStorage} from '../../Utils/HelperFunctions';

const ChartTab = () => {
  const dispatch = useDispatch();
  const signInRedux = useSelector(state => state.signIn);

  const expensesRedux = useSelector(state => state.expenses);

  // console.log('signInRedux - ', signInRedux.loggedData.id);
  // console.log('expensesRedux - ', expensesRedux.data?.expenses?.length);
  // console.log('signInRedux - ', signInRedux );

  const [startDatee, setstartDate] = useState('2024-02-01T12:47:00.000Z');
  const [endDatee, setendDate] = useState('2024-03-20T12:57:00.000Z');

  // pagination
  const totalPagesRedux = expensesRedux.data?.totalPages;
  const paginationArray = Array.from(Array(totalPagesRedux).keys()).splice(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageSize, setpageSize] = useState(10);

  function loadTotalPagesFromExpenses() {
    if (expensesRedux.isLoading !== true) {
      setTotalPages(expensesRedux.data?.totalPages);
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    // console.log("prev page");
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const setUserLoggedDataInSlice = async () => {
    try {
      const data = await getDataFromAsyncStorage();
      dispatch(setLoggedData(data)); // Dispatch action to store logged data
    } catch (error) {
      console.error('Error - ', error);
    }
  };

  useEffect(() => {
    setUserLoggedDataInSlice();
    loadTotalPagesFromExpenses();
    dispatch(
      getExpensesByDatesAsync({
        startDate: startDatee,
        endDate: endDatee,
        currentPage,
        pageSize,
        user_id: signInRedux?.loggedData?.id,
      }),
    );
  }, [currentPage, pageSize, totalPagesRedux]);

  // console.log('Start Date - ', startDatee);
  // console.log('End Date - ', endDatee);

  return (
    <View style={cssFile.bottomTabsParentContainer}>
      <View
        style={[
          {
            paddingHorizontal: 10,
            paddingVertical: 20,
            backgroundColor: '#1d1933',
            marginTop: 0,
            borderWidth: 1,
            borderColor: '#ffff',
          },
        ]}>
        <View style={cssFile.rowBetweenCenter}>
          <View style={cssFile.flexRow}>
            <Text style={{marginRight: 10}}>
              <StartDatePicker setstartDate={setstartDate} />

              {/* <Text style={{ fontSize : 20, color : "#fff" }} > {selectStartDate  } </Text> */}
            </Text>

            <Text>
              <EndDatePicker setendDate={setendDate} />

              {/* <Text> {selectEndDate} </Text> */}
            </Text>
          </View>

          <Text>
            <ActivityIndicator
              animating={expensesRedux?.isLoading}
              color={'#ffff'}
              size={'small'}
            />
          </Text>

          <View>
            <Button
              title="Click Here"
              color={'#2f2cd8'}
              onPress={() =>
                dispatch(
                  getExpensesByDatesAsync({
                    startDate: startDatee,
                    endDate: endDatee,
                    currentPage,
                    pageSize,
                    user_id: signInRedux?.loggedData?.id,
                  }),
                )
              }
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
              Cat Name
            </Text>

            <Text style={cssFile.theadText} numberOfLines={1}>
              Money
            </Text>

            <Text style={cssFile.theadText} numberOfLines={1}>
              Description
            </Text>
          </View>

          <View style={{minHeight: windowHeight / 2.5}}>
            {/* { signInRedux?.loggedData?.isUserLogged === true ? () : null } */}

            <FlatList
              data={
                expensesRedux?.data?.expenses && expensesRedux?.data?.expenses
              }
              renderItem={({item, index}) => {
                return (
                  <View
                    key={index}
                    style={[cssFile.flexRow, {marginTop: 10, padding: 5}]}>
                    <Text style={cssFile.tbodyText} numberOfLines={1}>
                      {index + 1}
                    </Text>

                    <Text style={cssFile.tbodyText} numberOfLines={1}>
                      {item.category}
                    </Text>

                    <Text style={cssFile.tbodyText} numberOfLines={1}>
                      {item.money}
                    </Text>

                    <Text style={cssFile.tbodyText} numberOfLines={1}>
                      {item.description}
                    </Text>
                  </View>
                );
              }}
              horizontal
            />
          </View>

          {/* {signInRedux?.loggedData?.isUserLogged === true
              ? expensesRedux?.data.expenses &&
                expensesRedux?.data.expenses.map((data, index) => {
                  return (
                   <>  </>
                  );
                })
              : null} */}
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
        <Chart
          apiData={expensesRedux?.data?.expenses && expensesRedux?.data?.expenses}
        />
      </View>
    </View>
  );
};

export default ChartTab;

const styles = StyleSheet.create({});
