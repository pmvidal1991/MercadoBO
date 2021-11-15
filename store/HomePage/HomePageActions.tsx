import * as types from "./HomePageActionTypes"
import { Action } from "redux";
import { initialStateModel } from "../../store/initialState";
import { ThunkDispatch } from "redux-thunk";

export function languageSuccess(Language:string) {
    return { type: types.LANGUAGE_SUCCESS, Language }
}
export function setLang(LangResp:string) {

    return async function (dispatch: ThunkDispatch<initialStateModel, void, Action>)
    {
        return dispatch(languageSuccess(LangResp));
    }

}