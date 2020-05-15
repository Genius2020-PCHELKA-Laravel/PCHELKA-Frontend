import React from 'react';
import { StyleSheet,ScrollView,ImageBackground,Image, Text, View } from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import  {Ionicons} from '@expo/vector-icons';
export default SlideBar=props=>{
    return(
<ScrollView>
    <ImageBackground source={require('../../assets/back.jpg') } 
    style={{width:undefined,padding:16,paddingTop:48}}>
        <Image source={require('../../assets/profile.png') } styles={styles.profile}/>  
        <Text style={styles.text}>hala ibrahim</Text>
    </ImageBackground>
    <View>
        <DrawerNavigatorItems {...props}/>
    </View>
</ScrollView>);
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    profile:{
        width:80,
        height:80,
        borderRadius:50,
        borderWidth:3,
        borderColor:'#FFF',
    }
  ,  text: {
      fontSize: 30,
      color:'#fff',
      marginVertical:8,
      fontWeight:"800"
    }
  });