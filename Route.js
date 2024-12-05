import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "./screens/MainScreen";
import AddTodoScreen from "./screens/AddTodoScreen";

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{
            title: "Main Screen",
          }}
        />
        <Stack.Screen
          name="Add Todo"
          component={AddTodoScreen}
          options={{
            title: "Add Todo",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
