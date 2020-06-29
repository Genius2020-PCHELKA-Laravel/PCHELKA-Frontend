import React, { Component, useEffect } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import FontBold from '../../components/FontBold';
import FontRegular from '../../components/FontRegular';
import FontLight from '../../components/FontLight';
import Spacer from '../../components/Spacer';
import { withNamespaces } from 'react-i18next';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import { navigate } from "../../navigationRef";
import { BackHandler } from 'react-native';
import OfflineNotice from '../../components/OfflineNotice';

const SupportScreen = ({ navigation, t }) => {
  const phoneNumber = "380677665544";
  const unsubscribe = navigation.addListener('didFocus', () => {
    BackHandler.addEventListener('hardwareBackPress', () => { return true; });
  });
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => { return true; });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => { return true; });
      // navigation.removeListener('didFocus', () => { })
    };
  }, []);
  return (
    <View style={styles.container}>
      <OfflineNotice />

      <Spacer>
        <FontBold value={t('support')} mystyle={{ fontSize: 24, textAlign: "left" }} />
      </Spacer>
      <FontBold value={t('wearealwaysreadytohelp')} mystyle={{ fontSize: 24, textAlign: "left", marginLeft: 15 }} />
      <FontLight value={t('youcanreach')} mystyle={{ fontSize: 18, textAlign: "left", marginLeft: 15 }} />

      <ScrollView style={styles.scrollstyle} showsVerticalScrollIndicator={false}>
        <Spacer />
        <TouchableOpacity onPress={() => { Linking.openURL(`tel:${phoneNumber}`) }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('callus')}></FontBold>
            <FontAwesome5 style={styles.item2} name="chevron-right" size={15} color="#7a7a7a" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { Linking.openURL('mailto:support@example.com') }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('emailus')} ></FontBold>
            <FontAwesome5 style={styles.item2} name="chevron-right" size={15} color="#7a7a7a" />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => { navigate('ManageAddresses') }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('chatwithus')} ></FontBold>
            <FontAwesome5 style={styles.item2} name="chevron-right" size={15} color="#7a7a7a" />
          </View>
        </TouchableOpacity> */}
      </ScrollView>

      {/* <TouchableOpacity style={{ backgroundColor: "#fff" }} onPress={() => { navigate('HomeNavigator') }}>
        <Spacer>
          <FontBold
            value={t('homepage')}
            mystyle={{
              textDecorationLine: 'underline',
              textDecorationStyle: "solid",
              textDecorationColor: "blue",
              textAlign: "center",
              fontSize: 12,
              color: 'blue'
            }} />
        </Spacer>
      </TouchableOpacity> */}
    </View >
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollstyle: {
  },
  row: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderBottomColor: '#7a7a7a',
    borderBottomWidth: 1,
  },
  item1: {
    fontSize: 16,
    marginLeft: 15,
    width: '70%' // is 50% of container width
  },
  item2: {
    position: "absolute",
    top: 15,
    right: 15
  },
});

export default withNamespaces()(SupportScreen);
