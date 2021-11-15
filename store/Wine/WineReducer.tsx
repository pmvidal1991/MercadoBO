import * as types from "./WineActionTypes"
import { WineErrorBoundaryInterface, wineModel } from "./WineInterfaces";
export function Wines(state = [], action: any) {
    switch (action.type) {
        case types.GET_VINHOS_SUCCESS: {

            return action.Wines as wineModel[]
        }
        default: {
            return state;
        }
    }
}
export function WinesError(state = [], action: any) {
    switch (action.type) {
        case types.GET_WINES_ERROR: {

            return action.WinesError as WineErrorBoundaryInterface
        }
        default: {
            return state;
        }
    }
}
export function winesIsLoading(state = false, action: any)
{
    switch (action.type)
    {
        case types.WINES_IS_LOADING:
            return action.iswinesLoading as boolean;
        default:
            return state;
    }
}