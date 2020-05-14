import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements'


const Addressdetails= ({ navigation }) => {
    
  
  return (
  <View> 
    <Text style={styles.text}>Addressdetails screen </Text>
    <Button title="Next" onPress={()=>{navigation.navigate('Paymentscreen')}}/>
 
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default Addressdetails;
