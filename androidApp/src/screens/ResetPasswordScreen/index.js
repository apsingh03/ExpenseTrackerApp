import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {cssFile} from '../../Utils/CSS';
import {Formik} from 'formik';
import * as Yup from 'yup';

// icons
import Entypo from 'react-native-vector-icons/Entypo';

const ResetPasswordScreen = () => {
  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
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
            password: '',
          }}
          validationSchema={passwordSchema}
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
                paddingHorizontal: 10,
                paddingVertical: 30,
                elevation: 3,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <View style={{marginBottom: 10}}>
                <TextInput
                  style={[cssFile.textInput]}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Your New Password"
                  placeholderTextColor={'#fff'}
                  keyboardType="default"
                  secureTextEntry={true}
                />

                {errors.password && touched.password ? (
                  <Text style={cssFile.validationText}>{errors.password}</Text>
                ) : null}
              </View>

              <Button
                color={'#2f2cd8'}
                onPress={handleSubmit}
                title="Change Password"
                disabled={isSubmitting}
              />

              {/* <View style={[{marginTop: 20}]}>
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', color: '#7184ad'}}>
                  Already Have an Account ?
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '900',
                      color: '#0d6efd',
                      textDecorationLine: 'underline',
                      paddingHorizontal: 10,
                    }}>
                    Sign In
                  </Text>
                </Text>
              </View> */}
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({});
