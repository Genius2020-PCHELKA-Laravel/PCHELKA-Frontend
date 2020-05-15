import React ,{useState}from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';



import {Badge} from 'native-base';
import {Container,Footer, FooterTab, Card, CardItem,Body} from 'native-base';
const Addressdetails= ({ navigation }) => {
    
  const [state,setState]=useState('');
  return (
  <View style={{flex:1}}  >
    <Text style={styles.text}>Address details screen </Text>
    <Text style={styles.text}>Your saved Address </Text>
    <Button title="ADD NEW"/>
    <Footer>
    <FooterTab>
    <Text>Total $:</Text>
          
         <TouchableOpacity  onPress={()=>{navigation.navigate('Payment')}}> 
         <Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>Next</Text> 
       </Badge>
            </TouchableOpacity>
         
            
          </FooterTab>
        </Footer>
 
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});
 

export default Addressdetails;
