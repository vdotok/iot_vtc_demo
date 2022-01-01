import { applyMiddleware,  createStore } from "redux";
import {createLogger} from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk';
import AllReducer from "./reducers/CombinedReducers";
const Mlogger = createLogger();
// let persistor = persistStore(store)
// const Store=createStore(AllReducer , applyMiddleware( thunkMiddleware , Mlogger )  );
// let persistor = persistStore(Store)
// export default Store;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user_data' , 'users' , 'groups' , 'room_messages' , 'group_subscribers'],
    blacklist:['newreducer' ]
  }
   
    const persistedReducer = persistReducer(persistConfig, AllReducer)
  
    let Store = createStore(persistedReducer , applyMiddleware( thunkMiddleware , Mlogger )  );
    let persistor = persistStore(Store)
    export { Store, persistor }