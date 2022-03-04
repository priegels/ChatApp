import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, Day, SystemMessage, InputToolbar} from 'react-native-gifted-chat';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

import { LogBox } from 'react-native';

//ignore warnings
LogBox.ignoreLogs([
  'Setting a timer', 
  'Animated.event now requires a second argument for options',
  'AsyncStorage has been extracted from react-native core']);

//importing firestore
const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDu1u8lua7wpjfmRZOHsBkqVPJSy4cAiv0",
  authDomain: "chatapp-542fb.firebaseapp.com",
  projectId: "chatapp-542fb",
  storageBucket: "chatapp-542fb.appspot.com",
  messagingSenderId: "365864831912",
  appId: "1:365864831912:web:d9875eaa34148a6eefeb9d",
  measurementId: "G-MB53VJ1H1V"
}

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
      },
      isConnected: false,
      image: null,
      location: null,
    }

    //initialize app 
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    //reference firestore database
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  //get messages from asyncStorage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //save msgs to asyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete msgs from asyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  };

/* componentDidMount function gets called after Chat component mounts. State gets set
with static message so you see each element of the UI displayed on screen with setState function */

  componentDidMount() {

    //entered name state from Start screen gets displayed in status bar at the top of the app
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name});

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');

          //listener for collection updates
          this.unsubscribe = this.referenceChatMessages
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onCollectionUpdate);

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
            },
          });

          this.refMsgsUser = firebase
            .firestore()
            .collection("messages")
            .where("uid", "==", this.state.uid);
        });
        //save msgs when online
        this.saveMessages();

        } else {
          // if user offline
          this.setState({ isConnected: false });
          console.log('offline');
          this.getMessages();
        }
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
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages: messages
    });
    // save messages to local AsyncStorge
    this.saveMessages()
  };

  //dont receive updates from collection
  componentWillUnmount() {
      this.authUnsubscribe();
      this.unsubscribe();
  }

  //adding new message to database collection
  addMessage() {
    const message = this.state.messages[0];
    
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || "",
      location: message.location || null,
    });
  }

  //happens when user sends a message; addMessage() gets called to add message to the state
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage()
      this.saveMessages();
    });
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

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
          {...props}
        />
      );
    }
  }

   //to access CustomActions
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  //return a MapView when surrentMessage contains location data
  renderCustomView (props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
        return (
            <MapView
                style={{width: 150,
                height: 100,
                borderRadius: 13,
                margin: 3}}
                region={{
                latitude: currentMessage.location.latitude,
                longitude: currentMessage.location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            />
        );
    }
    return null;
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
            onSend={messages => this.onSend(messages)}
            renderBubble={this.renderBubble.bind(this)}
            renderDay={this.renderDay.bind(this)}
            renderSystemMessage={this.renderSystemMessage.bind(this)}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderActions={this.renderCustomActions}
            renderCustomView={this.renderCustomView}
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