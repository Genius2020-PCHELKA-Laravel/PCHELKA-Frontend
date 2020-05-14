import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View ,AsyncStorage,FlatList,Image,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button  } from 'react-native-elements';
import { Component } from 'react';
import Timer from './Timer';
import { fingerprintIcon, deleteIcon, closeIcon } from '../../static';
import Pincode1 from './Pincode1';
//import AsyncStorage from '@react-native-community/async-storage';
const arrayOfNumbers = [
  { key: 1 }, { key: 2 },{ key: 3 }, { key: 4 }, { key: 5 },{ key: 6 },{ key: 7 },{ key: 8 }, { key: 9 }, { key: 10 },{ key: 0 }, { key: 12 }
];

const empties = [ { key: 1, value: ' ' },{ key: 2, value: ' ' }, { key: 3, value: ' ' }, { key: 4, value: ' ' }];
let counter = 0;



const verify=({navigation}) => {
  state = {
    code: '',
    digitDisabled: false,
    clearDisabled: false
   
  };
  
  
 const[token,settoken]=useState('');
  
 
   const data= fname = navigation.getParam('data');
 
   
  
   onsubmit=async()=>{
     try{
     // await AsyncStorage.removeItem('token') ;

    await AsyncStorage.setItem('token','123')
  }
    catch(err){console.log(err);}
   }
   getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      
      if(value !='') {
        settoken(value)
      }
    } catch(e) {
      // error reading value
    }
  }
 

 
 
   
  useEffect(()=>{
    this.onsubmit();
     this.getData();
    
 
   })
  
  return (
  <View style={styles.container}>
      <Text style={styles.Texts}>  verify phone number  </Text>
      <Text style={styles.Texts}> {JSON.stringify(data)}  </Text>
    
 
        
          <Timer />
         <Pincode1/>
      
     
    
<Button
 icon={
   <Icon
     name="arrow-right"
     size={15}
     color="white"
   />
 }
 iconRight
 title="confirm"

/>
    </View>);
};








const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 rec :{
  borderWidth:10,
  borderColor:'#d6d6d6',
  padding:8,
   margin:10,
   width:20
  
 } ,

centerAlignment: {
  justifyContent: 'center',
  alignItems: 'center'
},
enterView: {
  alignSelf: 'center',
  marginBottom: 15,
  flexDirection: 'row',
  flex: 2,
  justifyContent: 'flex-end',
  alignItems: 'center'
},
flatcontainer: {
  flex: 6
},
flatlist: {
  alignSelf: 'center'
},
icon: {
  height: 24,
  width: 24
},
round: {
  width: 60,
  height: 60,
  backgroundColor: '#E8E8E8',
  borderRadius: 30,
  margin: 10
},
instruction: {
  marginHorizontal: 30,
  textAlign: 'center',
  color: 'gray',
  fontSize: 14
},
close: {
  marginTop: 30,
  marginLeft: 15
},
digit: {
  fontSize: 24
},
digitView: {
  flexDirection: 'column',
  alignItems: 'center'
},
redSpace: {
  height: 2,
  width: 40,
  marginHorizontal: 5
},
textView: {
  flex: 0.5,
  marginBottom: 10
},
deleteIcon: {
  height: 20,
  width: 20
}

});
export default verify;
