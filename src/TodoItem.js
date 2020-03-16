import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'
import PropTypes from 'prop-types'
import Geolocation from '@react-native-community/geolocation'

const TodoItem = ({ title, id, onDelete }) => {

  const checkLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        checkDistanceToHome(position.coords.latitude, position.coords.longitude)
        console.log(position)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message)
      },
      { enableHighAccuracy: true }
    )
  }

  const checkDistanceToHome = (lat1, lon1) => {
    // Home address:
    const lat2 = 52.103520
    const lon2 = 4.281690

    console.log(lat1)
    console.log(lon1)

    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0
    }
    const radlat1 = Math.PI * lat1 / 180
    const radlat2 = Math.PI * lat2 / 180
    const theta = lon1 - lon2
    const radtheta = Math.PI * theta / 180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist *= 1.609344 * 1000

    console.log(dist.toFixed())
  }

  return (
    <>
      <View style={styles.item}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={Geolocation.watchPosition(
            checkLocation,
            (e) => console.log(e),
          )}
          style={styles.button}
          title="Don't remind me at home"
        />
        <Button
          onPress={() => onDelete(id)}
          style={styles.button}
          color="red"
          title="Delete"
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fad7ff',
    padding: 10,
    marginTop: 8,
    marginHorizontal: 16,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  buttons: {
    backgroundColor: '#ffa6fc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginBottom: 8,
    marginHorizontal: 16,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    fontSize: 32,
  },
  button: {
    alignSelf: 'center',
  },
  delete: {
    color: 'red',
  },
  remind: {
    color: 'blue',
  },
})

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default TodoItem
