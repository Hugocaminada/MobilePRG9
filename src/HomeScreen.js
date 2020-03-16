import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import { addTodoAction, removeTodoAction } from './actions/todo'

const HomeScreen = ({ todos, addTodo, removeTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('')

  const idGenerator = () => {
    const S4 = () => (
      // eslint-disable-next-line no-bitwise
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    )
    return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setNewTodoTitle(text)}
          value={newTodoTitle}
          onSubmitEditing={() => addTodo(newTodoTitle, idGenerator())}
        />
        <TouchableOpacity
          onPress={() => addTodo(newTodoTitle, idGenerator())}
          style={styles.addButton}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            title={item.title}
            id={item.id}
            onDelete={removeTodo}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b5ffc2',
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  inputField: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 5,
  },
  addButton: {
    justifyContent: 'center',
  },
})

HomeScreen.propTypes = {
  todos: PropTypes.array.isRequired,
  addTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  todos: state.todoReducer.todos,
})

const mapDispatchToProps = (dispatch) => ({
  addTodo: (title, id) => dispatch(addTodoAction(title, id)),
  removeTodo: (id) => dispatch(removeTodoAction(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
