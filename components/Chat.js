import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';

import { GiftedChat, Bubble, Day} from 'react-native-gifted-chat';

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

/* componentDidMount function gets called after Chat component mounts. State gets set
with static message so you see each element of the UI displayed on screen with setState function */

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {},
          right: {},
        }}
      />
    )
  };

  renderDay(props) {
    const { bgColor } = this.props.route.params;
    return (
      <Day
        {...props}
        textStyle= {{color: bgColor === '#B9C6AE' ? '#555555' : '#dddddd'}}
      />
    );
  }

  render() {
    //entered name state from Start screen gets displayed in status bar at the top of the app
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name});

    const { bgColor } = this.props.route.params;

    return (
      <View style={{
        flex: 1, 
        justifyContent: 'center', 
        backgroundColor: bgColor
        }}>
          <GiftedChat 
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            renderBubble={this.renderBubble.bind(this)}
            renderDay={this.renderDay.bind(this)}
            user={{
              _id: 1,
            }}
          />

        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )
  }
}