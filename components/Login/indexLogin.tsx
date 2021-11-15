import {AxiosError} from 'axios';
import React, {useEffect} from 'react';
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
import {connect} from 'react-redux';
import {Action} from 'redux';
import {useToast} from 'react-native-paper-toast';
import {ThunkDispatch} from 'redux-thunk';
import {initialStateModel} from '../../store/initialState';
import * as LoginActions from '../../store/Login/LoginActions';
import * as WineActions from '../../store/Wine/WineActions';
import {
  loginFormInitialValuesInterface,
  loginPropsInterface,
  LoginResponse,
} from '../../store/Login/LoginInterfaces';
import LoginForm from './components/form/loginForm';
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
const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const Login: React.FC<loginPropsInterface> = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const toaster = useToast();
  const {isLoading, login, userisLoading, Error, loginError, navigation, setWines} =
    props;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const setAppValues = () =>
  {
    setWines('PT');
  };
  const login1 = async (
    values: loginFormInitialValuesInterface,
    {setSubmitting}: any,
  ) => {
    //setLoading(true);
    userisLoading(true);
    setSubmitting(true);
    const headers = {
      ContentType: 'application/json',
    };
    var data = new FormData();
    data.append('Username', values.username);
    data.append('Password', values.password);
    data.append('Login', 'true');
    try {
      await login(data).then((resp: LoginResponse) => {
        if (resp.user) {
          const {user} = resp;
          if (user !== null && user.success == true) {
            userisLoading(false);
            setAppValues();

            toaster.show({
              message: `welcome: ${user.Username}`,
              type: 'success',
              position:'top'
            });
            navigation.navigate('Home');
            userisLoading(false);
            setSubmitting(false);
          } else {
            toaster.show({
              message: 'Password or Username are Incorret!',
              type: 'error',
              position:'top'
            });
          }
        }
        setSubmitting(false);
        userisLoading(false);
      });
    } catch (ex) {
      userisLoading(false);
      toaster.show({
        message: 'An error has occured while trying trying to Login',
        type: 'error',
        position:'top'
      });
    }
  };
  useEffect(() => {
    login(null);
  }, []);
  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Image
            source={require('../../mercadopeixe_red.png')}
            style={{width: '100%', height: 300, resizeMode: 'contain'}}
          />
          <LoginForm onSubmit={login1} loading={isLoading} />
        </View>
      </ScrollView>
    </>
  );
};
function mapStateToProps(state: initialStateModel) {
  return {
    isLoading: state.userIsLoading,
    Error: state.LoginError,
  };
}
function mapDispatchToProps(
  dispatch: ThunkDispatch<initialStateModel, void, Action>,
) {
  return {
    login: (arg: FormData | null) => dispatch(LoginActions.login(arg)),
    userisLoading: (arg: boolean) => dispatch(LoginActions.userisLoading(arg)),
    loginError: (arg: AxiosError | null) =>
    dispatch(LoginActions.loginError(arg)),
    setWines: (arg: string) => dispatch(WineActions.setWines(arg)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps as any)(Login);
