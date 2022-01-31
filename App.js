import { StyleSheet } from 'react-native';
// importing screens we want to navigate between
import Start from './components/Start';
import Chat from './components/Chat';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// create navigator
const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName= "Start">
          <Stack.Screen
            name="Start"
            component={Start} />
          <Stack.Screen
            name="Chat"
            component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// style sheet at the bottom
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
