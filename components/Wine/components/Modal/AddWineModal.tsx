import {AxiosError, AxiosResponse} from 'axios';
import React, {useState} from 'react';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';
import * as WineApi from '../../../../store/Wine/WineApi';
import {useToast} from 'react-native-paper-toast';
import {
  AddWineFormInitialValuesInterface,
  AddWineModalPropsInterface,
  wineModel,
} from '../../../../store/Wine/WineInterfaces';
import {Asset, ImagePickerResponse} from 'react-native-image-picker';
import AddWineForm from '../form/AddWineForm';
import { ScrollView, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const AddWineModal: React.FC<AddWineModalPropsInterface> = props => {
  const {
    showmodal,
    closeModal,
    getList,
    language,
    Wines,
    iswinesLoading,
    winesisLoading,
  } = props;
  let [myFile, setMyFile] = useState<ImagePickerResponse>();
  const handleSetMyFile = (file: ImagePickerResponse) => {
    setMyFile(file);
  };
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const toaster = useToast();
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const AddWine = (
    values: AddWineFormInitialValuesInterface,
    {setSubmitting}: any,
  ) => {
    winesisLoading(true);
    setSubmitting(true);
    const headers = {
      ContentType: 'application/json',
    };
    var data = new FormData();
    data.append('vinhoName', values.nome);
    data.append('VinhoDescription', values.description);
    data.append('VinhoCategoria', values.categoria);
    var imageData = {
      uri: (myFile?.assets as Asset[])[0].uri,
       type: (myFile?.assets as Asset[])[0].type, //the mime type of the file
       name: (myFile?.assets as Asset[])[0].fileName
     }
    data.append('img', imageData);
    try {
      WineApi.AddVinho(language, data).then(
        (resp: AxiosResponse | AxiosError) => {
          if ((resp as AxiosResponse).data !== undefined) {
            var response = (resp as AxiosResponse).data;
            if (response.success == true) {
              getList();

              toaster.show({
                message: response.message,
                type: 'success',
                position: 'top',
              });

              winesisLoading(false);
              setSubmitting(false);
              closeModal();
              setMyFile(undefined);
            } else {
              closeModal();
              winesisLoading(false);
              setSubmitting(false);
              toaster.show({
                message: response.message,
                type: 'error',
                position: 'top',
              });
              setMyFile(undefined);
            }
          } else {
            if ((resp as AxiosError).isAxiosError === true) {
              winesisLoading(false);
              //AddWineError(resp as AxiosError);
              toaster.show({
                message: (resp as AxiosError).message as string,
                type: 'error',
                position: 'top',
              });
              setSubmitting(false);
              setMyFile(undefined);
            }
          }
        },
      );
    } catch (error) {
      winesisLoading(false);
      //AddWineError(error as AxiosError);
      toaster.show({
        message: (error as AxiosError).message as string,
        type: 'error',
        position: 'top',
      });
      setSubmitting(false);
      setMyFile(undefined);
    }
  };
  return (
    <Modal
      visible={showmodal}
      onDismiss={()=>{closeModal(); setMyFile(undefined);}}
      contentContainerStyle={containerStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <AddWineForm
          loading={iswinesLoading}
          handleSetMyFile={handleSetMyFile}
          onSubmit={AddWine}
          myFile={myFile as ImagePickerResponse}
        />
      </ScrollView>
    </Modal>
  );
};

export default AddWineModal;
