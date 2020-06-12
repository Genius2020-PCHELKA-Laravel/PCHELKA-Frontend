import React, { Component, useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform, Image, SafeAreaView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Permissions } from 'expo';

import NetInfo from '@react-native-community/netinfo';
import { getToken } from '../api/token';
import { Context as HCContext } from './context/HCContext';
import { Context as UserContext } from './context/UserContext';
import Loader from '../components/Loader';
import { getLang, storeLang } from '../api/userLanguage';


const InternetScreen = ({ navigation }) => {
  const [testToken, setTestToken] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [connected, setConnected] = useState('');
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
    let isCancelled1 = false;
    if (!isCancelled1) {

      setIsLoading(true);
      testLogin();
    }
    getLang().then((response) => {
      console.log("logoutbutton selected Lang in Use Effect:  " + response);
      i18n.changeLanguage(response);
    }).catch((err) => {
      console.log("logoutbutton Screen Can not get lang");
    });
    return () => {
      isCancelled1 = true;
    };
  }, [])
  useEffect(() => {
    let isCancelled2 = false;
    NetInfo.fetch().then((connection) => {
      console.log(connection)
      if (connection.isConnected) {
        console.log("Connected");
        setConnected(true);
      }
      else {
        console.log("Not Connected");
        setConnected(false);
        if (!isCancelled2)
          setIsLoading(false);
        return;
      }
      if (connection.isConnected && (typeof (testToken) == 'undefined')) {
        if (!isCancelled2)
          setIsLoading(false);
        navigation.navigate('LoginFlow');
      }
      else if (connection.isConnected && (typeof (testToken) != 'undefined')) {
        if (!isCancelled2)
          setIsLoading(false);
        navigation.navigate('Dashboard');
      }
      else {
        setIsLoading(false);
      }
    });

    return () => {
      isCancelled2 = true;
    };
  }, [testToken]);


  return (<View style={styles.container}>
    <Loader loading={isloading} />

    {
      !connected ?
        <Image style={styles.net} source={require('../../assets/nonet.png')} />
        :
        <Image style={styles.nonet} source={require('../../assets/nonet.png')} />
    }

  </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5c500"
  },
  net: {
    width: "100%",
    marginTop: 200
  },
  nonet: {
    display: "none",
    width: "100%",
    marginTop: 200
  },
});

export default InternetScreen;