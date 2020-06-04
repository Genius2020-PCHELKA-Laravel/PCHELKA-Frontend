import React, { Component, useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Permissions } from 'expo';

import NetInfo from '@react-native-community/netinfo';
import { getToken } from '../api/token';
import { Context as HCContext } from './context/HCContext';
import { Context as UserContext } from './context/UserContext';
import Loader from '../components/Loader';


const InternetScreen = ({ navigation }) => {
  const [testToken, setTestToken] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const ref = useRef(false)

  // const [connected, setConnected] = useState(false);

  // const { getUserDetails, getUserAddresses } = useContext(UserContext);
  const testLogin = async () => {

    try {
      setTestToken(await getToken());
      console.log("InternetScreen::tstInternetConnection::Saved token: ");
      console.log(typeof testToken);
      console.log(testToken);
    } catch (error) {
      setIsLoading(false);
      console.log("Error::InternetScreen::testInternetConnection");
    }

  }
  useEffect(() => {
    setIsLoading(true);
    testLogin();
  }, [])
  useEffect(() => {
    NetInfo.fetch().then((connection) => {
      console.log(connection)
      if (connection.isConnected) {
        console.log("Connected");
      }
      else {
        console.log("Not Connected");
        setIsLoading(false);
        return;
      }
      if (connection.isConnected && (typeof (testToken) == 'undefined')) {
        setIsLoading(false);
        navigation.navigate('LoginFlow');
      }
      else if (connection.isConnected && (typeof (testToken) != 'undefined')) {
        navigation.navigate('Dashboard');
        setIsLoading(false);
      }
    });

  }, [testToken]);


  return (<View>
    <Loader loading={isloading} />

    {
      !isloading ? <Text>No Internet</Text> : null
    }

  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default InternetScreen;