import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {cssFile} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {ActivityIndicator, DataTable, Divider} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {
  createCategoryAsync,
  deleteCategoryAsync,
  getCategoryAsync,
} from '../../redux/slice/CategorySlice';

const CategoryTab = () => {
  const dispatch = useDispatch();
  const categoryRedux = useSelector(state => state.category);

  const categorySchema = Yup.object().shape({
    catName: Yup.string()
      .min(2, 'Too Short!')
      .max(15, 'Too Long!')
      .required('Required'),
    catBudget: Yup.number()
      .min(100, 'Too Short!')
      .max(2000, 'Too Long!')
      .required('Required'),
  });

  useEffect(() => {
    // // console.log("---- Category Tab UseEffect---- ");

    dispatch(getCategoryAsync());
  }, []);

  return (
    <View style={cssFile.bottomTabsParentContainer}>
      <View style={{backgroundColor: '#fff', padding: 10, marginTop: 10}}>
        <View style={{}}>
          <Formik
            initialValues={{
              catName: '',
              catBudget: '',
            }}
            validationSchema={categorySchema}
            onSubmit={async (values, {setSubmitting}) => {
              // same shape as initial values

              await dispatch(
                createCategoryAsync({
                  catName: values.catName,
                  budget: values.catBudget,
                }),
              );

              values.catName = '';
              values.catBudget = '';
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
                <View style={{marginBottom: 10}}>
                  <TextInput
                    style={[cssFile.textInput]}
                    onChangeText={handleChange('catName')}
                    onBlur={handleBlur('catName')}
                    value={values.catName}
                    placeholder="Category Name"
                    placeholderTextColor={'#fff'}
                    keyboardType="default"
                  />

                  {errors.catName && touched.catName ? (
                    <Text style={cssFile.validationText}>{errors.catName}</Text>
                  ) : null}
                </View>

                <View style={{marginBottom: 10}}>
                  <TextInput
                    style={[cssFile.textInput]}
                    onChangeText={handleChange('catBudget')}
                    onBlur={handleBlur('catBudget')}
                    value={values.catBudget}
                    placeholder="Category Budget"
                    placeholderTextColor={'#fff'}
                    keyboardType="numeric"
                  />

                  {errors.catBudget && touched.catBudget ? (
                    <Text style={cssFile.validationText}>
                      {errors.catBudget}
                    </Text>
                  ) : null}
                </View>

                <Button
                  color={'#2f2cd8'}
                  onPress={handleSubmit}
                  title="Add Category"
                  disabled={isSubmitting}
                />

                <View style={[{marginTop: 20}]}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '900',
                      color: '#0d6efd',
                      textDecorationLine: 'underline',
                      textAlign: 'center',
                    }}>
                    <ActivityIndicator
                      animating={categoryRedux?.isLoading}
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
              <Text style={{color: '#fff', fontSize: 15, fontWeight: 'normal'}}>
                S.No
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: 'normal'}}>
                Name
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: 'normal'}}>
                Budget
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: 'normal'}}>
                Actions
              </Text>
            </DataTable.Title>
          </DataTable.Header>
          {/*  */}
          <FlatList
            data={categoryRedux.data && categoryRedux.data}
            renderItem={({index, item}) => {
              return (
                <DataTable.Row key={item.key}>
                  <DataTable.Cell>{index + 1}</DataTable.Cell>
                  <DataTable.Cell>{item.catName}</DataTable.Cell>
                  <DataTable.Cell>{item.budget}</DataTable.Cell>
                  <DataTable.Cell>
                    <Pressable
                      onPress={() =>
                        dispatch(deleteCategoryAsync({id: item.id}))
                      }
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
            showsVerticalScrollIndicator={true}
          />
        </DataTable>
      </View>
    </View>
  );
};

export default CategoryTab;

const styles = StyleSheet.create({});
