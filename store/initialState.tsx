import {ErrorBoundaryInterface, LoginReduxModel} from './Login/LoginInterfaces';
import {wineModel} from './Wine/WineInterfaces';

export interface initialStateModel {
  Login: LoginReduxModel | null;
  userIsLoading: boolean;
  LoginError: ErrorBoundaryInterface | null;
  Language: String | null;
  Wines: wineModel[] | null;
  winesIsLoading: boolean;
}
export let initialState: initialStateModel = {
  Login: null,
  userIsLoading: false,
  LoginError: null,
  Language: 'PT',
  Wines: null,
  winesIsLoading:false,
};
