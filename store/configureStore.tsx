import { createStore, applyMiddleware, compose } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../store/reducersConfig/index'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import { Reducer } from 'redux';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import { composeWithDevTools } from 'redux-devtools-extension';
//import storage from 'redux-persist/lib/storage'
import { initialStateModel } from './initialState';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet,
}
const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer);
export default function configureStore(initialState: initialStateModel)
{
    const composeEnhancers = composeWithDevTools || compose;
    let store = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())))
    let persistor = persistStore(store)
    return { store, persistor }
}