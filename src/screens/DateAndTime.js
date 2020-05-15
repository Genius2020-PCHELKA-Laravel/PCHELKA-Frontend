import React ,{useState,useEffect}from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

import {Badge} from 'native-base';
import {Container,Footer, FooterTab, Card, CardItem,Body} from 'native-base';

const DateAndTime= ({ navigation }) => {
  const[token,settoken]=useState('1');

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      console.log(value);
      if(value !='') {
        settoken(value)
      }
    } catch(e) {
      // error reading value
    }
  }
/*
  useEffect(() => {
    this.getData();

  },[]);*/
  return (
  <View> 
    <Text style={styles.text}>DateAndTime screen </Text>
    
    <Text style={styles.text}>When would you like your cleaning? </Text>
    <View style={{flexDirection:'row'}}><Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>6</Text> 
       </Badge>
       <Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>7</Text> 
       </Badge>
    </View>
    
    <Text style={styles.text}>What time would you like us to start? </Text>
    <View style={{flexDirection:'row'}}><Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>13:00</Text> 
       </Badge>
       <Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>13:30</Text> 
       </Badge>
    </View>
    <Footer>
    <FooterTab>
    <Text>Total $:</Text>
          
         <TouchableOpacity onPress={()=>{token? navigation.navigate('Addresses'):navigation.navigate('loginph')}}> 
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
    fontSize: 25
  }
});

export default DateAndTime;
