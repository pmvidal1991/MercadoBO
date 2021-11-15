import {AxiosError, AxiosResponse} from 'axios';
import * as React from 'react';
import {View} from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  ActivityIndicator,
} from 'react-native-paper';
import {DeleteWineDialogPropsInterface} from '../../../../store/Wine/WineInterfaces';
import {useToast} from 'react-native-paper-toast';
import * as WineApi from '../../../../store/Wine/WineApi';

const DeleteWineDialog: React.FC<DeleteWineDialogPropsInterface> = props => {
  const {
    openDialog,
    VinhoId,
    handleCloseNewUserDialog,
    getList,
    language,
    winesisLoading,
    iswinesLoading,
  } = props;
  const toaster = useToast();
  const DeleteWine = () => {
    winesisLoading(true);
    try {
      WineApi.DeleteVinho(language, VinhoId).then(
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
              handleCloseNewUserDialog();
              winesisLoading(false);
            } else {
              winesisLoading(false);
              toaster.show({
                message: response.message,
                type: 'error',
                position: 'top',
              });
            }
          } else {
            if ((resp as AxiosError).isAxiosError === true) {
              winesisLoading(false);
              handleCloseNewUserDialog();
              //AddWineError(resp as AxiosError);
              toaster.show({
                message: (resp as AxiosError).message as string,
                type: 'error',
                position: 'top',
              });
            }
          }
        },
      );
    } catch (error) {
      winesisLoading(false);
      handleCloseNewUserDialog();
      //AddWineError(error as AxiosError);
      toaster.show({
        message: (error as AxiosError).message as string,
        type: 'error',
        position: 'top',
      });
    }
  };
  return (
    <Dialog visible={openDialog} onDismiss={()=>{handleCloseNewUserDialog();}}>
      <Dialog.Title>Tem a certeza que quer Eliminar o Vinho?</Dialog.Title>
      <Dialog.Content>
        <ActivityIndicator
          animating={iswinesLoading}
          color={'#9f1d41'}
          size="large"
          style={{marginBottom: 10, marginTop: 10}}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={()=>{DeleteWine();}}>Sim</Button>
        <Button onPress={()=>{handleCloseNewUserDialog();}}>Não</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DeleteWineDialog;
