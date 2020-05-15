import React ,{useState}from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Modal from 'react-native-modal';


const Addressdetails= ({ navigation }) => {
    
  const [state,setState]=useState('');
  return (
  <View> 
    <Text style={styles.text}>Address details screen </Text>
    <Text style={styles.text}>Your saved Address </Text>
    <Button title="ADD NEW" onPress={()=>{navigation.navigate('Payment')}}/>
 
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});
 

export default Addressdetails;
