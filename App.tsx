import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from './src/screen/welcome';
import Login from './src/screen/login';
import MainContainer from './src/component/mainContainer';
import Setting from './src/screen/setting';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import ProductDetails from './src/screen/productDetails';
import Register from './src/screen/Register';
import ChangePasswordScreen from './src/screen/ChangePasswordScreen';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Main' component={MainContainer} options={{ headerShown: false }} />
          <Stack.Screen name='Setti' component={Setting} options={{ headerShown: false }} />
          <Stack.Screen name='aa' component={ProductDetails} options={{ headerShown: false }} />
          <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />
          <Stack.Screen name='changePass' component={ChangePasswordScreen} options={{ headerShown: false }} />


        </Stack.Navigator>

      </NavigationContainer>
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({})