import React, { Component } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import Todos from './src/HomeScreen'

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission',
        message: 'Needed obviously',
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Granted Permission')
    } else {
      console.log('Denied Permission')
    }
  } catch (err) {
    console.warn(err)
  }
}

class App extends Component {

  UNSAFE_componentWillMount(): void {
    if (Platform.OS === 'android') {
      requestLocationPermission()
    }
  }


  render() {
    return (
      <Todos />
    )
  }
}

export default App
