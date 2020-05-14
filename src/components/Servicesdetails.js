import React from 'react';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
const servicesdetails = ({ navigation,title , imagesource}) => {
    
    
    return (<View style={styles.container}>  
      <Image  style={styles.image} source={imagesource}/>
      <Text style={styles.text}> {title} </Text>
      <Text style={styles.text}> Book Now </Text>
    
      </View>);
  };
  
  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      fontWeight:'bold'
    },
    image :{
      width:200,
      borderRadius:4,
      height:120
    },
    container:{marginLeft:4}
  });
  
  export default servicesdetails;