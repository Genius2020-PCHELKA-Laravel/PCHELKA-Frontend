import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements'


const DateAndTime= ({ navigation }) => {
    
  
  return (
  <View> 
    <Text style={styles.text}>DateAndTime screen </Text>
    <Button title="Next" onPress={()=>{navigation.navigate('Addressdetailsscreen')}}/>
 
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default DateAndTime;
