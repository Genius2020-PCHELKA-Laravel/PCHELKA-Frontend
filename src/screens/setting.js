import React from 'react';
import { Text, StyleSheet, View, Button,SafeAreaView,AsyncStorage, TouchableOpacity } from 'react-native';

import {FontAwesome5} from '@expo/vector-icons';

const setting = ({ navigation }) => {
  getData = async () => {
    try {
      const value = await AsyncStorage.removeItem('token')
      
      
    } catch(e) {
      // error reading value
    }
  }
  
  return (
    <View style={styles.container}>
    <SafeAreaView style={{flex:1}}>
      <TouchableOpacity style={{alignItems:"flex-end",margin:16,paddingTop:20}} 
       onPress={navigation.openDrawer }>
        <FontAwesome5 name="bars" size={24} color="#161924" />
      </TouchableOpacity>


      <View>
         <Text style={styles.Text}> Account Setting </Text>
         <TouchableOpacity >
           <Text>LOGOUT</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>



    
  </View>);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Text : {
     color :"#161924",
     fontSize :20,
     fontWeight:"500"
  }
});

export default setting;
