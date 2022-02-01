import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {
  render() {
    //entered name state from Start screen gets displayed in status bar at the top of the app
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name});

    const { bgColor } = this.props.route.params;

    return (
      <View style={{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: bgColor
        }}>
        <Text>Hello Chat!</Text>
      </View>
    )
  }
}