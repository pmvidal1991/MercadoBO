import React, {useState} from 'react';
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
import * as LoginActions from '../../store/Login/LoginActions';
import * as WineActions from '../../store/Wine/WineActions';
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
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import {useToast} from 'react-native-paper-toast';
import {
  WinePagePropsInterface,
  WinesResponse,
} from '../../store/Wine/WineInterfaces';
import AddWineModal from './components/Modal/AddWineModal';
import DeleteWineDialog from './components/Dialogs/DeleteWineDialog';
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
const WinePage: React.FC<WinePagePropsInterface> = props => {
  const {
    language,
    User,
    login,
    Wines,
    winesisLoading,
    setWines,
    iswinesLoading,
  } = props;
  const isDarkMode = useColorScheme() === 'dark';
  const [showmodal, setShowmodal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [vinhoId, setVinhoId] = useState<string>();
  const toaster = useToast();
  const showModalClick = () => {
    setShowmodal(true);
  };
  const closeModal = () => {
    setShowmodal(false);
  };
  const showLoader = () => {
    winesisLoading(true);
  };
  const closeLoader = () => {
    winesisLoading(false);
  };
  const handleOpenNewUserDialog = (id: string) => {
    setVinhoId(id);
    setOpenDialog(true);
  };
  const handleCloseNewUserDialog = () => {
    setOpenDialog(false);
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  console.log('wines: ', Wines);
  const renderLang = () => {
    switch (language) {
      case 'PT': {
        return '🇵🇹 Português';
      }
      case 'EN': {
        return '🇬🇧 Inglês';
      }
      case 'ES': {
        return '🇪🇸 Espanhol';
      }
      case 'FR': {
        return '🇫🇷 Francês';
      }
    }
  };

  const getList = async () => {
    showLoader();

    try {
      await setWines(language).then((resp: WinesResponse) => {
        closeLoader();
      });
    } catch (ex) {
      closeLoader();
      toaster.show({
        message: 'An error has occured while trying geting the list',
        type: 'error',
        position: 'top',
      });
    }
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
            <Text
              style={{
                fontWeight: 'bold',
                marginTop: 15,
                marginLeft: 30,
                fontSize: 16,
              }}>
              Linguagem: {renderLang()}
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: isDarkMode ? Colors.white : Colors.black,
                },
              ]}>
              Greeting:
            </Text>
            <TextInput
              label="Greeting"
              style={{marginTop: 10}}
              testID="greeting"
            />
            <Button
              mode="contained"
              style={{
                marginBottom: 10,
                width: 100,
                backgroundColor: '#9f1d41',
                height: 40,
                marginTop: 25,
              }}>
              Editar
            </Button>
            <Button
              mode="contained"
              onPress={showModalClick}
              icon={({size, color}) => (
                <Image
                  source={require('../../assets/botao-adicionar.png')}
                  style={[
                    {
                      width: 30,
                      height: 30,
                      tintColor: 'white',
                    },
                  ]}
                />
              )}
              style={{
                marginBottom: 10,
                width: 200,
                backgroundColor: '#9f1d41',
                height: 50,
                marginTop: 25,
                justifyContent: 'center',
              }}>
              <Text>Adicionar Vinho</Text>
            </Button>
          </View>
          <View>
            {Wines.map(item => {
              return (
                <Card key={item.id}>
                  <Card.Cover
                    source={{
                      uri:
                        'https://www.restaurantemercadopeixeaveiro.pt/mercadoWebBackoffice/img/Vinhos/' +
                        item.img,
                    }}
                    resizeMode="contain"
                    resizeMethod="scale"
                    style={{
                      flexDirection: 'column',
                      flex: 1,
                      display: 'flex',
                      backgroundColor: 'white',
                    }}
                  />
                  <Card.Title title={item.nome} />
                  <Card.Content>
                    <Title>Descrição</Title>
                    <Paragraph>{item.description}</Paragraph>
                    <Title>Categoria</Title>
                    <Text>{item.categoria}</Text>
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      mode="contained"
                      icon={({size, color}) => (
                        <Image
                          source={require('../../assets/editing.png')}
                          style={[
                            {
                              width: 30,
                              height: 30,
                              tintColor: 'white',
                            },
                          ]}
                        />
                      )}
                      style={{
                        marginBottom: 10,
                        width: 180,
                        backgroundColor: '#9f1d41',
                        height: 50,
                        marginTop: 25,
                        justifyContent: 'center',
                      }}>
                      <Text></Text>
                    </Button>
                    <Button
                      mode="contained"
                      onPress={() => {
                        handleOpenNewUserDialog(item.id);
                      }}
                      icon={({size, color}) => (
                        <Image
                          source={require('../../assets/delete.png')}
                          style={[
                            {
                              width: 30,
                              height: 30,
                              tintColor: 'white',
                            },
                          ]}
                        />
                      )}
                      style={{
                        marginBottom: 10,
                        width: 180,
                        backgroundColor: '#9f1d41',
                        height: 50,
                        marginTop: 25,
                        justifyContent: 'center',
                        marginLeft: 30,
                      }}>
                      <Text></Text>
                    </Button>
                  </Card.Actions>
                </Card>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <AddWineModal
        showmodal={showmodal}
        closeModal={closeModal}
        getList={getList}
        language={language}
        Wines={Wines}
        iswinesLoading={iswinesLoading}
        winesisLoading={winesisLoading}
      />
      <DeleteWineDialog
        language={language}
        getList={getList}
        VinhoId={vinhoId as string}
        handleCloseNewUserDialog={handleCloseNewUserDialog}
        openDialog={openDialog}
        iswinesLoading={iswinesLoading}
        winesisLoading={winesisLoading}
      />
    </>
  );
};
function mapStateToProps(state: initialStateModel) {
  return {
    user: state.Login,
    language: state.Language,
    Wines: state.Wines,
    iswinesLoading: state.winesIsLoading,
  };
}
function mapDispatchToProps(
  dispatch: ThunkDispatch<initialStateModel, void, Action>,
) {
  return {
    login: (arg: FormData | null) => dispatch(LoginActions.login(arg)),
    setWines: (arg: string) => dispatch(WineActions.setWines(arg)),
    winesisLoading: (arg: boolean) => dispatch(WineActions.winesisLoading(arg)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps as any)(WinePage);
