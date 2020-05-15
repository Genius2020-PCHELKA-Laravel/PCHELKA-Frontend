import React ,{useState,useEffect}from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';



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
    <Button title="Next" 
    onPress={()=>{token? navigation.navigate('Addresses'):navigation.navigate('loginph')}}/>
    
   
      
        
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default DateAndTime;
