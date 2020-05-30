import React, { Component, useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Permissions } from 'expo';

import NetInfo from '@react-native-community/netinfo';
import { getToken } from '../api/token';
import { Context as HCContext } from './context/HCContext';
import { Context as UserContext } from './context/UserContext';
import Loader from '../components/Loader';


const InternetScreen = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [isloading, setIsLoading] = useState(false);

  // const [connected, setConnected] = useState(false);
  const { setHC, getServices } = useContext(HCContext);
  const { getUserDetails, getUserAddresses } = useContext(UserContext);
  testInternetConnection = async () => {
    try {
      const token = await getToken();
      setToken(token);
      console.log("InternetScreen::tstInternetConnection::Saved token: ");
      console.log(token);
    } catch (error) {
      setIsLoading(false);
      console.log("Error::InternetScreen::testInternetConnection");
    }
  }
  useEffect(() => {
    setIsLoading(true);
    testInternetConnection().then(() => {
      NetInfo.fetch().then((connection) => {
        console.log(connection)
        //setConnected(state.connected);
        if (connection.isConnected) {
          console.log("Connected");
          getServices().then((response) => {
            setHC(response[0]);
            console.log("InternetScreen::UseEffect::getServices::response::");
            console.log(response);
          }).catch((error) => {
            console.log("Error::InternetScreen::UseEffect::getServices");
            console.log(error);
          });
        }
        else {
          console.log("Not Connected");
          setIsLoading(false);
          return;
        }
        if (connection.isConnected && typeof (token) == 'undefined') { setIsLoading(false); navigation.navigate('LoginFlow'); }
        else if (connection.isConnected && typeof (token) != 'undefined') {
          getUserDetails().then((response) => {
            console.log("InterScreen::useffect::getUseDetails::response:: ");
            console.log(response);
            getUserAddresses().then((res) => {
              console.log("InterScreen::useffect::getUserAddresses::response:: ");
              console.log(res);
              navigation.navigate('Dashboard');
            }).catch((error) => {
              console.log("InterScreen::useffect::getUserAddresses::error:: ");
              setIsLoading(false);
            });
            setIsLoading(false);
          }).catch((error) => {
            console.log("InternetScreen::getUserDetails#1 " + error);
            setIsLoading(false);
          });
        }
      });
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);
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