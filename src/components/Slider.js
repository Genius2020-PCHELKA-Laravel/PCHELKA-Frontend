import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { SliderBox } from "react-native-image-slider-box";
// You can import from local files


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree"
      ]
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <SliderBox
          autoplay={true}
          images={this.state.images}
          circleLoop={true}
          sliderBoxHeight={250}
          dotColor="#ff9800"
          inactiveDotColor="#ffc200"
          dotStyle={{
            width: 20,
            height: 20,
            borderRadius: 20,
            marginHorizontal: 0,
            padding: 0,
            margin: 0
          }}
          imageLoadingColor="#ff9800"
        //onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        //currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    paddingTop: 10,
    backgroundColor: 'white',
    padding: 0,
  }
});