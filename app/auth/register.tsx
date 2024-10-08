import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { loginAction } from '../(redux)/authSlice';
import useRegisterMutation from '../(services)/api/registerMutation';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export default function Register() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const registerMutation = useRegisterMutation({
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (data: any) => {
      console.log('Error data', data);
      setErrorMessage(data?.message);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          const data = {
            email: values.email,
            password: values.password,
          };
          console.log({ data });
          registerMutation.mutate(data);
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
              disabled={registerMutation.isPending}>
              {registerMutation.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
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
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  successText: {
    color: 'green',
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
