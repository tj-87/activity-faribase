import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Routes } from './src/routes'
import { StatusBar } from 'react-native'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </NavigationContainer>
  )
}
