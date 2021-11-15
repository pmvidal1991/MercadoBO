import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { initialStateModel } from "../initialState";
import { LoginReduxModel } from "../Login/LoginInterfaces";

export interface HomePagePropsInterface
{
    user: LoginReduxModel;
    login: (arg: FormData | null) => Promise<any>;
    language: string;
    setLang:(LangResp: string) => (dispatch: ThunkDispatch<initialStateModel, void, Action>) => Promise<unknown>;
    navigation:any;
}