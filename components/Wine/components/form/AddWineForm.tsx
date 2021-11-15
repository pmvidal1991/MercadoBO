import React, {useState} from 'react';
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
import {
  AddWineFormInitialValuesInterface,
  AddWineFormPropsInterface,
  wineModel,
} from '../../../../store/Wine/WineInterfaces';
import {Picker} from '@react-native-picker/picker';
import {
    Asset,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
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

const AddWineForm: React.FC<AddWineFormPropsInterface> = props => {
  const {onSubmit, handleSetMyFile, loading, myFile} = props;
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Formik
      initialValues={
        {
          nome: '',
          description: '',
          categoria: '',
        } as AddWineFormInitialValuesInterface
      }
      onSubmit={onSubmit}
      validationSchema={Yup.object().shape({
        nome: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        categoria: Yup.string().required('Required'),
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
          const finalval = (errors[value] && touched[value]) as boolean;
          return finalval ? finalval : false;
        };
        const handleChoosePhoto = () => {
          launchImageLibrary(
            {includeBase64: true, mediaType: 'photo'},
            (response: ImagePickerResponse) => {
              // console.log(response);
              if (response) {
                handleSetMyFile(response);
              }
            },
          );
        };
        return (
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <View style={styles.sectionContainer}>
              <TextInput
                label="Nome"
                value={values.nome}
                onChangeText={handleChange('nome')}
                style={{marginBottom: 10, marginTop: -20}}
                onBlur={handleBlur('nome')}
                testID="nome"
                error={(errors.nome && touched.nome && errors.nome) as boolean}
              />
              <HelperText type="error" visible={hasErrors('nome')}>
                Required
              </HelperText>
              <TextInput
                label="description"
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                testID="description"
                style={{marginBottom: 10}}
                error={
                  (errors.description &&
                    touched.description &&
                    errors.description) as boolean
                }
              />
              <HelperText type="error" visible={hasErrors('description')}>
                Required
              </HelperText>
              <Text style={{fontWeight: 'bold', marginTop: 15}}>
                Categoria:
              </Text>
              <Picker
                selectedValue={values.categoria}
                style={{
                  height: 70,
                  width: 300,
                  borderColor: 'black',
                  borderStyle: 'solid',
                }}
                onValueChange={handleChange('categoria')}
                onBlur={handleBlur('categoria')}>
                <Picker.Item label="Verde" value="Verde" />
                <Picker.Item label="Branco" value="Branco" />
                <Picker.Item label="Tinto" value="Tinto" />
                <Picker.Item label="Rose" value="Rose" />
              </Picker>
              <HelperText type="error" visible={hasErrors('categoria')}>
                Required
              </HelperText>
              <View>
              <Text style={{fontWeight: 'bold', marginTop: 15}}>
                Selecione uma Foto(Obrigatorio*)
              </Text>
                <Button
                  icon={({size, color}) => (
                    <Image
                      source={require('../../../../assets/camera.png')}
                      style={[
                        {
                          width: 30,
                          height: 30,
                          tintColor: 'white',
                        },
                      ]}
                    />
                  )}
                  mode="contained"
                  onPress={handleChoosePhoto}
                  style={{
                    backgroundColor: '#9f1d41',
                    width: 50,
                    marginTop: 10,
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:10
                  }}>
                  <Text />
                </Button>

                {myFile && (
                  <>
                    <Image
                      source={{uri: (myFile.assets as Asset[])[0].uri}}
                      style={{width: 300, height: 300}}
                    />
                  </>
                )}
              </View>
              <Button
                disabled={isSubmitting}
                mode="contained"
                style={{
                  marginBottom: 10,
                  width: 200,
                  backgroundColor: '#9f1d41',
                  height: 40,
                  marginTop: 25,
                }}
                onPress={handleSubmit}>
                Adicionar Vinho
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

export default AddWineForm;
