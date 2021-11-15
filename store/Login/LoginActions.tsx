import * as types from "./LoginActionTypes"
import * as LoginApi from "./LoginApi"
import { AxiosError, AxiosResponse } from "axios"
import { LoginReduxModel } from "./LoginInterfaces"
import { Action } from "redux";
import { initialStateModel } from "../../store/initialState";
import { ThunkDispatch } from "redux-thunk";

const loginErrorMessage = 'An error has occured while trying to Login: ';

export function loginSuccess(userData: LoginReduxModel | null)
{
    return { type: types.LOGIN_SUCCESS, user: userData }
}
export function loginError(Error: AxiosError | null)
{
    return { type: types.LOGIN_ERROR, LoginError: { isError: Error && Error.isAxiosError !== undefined ? Error.isAxiosError : false, errorMessage: Error && Error.message !== undefined ? loginErrorMessage + Error.message : '' } }
}
export function userisLoading(loading: boolean)
{
    return { type: types.LOGIN_IS_LOADING, isLoading: loading }
}

export function login(LoginData: FormData | null)
{

    if (LoginData === null)
    {
        return async function (dispatch: ThunkDispatch<initialStateModel, void, Action>)
        {
            return dispatch(loginSuccess(LoginData))
        }


    }
    return async function (dispatch: ThunkDispatch<initialStateModel, void, Action>)
    {
        try
        {
            const LoginResp = await LoginApi.LoginUser(LoginData);
            return dispatch(loginSuccess((LoginResp as AxiosResponse).data as LoginReduxModel));
        } catch (error)
        {
            return dispatch(loginError(error as AxiosError));
        }


    }



}