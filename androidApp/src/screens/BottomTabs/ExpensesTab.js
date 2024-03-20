import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {cssFile} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {ActivityIndicator, DataTable, Divider} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import {
  createExpensesAsync,
  deleteExpensesAsync,
  getExpensesAsync,
} from '../../redux/slice/ExpensesSlice';
import {getCategoryAsync} from '../../redux/slice/CategorySlice';

// selectCategory
const ExpensesTab = () => {
  const dispatch = useDispatch();

  const categoryRedux = useSelector(state => state.category);
  const expensesRedux = useSelector(state => state.expenses);
  const signinRedux = useSelector(state => state.signIn);
  // console.log("categoryRedux - ", categoryRedux  )
  const categorySchema = Yup.object().shape({
    money: Yup.number()
      .min(100, 'Too Short!')
      .max(2000, 'Too Long!')
      .required('Required'),

    desc: Yup.string()
      .min(5, 'Too Short!')
      .max(15, 'Too Long!')
      .required('Required'),
  });

  const [selectDropDownCategory, setselectDropDownCategory] = useState(null);

  // pagination
  const totalPagesRedux = expensesRedux.data?.totalPages;
  const paginationArray = Array.from(Array(totalPagesRedux).keys()).splice(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageSize, setpageSize] = useState(5);
  const [numberOfItemsPerPageList] = React.useState([5, 10, 15, 20]);
  function loadTotalPagesFromExpenses() {
    if (expensesRedux.isLoading !== true) {
      setTotalPages(expensesRedux.data?.totalPages);
    }
  }
  // console.log( "totalPagesRedux - " , totalPagesRedux , paginationArray)
  useEffect(() => {
    dispatch(getCategoryAsync());
    dispatch(
      getExpensesAsync({
        currentPage,
        pageSize,
      }),
    );

    loadTotalPagesFromExpenses();
  }, [currentPage, pageSize, totalPagesRedux, numberOfItemsPerPageList]);

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    console.log('prev page');
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const [page, setPage] = React.useState(0);

  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
    // setpageSize(itemsPerPage)
  );

  const [items] = React.useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  // React.useEffect(() => {
  //   setPage(0);
  // }, [itemsPerPage]);

  return (
    <View style={cssFile.bottomTabsParentContainer}>
      <View style={{backgroundColor: '#fff', padding: 10, marginTop: 10}}>
        <View style={{}}>
          <Formik
            initialValues={{
              money: '',
              desc: '',
            }}
            validationSchema={categorySchema}
            onSubmit={(values, {setSubmitting}) => {
              // same shape as initial values

              if (selectDropDownCategory === null) {
                Alert.alert('Alert', 'Please Select Category');
              } else {
                dispatch(
                  createExpensesAsync({
                    money: values.money,
                    description: values.desc,
                    cat_id: selectDropDownCategory,
                  }),
                );
              }

              values.money = '';
              values.desc = '';

              setSubmitting(false);
              // console.log(values);
            }}>
            {({
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <View
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 20,
                  // elevation: 3,
                  // borderBottomLeftRadius: 10,
                  // borderBottomRightRadius: 10,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    marginBottom: 5,
                  }}>
                  <SelectDropdown
                    data={categoryRedux?.data.map(data => [
                      data.id,
                      data.catName,
                    ])}
                    onSelect={(selectedItem, index) => {
                      setselectDropDownCategory(selectedItem[0]);
                      // console.log(selectedItem[0]);
                    }}
                    // onChangeSearchInputText={ handleBlur('selectedItem') }
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    defaultButtonText="Select Category"
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                    buttonStyle={{
                      width: windowWidth - 50,
                      backgroundColor: '#131129',
                      borderWidth: 2,
                      borderColor: '#fff',
                    }}
                    buttonTextStyle={{color: 'white'}}
                  />
                </View>

                <View style={{marginBottom: 10}}>
                  <TextInput
                    style={[cssFile.textInput]}
                    onChangeText={handleChange('money')}
                    onBlur={handleBlur('money')}
                    value={values.money}
                    placeholder="Money"
                    placeholderTextColor={'#fff'}
                    keyboardType="numeric"
                  />

                  {errors.money && touched.money ? (
                    <Text style={cssFile.validationText}>{errors.money}</Text>
                  ) : null}
                </View>

                <View style={{marginBottom: 10}}>
                  <TextInput
                    style={[cssFile.textInput]}
                    onChangeText={handleChange('desc')}
                    onBlur={handleBlur('desc')}
                    value={values.desc}
                    placeholder="Description"
                    placeholderTextColor={'#fff'}
                    keyboardType="default"
                  />

                  {errors.desc && touched.desc ? (
                    <Text style={cssFile.validationText}>{errors.desc}</Text>
                  ) : null}
                </View>

                <Button
                  color={'#2f2cd8'}
                  onPress={handleSubmit}
                  title="Add Expense"
                  disabled={isSubmitting}
                />

                <View style={[cssFile.rowBetweenCenter, {marginTop: 20}]}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '900',
                      color: '#0d6efd',
                      textDecorationLine: 'underline',
                      textAlign: 'center',
                    }}>
                    <ActivityIndicator
                      animating={
                        categoryRedux?.isLoading || expensesRedux?.isLoading
                      }
                      color={'#131129'}
                      size={'small'}
                    />
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>

      <View style={{backgroundColor: '#fff', padding: 5, marginTop: 10}}>
        <DataTable>
          <DataTable.Header style={{backgroundColor: '#000'}}>
            <DataTable.Title style={{color: '#fff'}}>
              <Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>
                S.No
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>
                Name
              </Text>
            </DataTable.Title>

            <DataTable.Title>
              <Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>
                Money
              </Text>
            </DataTable.Title>

            <DataTable.Title>
              <Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>
                Description
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>
                Actions
              </Text>
            </DataTable.Title>
          </DataTable.Header>

          <View style={{height: windowHeight / 3.2}}>
            <FlatList
              data={
                expensesRedux.data?.expenses && expensesRedux.data?.expenses
              }
              renderItem={({item, index}) => {
                return (
                  <View>
                    <DataTable.Row key={item.key} style={{marginTop: 2}}>
                      <DataTable.Cell>
                        {' '}
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 13,
                            fontWeight: 'bold',
                          }}
                          numberOfLines={1}>
                          {index + 1}
                        </Text>{' '}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 13,
                            fontWeight: 'bold',
                          }}
                          numberOfLines={1}>
                          {item.id}
                        </Text>{' '}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 13,
                            fontWeight: 'bold',
                          }}
                          numberOfLines={1}>
                          {item.budget}
                        </Text>{' '}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 13,
                            fontWeight: 'bold',
                          }}
                          numberOfLines={1}>
                          {item.money}
                        </Text>{' '}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 13,
                            fontWeight: 'bold',
                          }}
                          numberOfLines={1}>
                          {item.description.substring(0, 15) + '...'}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Pressable
                          onPress={() =>
                            dispatch(deleteExpensesAsync({id: item.id}))
                          }
                          style={{
                            borderWidth: 1,
                            borderColor: 'red',
                            backgroundColor: 'red',
                            padding: 5,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 13,
                              lineHeight: 20,
                            }}>
                            Delete
                          </Text>
                        </Pressable>
                      </DataTable.Cell>
                    </DataTable.Row>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={true}
            />
          </View>

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${totalPagesRedux}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
          />
        </DataTable>
      </View>
    </View>
  );
};

export default ExpensesTab;

const styles = StyleSheet.create({});
