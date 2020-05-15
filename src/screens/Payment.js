import React ,{useState}from 'react';
import { Text, StyleSheet, View,  TouchableOpacity } from 'react-native';
import { RadioButton} from 'react-native-paper';
import {Container,Footer, FooterTab,Button,} from 'native-base';

const Payment= ({ navigation }) => {
  const [state,setState]=useState('1');
  
  return (
  <View> 
    <Text style={styles.text}>Payment screen </Text>
    
 
    <RadioButton.Group
        onValueChange={setState}
          
        value={state}
        

    > 

        <View style ={{marginBottom: 30}}>
      
        <View style={{flexDirection:'row'}}>
        <RadioButton value="1" />
  <Text style={{fontSize:23}}>Pay by credit/debit card </Text>

       
          </View>
          <Text style={{marginLeft:35}}>insuurance when you pay online AED 1000</Text>
        </View>
        <View>
        <View style={{flexDirection:'row'}}>
        <RadioButton value="2" />
          <Text  style={{fontSize:23}}>Pay with cash (+5 AED)</Text>
          
          </View>
         </View>
        
      </RadioButton.Group>
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default Payment;
