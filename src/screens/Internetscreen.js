import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Permissions } from 'expo';

import NetInfo from '@react-native-community/netinfo';
import { getToken } from '../api/token';


const InternetScreen = ({ navigation }) => {
  //const [stateToken, setStateToken] = useState('');
  const [connected, setconnected] = useState(true);

  getData = async () => {
    try {
      const token = await getToken();
      console.log("Get Data: " + token);
      NetInfo.fetch().then(state => {
        setconnected(state.connected);
        console.log("Internet token>>>>>>>>>>>>>" + typeof (token));
        console.log("Internet token>>>>>>>>>>>>>" + token);
        if (state.isConnected && typeof (token) == 'undefined') { navigation.navigate('HomeScreenLogIn'); }
        else if (state.isConnected && typeof (token) != 'undefined') {
          navigation.navigate('HomeScreen');
        }
      });
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
    getData();

  }, []);
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