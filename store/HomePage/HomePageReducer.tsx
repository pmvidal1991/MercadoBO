import * as types from "./HomePageActionTypes"
export function Language(state = null, action:any)
{
    switch (action.type)
    {
        case types.LANGUAGE_SUCCESS: {

            return action.Language as string
        }
        default: {
            return state;
        }
    }
}