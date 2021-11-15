import { ErrorBoundaryInterface, LoginReduxModel } from "./LoginInterfaces";
import * as types from "./LoginActionTypes"
export function Login(state = null, action:any)
{
    switch (action.type)
    {
        case types.LOGIN_SUCCESS: {

            return action.user as LoginReduxModel
        }
        default: {
            return state;
        }
    }
}
export function LoginError(state = [], action:any)
{
    switch (action.type)
    {
        case types.LOGIN_ERROR: {

            return action.LoginError as ErrorBoundaryInterface
        }
        default: {
            return state;
        }
    }
}
export function userIsLoading(state = false, action:any)
{
    switch (action.type)
    {
        case types.LOGIN_IS_LOADING:
            return action.isLoading as boolean;
        default:
            return state;
    }
}