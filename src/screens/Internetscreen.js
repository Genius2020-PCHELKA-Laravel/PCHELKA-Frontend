import React, { Component ,useState, useEffect }from 'react';
import { View, Text,StyleSheet, Button, Alert,  Platform } from 'react-native';
import {AsyncStorage} from 'react-native';
import {Permissions} from 'expo';

import  NetInfo from '@react-native-community/netinfo';


const Internetscreen = ({ navigation }) => {
  const[token,settoken]=useState('');
  getData = async () => {
    try {
      settoken(await AsyncStorage.getItem('token'));

      console.log(token);
      
    } catch(e) {
      console.log("error in token");
    }
  }
  useEffect(() => {
    this.getData();
    
    NetInfo.fetch().then(state => {
      Alert.alert('connection', 
      state.isConnected?'is connected':'is not connected',
       [{ text: 'OK', onPress: () => {
      if(state.isConnected && token=='') 
      {navigation.navigate('Homepage');}
        else{
         if(state.isConnected && token!='')
         navigation.navigate('Home1');
        }
        }
       }]);
      
    });
  });
  
  return (<View> 
    
   
   
  
    
  
    </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default Internetscreen;
