import { combineReducers } from "redux";
import { Login, userIsLoading, LoginError } from '../Login/LoginReducer';
import { Language } from '../HomePage/HomePageReducer';
import { Wines,WinesError,winesIsLoading } from '../Wine/WineReducer';


const rootReducer = combineReducers({
    Login,
    userIsLoading,
    LoginError,
    Language,
    Wines,
    WinesError,
    winesIsLoading,

});

export default rootReducer;