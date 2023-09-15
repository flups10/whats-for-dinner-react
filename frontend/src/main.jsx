import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import CustomDinnerScreen from './screens/CustomDinnerScreen.jsx'
import OneDinnerScreen from './screens/OneDinnerScreen.jsx'
import UpdateDinnerScreen from './screens/UpdateDinnerScreen.jsx'
import UpdateUserScreen from './screens/UpdateUserScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App /> }>
      <Route index={true} path='/' element={<HomeScreen />}/>
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/one-dinner/:id' element={<OneDinnerScreen />} />
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<ProfileScreen/>}/>
        <Route path='/edit-user-data' element={<UpdateUserScreen />} />
        <Route path='/add-custom-dinner' element={<CustomDinnerScreen/>} />
        <Route path='/update-custom-dinner/:id' element={<UpdateDinnerScreen/>} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
