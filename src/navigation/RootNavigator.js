import React, { useState } from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from '../views/LoginView'

import VisitorGateEntryView from '../views/VisitorGateEntryView';
import RegisterEntryHomeView from '../views/RegisterEntryHomeView';
const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginView}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="GateEntryHome"
            component={RegisterEntryHomeView}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="GateEntry"
            component={VisitorGateEntryView}
          />
     
   

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default RootNavigator;
