import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import LookFor from "./screens/LookFor";
import RegisterRecruiter from "./screens/RegisterScreens/RegisterRecruiter";
import RegisterFreelancer from "./screens/RegisterScreens/RegisterFreelancer";
import TestScreen from "./screens/TestScreen";

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LookingFor">
        <Stack.Screen
          name="LookingFor"
          component={LookFor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterRecruiter"
          component={RegisterRecruiter}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterFreelancer"
          component={RegisterFreelancer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TestScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
