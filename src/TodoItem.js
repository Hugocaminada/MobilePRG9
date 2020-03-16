import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'
import PropTypes from 'prop-types'
import Boundary, { Events } from 'react-native-boundary'

const TodoItem = ({ title, id: itemId, onDelete }) => {

  const [isTracking, setIsTracking] = useState(false)

  const startTracking = () => {
    Boundary.add({
      lat: 52.103520,
      lng: 4.281690,
      radius: 50, // in meters
      id: 'Home',
    }).then(() => {
      console.log('success!')
      setIsTracking(true)
    })
      .catch((e) => console.log('error:', e))

    Boundary.on(Events.ENTER, (id) => {
      console.log(`Get out of my ${id}!!`)
    })

    Boundary.on(Events.EXIT, (id) => {
      console.log(`Ya! You better get out of my ${id}!!`)
    })
  }

  const stopTracking = () => {
    Boundary.off(Events.ENTER)
    Boundary.off(Events.EXIT)
    Boundary.remove('Home')
      .then(() => {
        console.log('Tracking is off')
        setIsTracking(false)
      })
      .catch((e) => console.log('Failed to turn tracking off:', e))
  }

  return (
    <>
      <View style={styles.item}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        {isTracking
          ? (
            <Button
            // onPress={Geolocation.watchPosition(
            //   checkLocation,
            //   (e) => console.log(e),
            // )}
              onPress={stopTracking}
              style={styles.button}
              title="Don't remind me at home"
            />
          )
          : (
            <Button
            // onPress={Geolocation.watchPosition(
            //   checkLocation,
            //   (e) => console.log(e),
            // )}
              onPress={startTracking}
              style={styles.button}
              title="Remind me at home"
            />
          )}
        <Button
          onPress={() => onDelete(itemId)}
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
