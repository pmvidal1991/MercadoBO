import React from 'react';
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
import { Picker } from '@react-native-picker/picker';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import * as LoginActions from '../../store/Login/LoginActions';
import * as HomePageActions from '../../store/HomePage/HomePageActions';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {HomePagePropsInterface} from '../../store/HomePage/HomePageInterfaces';
import {initialStateModel} from '../../store/initialState';
import {connect} from 'react-redux';
import {
  TextInput,
  Button,
  ActivityIndicator,
  HelperText,
} from 'react-native-paper';

const HomePage: React.FC<HomePagePropsInterface> = props => {
  const {language, setLang, user, login, navigation} = props;
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
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
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={{fontWeight: 'bold', marginTop: 15, marginLeft: 30}}>
              Linguagem:
            </Text>
            <Picker
              selectedValue={language}
              style={{height: 50, width: 300}}
              onValueChange={(itemValue, itemIndex) => setLang(itemValue)}>
              <Picker.Item label="🇵🇹 Português" value="PT" />
              <Picker.Item label="🇬🇧 Inglês" value="EN" />
              <Picker.Item label="🇪🇸 Espanhol" value="ES" />
              <Picker.Item label="🇫🇷 Francês" value="FR" />
            </Picker>
          </View>
          <Button
            mode="contained"
            onPress={()=>{
              navigation.navigate('Wine');
            }}
            icon={({ size, color}) => (
              <Image
                source={require('../../assets/taca-de-vinho.png')}
                style={[
                  {
                    width: 30,
                    height: 30,
                    tintColor: "white"
                  }
                ]}
              />
            )}
            style={{
              marginBottom: 10,
              width: 200,
              marginLeft: 100,
              backgroundColor: '#9f1d41',
              height: 150,
              marginTop: 25,
              justifyContent:'center',
            }}>
              <Text>
              Vinhos
            </Text>
          </Button>
          <Button
            mode="contained"
            style={{
              marginBottom: 10,
              width: 200,
              marginLeft: 100,
              backgroundColor: '#9f1d41',
              height: 150,
              marginTop: 25,
              justifyContent:'center'
            }}>

             
              <Text>
              Ementa
            </Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
};
function mapStateToProps(state: initialStateModel) {
  return {
    user: state.Login,
    language: state.Language,
  };
}
function mapDispatchToProps(
  dispatch: ThunkDispatch<initialStateModel, void, Action>,
) {
  return {
    login: (arg: FormData | null) => dispatch(LoginActions.login(arg)),
    setLang: (arg: string) => dispatch(HomePageActions.setLang(arg)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps as any)(HomePage);
