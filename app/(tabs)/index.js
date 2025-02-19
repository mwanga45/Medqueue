import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";

const TodoList = () => {
  const data = { id: 1, name: "issa", lastname: "mwanga" };
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: inputText,
          completed: false,
        },
      ]);
      setInputText("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Add a new todo..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={[styles.checkbox, item.completed && styles.checked]}
              onPress={() => toggleTodo(item.id)}
            >
              {item.completed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert("Button Pressed!")}
              style={{ padding: 10, backgroundColor: "blue" }}
            >
              <Text style={{ color: "white" }}>Click Me</Text>
            </TouchableOpacity>

            <Text
              style={[styles.todoText, item.completed && styles.completedText]}
            >
              {item.text}
            </Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No todos yet! Add your first todo.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingTop: Platform.OS === "android" ? 20 : 40,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007bff",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
  deleteText: {
    color: "#ff4444",
    fontSize: 24,
    lineHeight: 24,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontSize: 16,
  },
});

export default TodoList;
