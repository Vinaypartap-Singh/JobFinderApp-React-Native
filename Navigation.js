import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Screens Import
import LoginScreen from "./screens/LoginScreen";
import LookFor from "./screens/LookFor";
import RegisterRecruiter from "./screens/RegisterScreens/RegisterRecruiter";
import RegisterFreelancer from "./screens/RegisterScreens/RegisterFreelancer";
import HomeRecruiter from "./screens/RecruiterScreens/HomeScreen";
import ViewCandidate from "./screens/RecruiterScreens/ViewCandidate";
import AddJob from "./screens/RecruiterScreens/AddJob";
import RecruiterProfile from "./screens/RecruiterScreens/RecruiterProfile";
// Icons Import
import {
  HomeIcon,
  AcademicCapIcon,
  PlusCircleIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeSolid,
  AcademicCapIcon as AcademicCapIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
  UserIcon as UserSolid,
} from "react-native-heroicons/solid";
import { theme } from "./theme";
import CandidateHome from "./screens/CandidateScreens/CandidateHome";
import CandidateJobs from "./screens/CandidateScreens/CandidateJobs";
import CandidateProfile from "./screens/CandidateScreens/CandidateProfile";
import AddWorkExperience from "./screens/CandidateScreens/AddWorkExperience";

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabsRecruiter() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.primaryColor,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeRecruiter}
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeSolid color={theme.primaryColor} />
              ) : (
                <HomeIcon color={"grey"} />
              ),
          }}
        />

        <Tab.Screen
          name="ViewCandidate"
          component={ViewCandidate}
          options={{
            headerShown: false,
            title: "Candidates",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AcademicCapIconSolid color={theme.primaryColor} />
              ) : (
                <AcademicCapIcon color={"grey"} />
              ),
          }}
        />

        <Tab.Screen
          name="AddJob"
          component={AddJob}
          options={{
            headerShown: false,
            title: "Add Job",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <PlusCircleIconSolid color={theme.primaryColor} />
              ) : (
                <PlusCircleIcon color={"grey"} />
              ),
          }}
        />

        <Tab.Screen
          name="RecruiterProfile"
          component={RecruiterProfile}
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <UserSolid color={theme.primaryColor} />
              ) : (
                <UserIcon color={"grey"} />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  function BottomTabsCandidate() {
    return (
      <Tab.Navigator
        screenOptions={{ tabBarActiveTintColor: theme.primaryColor }}
      >
        <Tab.Screen
          name="Home"
          component={CandidateHome}
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeSolid color={theme.primaryColor} />
              ) : (
                <HomeIcon color={"grey"} />
              ),
          }}
        />
        <Tab.Screen
          name="Jobs"
          component={CandidateJobs}
          options={{
            headerShown: false,
            title: "Jobs",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AcademicCapIconSolid color={theme.primaryColor} />
              ) : (
                <AcademicCapIcon color={"grey"} />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={CandidateProfile}
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <UserSolid color={theme.primaryColor} />
              ) : (
                <UserIcon color={"grey"} />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
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
          name="RecruiterDashboard"
          component={BottomTabsRecruiter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CandidateHome"
          component={BottomTabsCandidate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CandidateExperience"
          component={AddWorkExperience}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
