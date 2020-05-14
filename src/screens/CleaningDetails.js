import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements'


const CleaningDetails= ({ navigation }) => {
    
  
  return (
  <View> 
    <Text style={styles.text}>CleaningDetails screen </Text>
    <Button title="Next" onPress={()=>{navigation.navigate('datetimescreen')}}/>
 
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default CleaningDetails;
