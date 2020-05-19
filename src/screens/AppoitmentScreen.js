import React from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


const AppoitmentScreen = ({ navigation }) => {


  return (

    <View style={styles.container}>

      <Text style={styles.Text}> Appointement   </Text>

    </View>);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500"
  }
});

export default AppoitmentScreen;