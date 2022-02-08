import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';

import { GiftedChat, Bubble, Day, SystemMessage} from 'react-native-gifted-chat';

//importing firestore
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      }
    }

    const firebaseConfig = {
      apiKey: "AIzaSyDu1u8lua7wpjfmRZOHsBkqVPJSy4cAiv0",
      authDomain: "chatapp-542fb.firebaseapp.com",
      projectId: "chatapp-542fb",
      storageBucket: "chatapp-542fb.appspot.com",
      messagingSenderId: "365864831912"
    }

    //initialize app 
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    //reference firestore database
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

/* componentDidMount function gets called after Chat component mounts. State gets set
with static message so you see each element of the UI displayed on screen with setState function */

  componentDidMount() {

    //entered name state from Start screen gets displayed in status bar at the top of the app
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name});

    //authentication
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any"
        }
      });
      //listener for collection updates
      this.unsubscribe = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        }
      });
    });
    this.setState({
      messages: messages
    });
  };

  //adding new message to database collection
  addMessage() {
    const message = this.state.messages[0];
    
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: this.state.user
    });
  }

  //happens when user sends a message; addMessage() gets called to add message to the state
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
    })
  }

    //dont receive updates from collection
    componentWillUnmount() {
      this.authUnsubscribe();
      this.unsubscribe();
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
              _id: this.state.user._id,
              name: this.state.name,
              avatar: this.state.user.avatar
            }}
          />

        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )
  }
}