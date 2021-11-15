import React from 'react';
import {
  loginFormPropsInterface,
  loginFormInitialValuesInterface,
} from '../../../../store/Login/LoginInterfaces';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {
  TextInput,
  Button,
  ActivityIndicator,
  HelperText,
} from 'react-native-paper';
import * as Yup from 'yup';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const LoginForm: React.FC<loginFormPropsInterface> = props => {
  const {onSubmit, loading} = props;
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <Formik
      initialValues={
        {username: '', password: ''} as loginFormInitialValuesInterface
      }
      onSubmit={onSubmit}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
      })}>
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        const hasErrors = (value: string) => {
            const finalval = (errors[value] && touched[value]) as boolean
          return finalval ? finalval : false;
        };
        return (
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
              <View style={styles.sectionContainer}>
                <TextInput
                  label="Username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  style={{marginBottom: 10, marginTop: -20}}
                  onBlur={handleBlur('username')}
                  testID="username"
                  error={
                    ((errors.username &&
                      touched.username) &&
                      errors.username) as boolean
                  }
                />
                <HelperText
                  type="error"
                  visible={hasErrors('username')}>
                  Required
                </HelperText>
                <TextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  testID="password"
                  style={{marginBottom: 10}}                 
                  error={
                    ((errors.password &&
                      touched.password) &&
                      errors.password) as boolean
                  }
                  secureTextEntry={true}
                />
                <HelperText
                  type="error"
                  visible={hasErrors('password')}>
                  Required
                </HelperText>
                <Button
                  disabled={isSubmitting}
                  mode="contained"
                  style={{
                    marginBottom: 10,
                    width: 100,
                    marginLeft: '35%',
                    backgroundColor: '#9f1d41',
                    height: 40,
                    marginTop: 25,
                  }}
                  onPress={handleSubmit}>
                  Login
                </Button>
                <ActivityIndicator
                  animating={loading}
                  color={'#9f1d41'}
                  size="large"
                  style={{marginBottom: 10, marginTop: 10}}
                />
              </View>
            </View>
          //     <form onSubmit={handleSubmit} style={{ marginTop: '5%' }}>

          //         <div className="form-group">
          //             {/* <CssTextField
          //                 label={"Username"}
          //                 className={classes.margin}
          //                 name="username"
          //                 placeholder={"Username"}
          //                 variant="outlined"
          //                 type="text"
          //                 value={values.username}
          //                 onChange={handleChange}
          //                 onBlur={handleBlur}
          //                 error={((errors.username && touched.username) && errors.username) as boolean}
          //                 helperText={(errors.username && touched.username) && errors.username}
          //             /> */}
          //         </div>
          //         <div className="form-group">
          //             {/* <CssTextField
          //                 label={"Password"}
          //                 className={classes.margin}
          //                 name="password"
          //                 placeholder={"Password"}
          //                 type="password"
          //                 variant="outlined"
          //                 value={values.password}
          //                 onChange={handleChange}
          //                 onBlur={handleBlur}
          //                 error={((errors.password && touched.password) && errors.password) as boolean}
          //                 helperText={(errors.password && touched.password) && errors.password}
          //             /> */}
          //         </div>
          //         <div className="form-group">
          //             <button type="submit" id="LogginButton" className='btn btn-primary' disabled={isSubmitting}>
          //                 Sign in
          // </button>
          //         </div>
          //         <div className="form-group" style={{ marginTop: "5%" }}>
          //             {/* <ClipLoader color={"#9F1D41"} loading={loading} size={100} /> */}
          //         </div>
          //     </form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
