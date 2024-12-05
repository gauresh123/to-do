import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function AddTodoScreen() {
  return (
    <View style={styles.container}>
      <Text>AddTodoScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f8f8f8", // Light background for better visuals
  },
});
