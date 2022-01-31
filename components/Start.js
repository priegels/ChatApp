import React from 'react';
// importing Components from react native
import { StyleSheet, View, Text, TextInput, Pressable, ImageBackground } from 'react-native';
// importing images and icons
import BackgroundImage from '../assets/background-image.png';

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    // state will be updated with whatever values change for the specific states
    this.state = { 
      text: '',
      name: ''
    };
  }
  
  render() {
    return (
      //Different components do differents things; View acts as a div from html
      <View style={styles.container}>
        <ImageBackground source={BackgroundImage} resizeMode='cover' style={styles.backgroundImage}>
          <View style={styles.titleBox}> 
            <Text style={styles.title}>App Title</Text>
          </View>
          <View style={styles.box1}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.yourName}
                onChangeText={(text) => this.setState({ name: text})}
                value={this.state.name}
                placeholder='Your Name'
              />
            </View>
            <View style={styles.colorBox}>
              <Text style={styles.chooseColor}> Choose Background Color: </Text>
            </View>
            <View style={styles.colorArray}>
              <View style={styles.color1}></View>
              <View style={styles.color2}></View>
              <View style={styles.color3}></View>
              <View style={styles.color4}></View>     
            </View>
            <Pressable
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name})}>
                <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleBox: {
    height: '50%',
    width: '88%',
    alignItems: 'center',
    paddingTop: 100
  },

  title: {
    fontSize: 45, 
    fontWeight: "600", 
    color: '#FFFFFF',
  },

  box1: {
    backgroundColor: 'white', 
    height: '44%',
    width: '88%',
    justifyContent: 'space-around', 
    alignItems: 'center',

  },

  inputBox: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'grey',
    width: '88%',
    height: 60,
    justifyContent: 'center',
    paddingLeft: 20
  },

  input: {
    fontSize: 16, 
    fontWeight: "300", 
    color: '#757083', 
    opacity: 0.5,
  },

  colorBox: {
    marginRight: 'auto',
    paddingLeft: 15,
    width: '88%'
  },

  chooseColor: {
    fontSize: 16, 
    fontWeight: "300", 
    color: '#757083', 
    opacity: 1,
  },

  colorArray: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    paddingRight: 60
  },

  color1: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 25
  },

  color2: {
    backgroundColor: '#474056',
    width: 50,
    height: 50,
    borderRadius: 25
  },

  color3: {
    backgroundColor: '#8A95A5',
    width: 50,
    height: 50,
    borderRadius: 25
  },

  color4: {
    backgroundColor: '#B9C6AE',
    width: 50,
    height: 50,
    borderRadius: 25
  },

  button: {
    width: '88%',
    height: 70,
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: "600"
  }
});