import { AxiosError } from "axios";
import { ImagePickerResponse } from "react-native-image-picker";
import { LoginReduxModel } from "../Login/LoginInterfaces";

export interface wineModel {
    id: string;
    nome: string;   
    description: string;
    lang: string;
    img: string;
    categoria: string;
}
export interface WineErrorBoundaryInterface {
    isError: boolean;
    errorMessage: string;
}
export interface WinePagePropsInterface
{
    User: LoginReduxModel;
    login: (arg: FormData | null) => Promise<any>;
    WinesError: WineErrorBoundaryInterface,
    getWinesError: (arg: AxiosError | null) => Promise<any>;
    getWineByIdError: (arg: AxiosError | null) => Promise<any>;
    AddWineError: (arg: AxiosError | null) => Promise<any>;
    iswinesLoading: boolean;
    setWines: (arg: string) => Promise<any>;
    winesisLoading: (arg: boolean) => { type: string; iswinesLoading: boolean };
    Wines: wineModel[];
    getWineById: (arg: string) => Promise<any>;
    addWineError: WineErrorBoundaryInterface,
    WineError: WineErrorBoundaryInterface,
    Wine: wineModel,
    language: string;
}
export interface AddWineModalPropsInterface {
    showmodal: boolean;
    closeModal: () => void;
    language: string;
    Wines: wineModel[];
    getList: () => Promise<any>;
    iswinesLoading:boolean;
    winesisLoading: (arg: boolean) => { type: string; iswinesLoading: boolean };
}
export interface WinesResponse
{
    type: string;
    Wines: wineModel[];
}
export interface AddWineFormInitialValuesInterface {
    [Key: string]: string;
}
export interface AddWineFormPropsInterface
{
    loading: boolean;
    handleSetMyFile: (file:ImagePickerResponse) => void;
    onSubmit: (values: AddWineFormInitialValuesInterface, { setSubmitting }: { setSubmitting: any }) => void
    myFile:ImagePickerResponse;

}
export interface DeleteWineDialogPropsInterface
{
    openDialog: boolean;
    VinhoId:string;
    handleCloseNewUserDialog: () => void;
    getList: () => Promise<any>;
    language: string;
    iswinesLoading:boolean;
    winesisLoading: (arg: boolean) => { type: string; iswinesLoading: boolean };
}