import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {cssFile} from '../../Utils/CSS';
import {Formik} from 'formik';
import * as Yup from 'yup';

// icons
import Entypo from 'react-native-vector-icons/Entypo';

import {useDispatch, useSelector} from 'react-redux';
import {loginUserAsync} from '../../redux/slice/SignInSlice';
import {ActivityIndicator} from 'react-native-paper';
import {forgotPasswordByEmailAsync} from '../../redux/slice/UsersSlice';

const ForgotPasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const usersRedux = useSelector(state => state.users);
  // console.log("usersRedux - " , usersRedux )
  const forgotSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });
  // height : windowHeight / 3.5

  const thumbnailImageUrl =
    'https://media.licdn.com/dms/image/D5612AQGplp7JKG6Iiw/article-cover_image-shrink_720_1280/0/1673950361361?e=2147483647&v=beta&t=NxzErCoXqQ-xwkHJZZkKGKYNA21hJh3oNMUJzNKQr9M';
  return (
    <View style={cssFile.signParentContainer}>
      <View
        style={{
          backgroundColor: '#2f2cd8',
          padding: 20,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          position: 'relative',
        }}>
        <ImageBackground
          imageStyle={{
            backgroundColor: '#2f2cd8',
            minHeight: windowHeight / 3,
            borderRadius: 10,
          }}
          style={{opacity: 0.5}}
          resizeMode="cover"
          source={{uri: `${thumbnailImageUrl}`}}></ImageBackground>

        <View
          style={[
            cssFile.colBetweenCenter,
            {
              minHeight: windowHeight / 3,
              paddingTop: 20,
              paddingBottom: 60,
              paddingHorizontal: 20,
            },
          ]}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff',

                marginBottom: 5,
              }}>
              Welcome to
            </Text>

            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: '#ffff',
              }}>
              Expense Tracker
            </Text>
          </View>

          <View style={cssFile.flexRow}>
            <Text style={{marginHorizontal: 5}}>
              {' '}
              <Entypo name="facebook" size={25} color={'#fff'} />{' '}
            </Text>
            <Text style={{marginHorizontal: 5}}>
              {' '}
              <Entypo
                name="linkedin-with-circle"
                size={25}
                color={'#fff'}
              />{' '}
            </Text>
            <Text style={{marginHorizontal: 5}}>
              {' '}
              <Entypo name="facebook" size={25} color={'#fff'} />{' '}
            </Text>
          </View>
        </View>
      </View>

      <View style={{marginTop: -60}}>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={forgotSchema}
          onSubmit={async (values, {setSubmitting}) => {
            const actionResult = await dispatch(
              forgotPasswordByEmailAsync({email: values.email}),
            );

            if (
              actionResult.payload.success === false &&
              actionResult.payload.msg === "User Doesn't Exist"
            ) {
              Alert.alert('', actionResult.payload.msg);
            }

            if (
              actionResult.payload.success === true &&
              actionResult.payload.msg ===
                'Link for reset the password is successfully send on your Mail Id!'
            ) {
              Alert.alert('', actionResult.payload.msg);
            }
            values.email = '';
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
                paddingHorizontal: 10,
                paddingVertical: 30,
                elevation: 3,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <View style={{marginBottom: 10}}>
                <TextInput
                  style={[cssFile.textInput]}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Your Email"
                  placeholderTextColor={'#fff'}
                  keyboardType="email-address"
                />

                {errors.email && touched.email ? (
                  <Text style={cssFile.validationText}>{errors.email}</Text>
                ) : null}
              </View>

              <Button
                color={'#2f2cd8'}
                onPress={handleSubmit}
                title="Forgot It"
                disabled={isSubmitting}
              />

              <View style={[cssFile.flexRow, {marginTop: 20}]}>
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', color: '#7184ad'}}>
                  Already Have an Account ?
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '900',
                    color: '#0d6efd',
                    textDecorationLine: 'underline',
                    paddingHorizontal: 10,
                  }}
                  onPress={() => navigation.navigate('SignInScreen')}>
                  Sign In
                </Text>

                <Text style={{textAlign: 'center'}}>
                  <ActivityIndicator
                    animating={usersRedux?.isLoading}
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
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
