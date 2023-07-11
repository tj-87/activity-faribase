import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../../pages/login'
import { Register } from '../../pages/register'
import { ForgotPassword } from '../../pages/forgotPassword'

const Stack = createNativeStackNavigator()

export const PublicRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
