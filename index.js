import React from 'react'
import { AppRegistry } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { name as appName } from './app.json'
import todoReducer from './src/reducers/todoReducer'

const rootReducer = combineReducers({
  todoReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)


const TodosApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent(appName, () => TodosApp)
