import React, { useCallback, useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { PrivateRoute } from './privateRoute'
import { PublicRoutes } from './publicRoute'

export const Routes = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (user) => {
      setUser(user)
      if (initializing) setInitializing(false)
    },
    [initializing],
  )

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [onAuthStateChanged])

  if (initializing) return null

  return <>{!user ? <PublicRoutes /> : <PrivateRoute />}</>
}
