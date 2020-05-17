import React from 'react';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import { withNamespaces } from 'react-i18next';

const servicesdetails = ({ navigation,title , imagesource,t}) => {
    
    
    return (<View style={styles.container}>  
      <Image  style={styles.image} source={imagesource}/>
      <Text style={styles.text}> {title} </Text>
      <Text style={styles.text}> {t('booknow')} </Text>
    
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
  
  export default withNamespaces()(servicesdetails);