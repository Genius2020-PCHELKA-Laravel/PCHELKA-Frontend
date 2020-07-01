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
        "https://pchelka.org/img/slider/IMG-Slider1.jpg",
        "https://pchelka.org/img/slider/IMG-Slider2.jpg",
        "https://pchelka.org/img/slider/IMG-Slider3.jpg",
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
          sliderBoxHeight={200}
          dotColor="#f5c500"
          inactiveDotColor="#b4b4b4"
          paginationBoxVerticalPadding={20}
          resizeMethod={'resize'}
          resizeMode={'contain'}
          ImageComponentStyle={{ backgroundColor: "#fff", height: 175 }}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10
          }}
          dotStyle={{
            width: 13,
            height: 13,
            borderRadius: 13,
            marginHorizontal: 0,
            padding: 0,
            margin: 0
          }}
          imageLoadingColor="#f5c500"
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
    paddingTop: 0,
    paddingHorizontal: 0,
    backgroundColor: 'white',
  }
});