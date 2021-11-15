import { wineModel } from "./WineInterfaces";
import * as types from "./WineActionTypes"
import { ThunkDispatch } from "redux-thunk";
import { initialStateModel } from "../initialState";
import * as WineApi from "./WineApi"
import { Action } from "redux";
import { AxiosError, AxiosResponse } from "axios";
const GetWinesErrorMessage = 'An error has occured while trying geting the list: ';
export function getWinesSuccess(Wines: wineModel[]) {
    return { type: types.GET_VINHOS_SUCCESS, Wines }
}
export function getWinesError(Error: AxiosError | null) {
    return { type: types.GET_WINES_ERROR, WinesError: { isError: Error && Error.isAxiosError !== undefined ? Error.isAxiosError : false, errorMessage: Error && Error.message !== undefined ? GetWinesErrorMessage + Error.message : '' } }
}
export function setWines(lang: string) {

    return async function (dispatch: ThunkDispatch<initialStateModel, void, Action>) {
        try {
            const WinesResp = await WineApi.GetWines(lang);
            return dispatch(getWinesSuccess((WinesResp as AxiosResponse).data as wineModel[]));
        }
        catch (error) {
            return dispatch(getWinesError(error as AxiosError));
        }
    }

}
export function winesisLoading(loading: boolean)
{
    return { type: types.WINES_IS_LOADING, iswinesLoading: loading }
}