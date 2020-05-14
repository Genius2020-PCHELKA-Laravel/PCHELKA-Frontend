import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';


const splashscreen = ({ navigation }) => {
    
  
  return (<View> 
    <Text style={styles.text}>splash page</Text>
    <Button title="go to home page " onPress={()=>setTimeout(function(){

//Put All Your Code Here, Which You Want To Execute After Some Delay Time.
navigation.navigate('Home')

}, 5000)} />
   
  
    
  
    </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default splashscreen;
