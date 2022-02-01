import React from 'react';
// importing Components from react native
import { StyleSheet, View, Text, TextInput, Pressable, ImageBackground, Image, TouchableOpacity } from 'react-native';
// importing images and icons
import BackgroundImage from '../assets/background-image.png';
import icon from '../assets/usericon.png';

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    // state will be updated with whatever values change for the specific states
    this.state = { 
      name: '',
      bgColor: this.colors.blue
    };
  }

  // function to update the state with the new background color for Chat Screen chosen by the user
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  // background colors to choose from; will be used to update bgColor state
  colors = {
    dark: '#090C08',
    purple: '#474056',
    blue: '#8A95A5',
    green: '#B9C6AE'
  };

  render() {
    return (
      //Different components do differents things; View acts as a div from html
      <View style={styles.container}>

        <ImageBackground source={BackgroundImage} resizeMode='cover' style={styles.backgroundImage}>

          <View style={styles.titleBox}> 
            <Text style={styles.title}>ChatApp</Text> 
          </View>

          <View style={styles.box1}>
            <View style={styles.inputBox}>
              <Image source={icon} style={styles.image} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ name: text})}
                value={this.state.name}
                placeholder='Your Name'
              />
            </View>

            <View style={styles.colorBox}>
              <Text style={styles.chooseColor}> Choose Background Color: </Text>
            </View>

            <View style={styles.colorArray}>
              <TouchableOpacity 
                style={styles.color1} 
                onPress={() => this.changeBgColor(this.colors.dark)}>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.color2}
                onPress={() => this.changeBgColor(this.colors.purple)}>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.color3}
                onPress={() => this.changeBgColor(this.colors.blue)}>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.color4}
                onPress={() => this.changeBgColor(this.colors.green)}>
              </TouchableOpacity>     
            </View>

            <Pressable
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Chat', { 
                name: this.state.name,
                bgColor: this.state.bgColor
                })}>
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
    borderWidth: 2,
    borderRadius: 1,
    borderColor: 'grey',
    width: '88%',
    height: 60,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },

  image: {
    width: 20,
    height: 20,
    marginRight: 10
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