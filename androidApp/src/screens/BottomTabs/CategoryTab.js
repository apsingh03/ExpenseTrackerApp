import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import {cssFile} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {DataTable, Divider} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';

const CategoryTab = () => {
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
              catName: '',
              catBudget: '',
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

          <FlatList
            data={['', '']}
            renderItem={({item}) => {
              return (
                <DataTable.Row key={item.key}>
                  <DataTable.Cell>one</DataTable.Cell>
                  <DataTable.Cell>two</DataTable.Cell>
                  <DataTable.Cell>
                    threeddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
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

export default CategoryTab;

const styles = StyleSheet.create({});
