import React from "react";

import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from "@react-navigation/stack";
import EmptyScreen from "../screens/EmptyScreen";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import StartScreen from "../screens/StartScreen";
import ListScreen from "../screens/ListScreen";
import DetailsScreen from "../screens/DetailsScreen";
import { fakeData } from "../utils/fakeData";

export type RootStackParamList = {
  StartScreen: undefined;
  ListScreen: undefined;
  DetailsScreen: { item: (typeof fakeData)[number] };
};

const Stack = createStackNavigator<RootStackParamList>();

const fadeCardInterpolator: StackCardStyleInterpolator = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
  containerStyle: {
    opacity: current.progress,
  },
});

export default () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: fadeCardInterpolator,
        }}
      >
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="ListScreen" component={ListScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
