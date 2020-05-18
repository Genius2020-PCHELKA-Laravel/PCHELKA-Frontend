import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Permissions } from 'expo';

import NetInfo from '@react-native-community/netinfo';
import { getToken } from '../api/token';


const InternetScreen = ({ navigation }) => {
  const [stateToken, setStateToken] = useState('');
  const [connected, setconnected] = useState(true);

  getData = async () => {
    try {
      const token = await getToken();
      setStateToken(token);
      console.log(token);

    } catch (e) {
      console.log("error in token");
    }
  }
  // useEffect(() => {
  //   this.getData();

  //   NetInfo.fetch().then(state => {
  //     Alert.alert('connection',
  //       state.isConnected ? 'is connected' : 'is not connected',
  //       [{
  //         text: 'OK', onPress: () => {
  //           if (state.isConnected && token == '') { navigation.navigate('HomeScreen'); }
  //           else {
  //             if (state.isConnected && token != '')
  //               navigation.navigate('HomeScreen');
  //           }
  //         }
  //       }]);

  //   });
  // });
  useEffect(() => {
    this.getData();
    NetInfo.fetch().then(state => {
      setconnected(state.connected);
      if (state.isConnected && typeof (stateToken) == 'undefined') { navigation.navigate('HomeScreen'); }
      else {
        if (state.isConnected && typeof (stateToken) != 'undefined')
          navigation.navigate('HomeScreenLogIn');
      }
    });
  });
  return (<View>
    {
      connected ? <Text>No Internet</Text> : <Text></Text>
    }
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default InternetScreen;