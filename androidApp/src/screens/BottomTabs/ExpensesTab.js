import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {cssFile} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {DataTable, Divider} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';
import {Picker} from '@react-native-picker/picker';

// selectCategory
const ExpensesTab = () => {
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

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
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

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={cssFile.bottomTabsParentContainer}>
      <View style={{backgroundColor: '#fff', padding: 10, marginTop: 10}}>
        <View style={{}}>
          <Formik
            initialValues={{
              selectCategory: '',
              money: '',
              desc: '',
            }}
            validationSchema={categorySchema}
            onSubmit={(values, {setSubmitting}) => {
              // same shape as initial values
              setSubmitting(false);
              console.log(values);
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
                    data={['Egypt', 'Canada', 'Australia', 'Ireland']}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
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
                    keyboardType="numeric"
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
                    style={{fontSize: 15, fontWeight: '900', color: '#7184ad'}}>
                    Is Loading ?
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '900',
                      color: '#0d6efd',
                      textDecorationLine: 'underline',
                    }}>
                    Yes
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
                Budget
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

          <FlatList
            data={['', '']}
            renderItem={({item}) => {
              return (
                <DataTable.Row key={item.key} style={{marginTop: 2}}>
                  <DataTable.Cell>
                    {' '}
                    <Text
                      style={{color: '#000', fontSize: 13, fontWeight: 'bold'}}
                      numberOfLines={1}>
                      1
                    </Text>{' '}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text
                      style={{color: '#000', fontSize: 13, fontWeight: 'bold'}}
                      numberOfLines={1}>
                      Petrol
                    </Text>{' '}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text
                      style={{color: '#000', fontSize: 13, fontWeight: 'bold'}}
                      numberOfLines={1}>
                      2000
                    </Text>{' '}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text
                      style={{color: '#000', fontSize: 13, fontWeight: 'bold'}}
                      numberOfLines={1}>
                      1199
                    </Text>{' '}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text
                      style={{color: '#000', fontSize: 13, fontWeight: 'bold'}}
                      numberOfLines={1}>
                      threeddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Pressable
                      onPress={() => console.log('dsjkfaksdhfkdasj')}
                      style={{
                        borderWidth: 1,
                        borderColor: 'red',
                        backgroundColor: 'red',
                        padding: 5,
                      }}>
                      <Text
                        style={{color: '#fff', fontSize: 13, lineHeight: 20}}>
                        Delete
                      </Text>
                    </Pressable>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            }}
            vertical
            showsVerticalScrollIndicator={true}
          />

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
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
