import React from 'react';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import { withNamespaces } from 'react-i18next';

const servicesdetails = ({ navigation,title , imagesource,t}) => {
    
    
    return (<View style={styles.container}> 
              <View flexDirection="column">
                <Image flexDirection="row" style={styles.image} source={imagesource}/>
                <View flexDirection="column" style={styles.text}>
                  <Text flexDirection="row" style={styles.servicetext}> {title} </Text>
                  <Text flexDirection="row" style={styles.ButtonStyle}> {t('booknow')} </Text>
                </View>
              </View> 
      </View>);
  };
  
  const styles = StyleSheet.create({
    text: {
      alignItems:"center",
    },
    servicetext: {
      fontSize: 14,
      fontFamily:'Comfortaa-Bold'   
    },
    booktext: {
      fontSize: 16,
      fontFamily:'Comfortaa-Bold'   
    },    
    image :{
      width:200,
      borderRadius:4,
      height:120
    },
    container:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#F8De78'      
    },
    ButtonStyle: {
      marginTop:10,
      padding:5,
      marginLeft:30,
      marginRight:30,
      backgroundColor:'#DAA520',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#DAA520',
      fontSize: 16,
      fontWeight:"500",
      fontFamily:'Comfortaa-Bold'    
    }, 
  });
  
  export default withNamespaces()(servicesdetails);