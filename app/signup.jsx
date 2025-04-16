import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import loginLogo from '../assets/images/login.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as yup from 'yup';
//import { useAuth } from '../auth/authContext';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  name: yup
    .string()
    .required('Name is required'),
  education: yup
  .string()
  .required('Education level is required'),
  username: yup
  .string()
  .required('username is required'),
});

export default function SignUp() {
    //const { token, user, saveToken, saveUser } = useAuth();
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Image source={loginLogo} style={styles.logo} />
        <Text style={styles.title}>Sign Up</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
   
        > 
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <Icon name="happy-outline" size={25} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>
              {errors.name && touched.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <View style={styles.inputContainer}>
                <Icon name="school-outline" size={25} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Education Level"
                  onChangeText={handleChange('education')}
                  onBlur={handleBlur('education')}
                  value={values.education_level}
                />
              </View>
              {errors.education && touched.education && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}



              <View style={styles.inputContainer}>
                <Icon name="mail-outline" size={25} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}              

              <View style={styles.inputContainer}>
                <Icon name="person-add-outline" size={25} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
              </View>
              {errors.name && touched.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
  
              <View style={styles.inputContainer}>
                <Icon name="lock-open-outline" size={25} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
         
              <View style={styles.inputContainer}>
                <Icon name="lock-open-outline" size={25} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="re-enter Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.re_password}
                />
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}


              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('loginUser')}>
                <Text style={styles.signUp}>
                  Already have an account  <Text style={styles.signUpLink}>Login</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    logo: {
      height: 200,
      width: 200,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    title: {
      fontSize: 32,
      marginBottom: 40,
      fontWeight: 'bold',
      color: 'black',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 50,
      backgroundColor: '#f1f1f1',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: '100%',
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 20,
      color: '#000',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#1E90FF',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    signUp: {
      color: '#000',
    },
    signUpLink: {
      color: '#1E90FF',
    },
    errorText: {
      color: 'red',
      alignSelf: 'flex-start',
      marginBottom: 10,
    },
  });