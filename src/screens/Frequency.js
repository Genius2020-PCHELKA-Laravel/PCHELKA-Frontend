import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements'


const Frequency = ({ navigation }) => {
    
  
  return (
  <View> 
    <Text style={styles.text}>frequency </Text>
    
  <Button title="Next" onPress={()=>{navigation.navigate('cleanindetailsscreen')}}/>
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default Frequency;
