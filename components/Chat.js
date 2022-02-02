import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';

import { GiftedChat, Bubble, Day, SystemMessage} from 'react-native-gifted-chat';

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
    const name = this.props.route.params.name;

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello ' + name,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: name + ' has entered the chat',
          createdAt: new Date(),
          system: true,
          fontsColor: '#000'
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  //renderBubble function defines style of user messages
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


  //renderDay function renders a message showing the date of the chat; the text color depends on the set background color
  renderDay(props) {
    const { bgColor } = this.props.route.params;
    return (
      <Day
        {...props}
        textStyle= {{color: bgColor === '#B9C6AE' ? '#555555' : '#dddddd'}}
      />
    );
  }

  //renderSystemMessage function renders a system message; the text color depends on the set background color
  renderSystemMessage(props) {
    const { bgColor } = this.props.route.params;
    return (
      <SystemMessage
        {...props}
        textStyle= {{color: bgColor === '#B9C6AE' ? '#555555' : '#dddddd'}}
      />
    );
  }

  render() {
    //entered name state from Start screen gets displayed in status bar at the top of the app
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name});

    // color picked in Start screen gets applied for chat screen
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
            renderSystemMessage={this.renderSystemMessage.bind(this)}
            user={{
              _id: 1,
            }}
          />

        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )
  }
}