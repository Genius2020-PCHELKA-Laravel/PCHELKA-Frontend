import React from 'react';
import { Text, StyleSheet, View, Button,SafeAreaView, TouchableOpacity } from 'react-native';

import {FontAwesome5} from '@expo/vector-icons';

const support= ({ navigation }) => {
    
  
  return (
    <View style={styles.container}>
    <SafeAreaView style={{flex:1}}>
      <TouchableOpacity style={{alignItems:"flex-end",margin:16,paddingTop:20}} 
       onPress={navigation.openDrawer }>
        <FontAwesome5 name="bars" size={24} color="#161924" />
      </TouchableOpacity>
      <View>
         <Text style={styles.Text}> Support </Text>
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

export default support;
