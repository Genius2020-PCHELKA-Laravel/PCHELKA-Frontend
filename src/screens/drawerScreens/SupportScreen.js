import React, { Component, useEffect, useState } from 'react';
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
import { Avatar } from 'react-native-elements';
import AlertDialog from '../../components/AlertDialog';
import { Normalize, fontNormalize } from '../../components/actuatedNormalize';

const SupportScreen = ({ navigation, t }) => {
  const phoneNumber = "380677665544";
  const [changingWhats, setChangingWhats] = useState(false);
  const [changingViber, setChangingViber] = useState(false);
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
      <AlertDialog changing={changingWhats} setChanging={setChangingWhats} message={'WhatsAppisnotinstalled'} />
      <AlertDialog changing={changingViber} setChanging={setChangingViber} message={'Viberisnotinstalled'} />

      <Spacer>
        <FontBold value={t('support')} mystyle={{ fontSize: fontNormalize(24), textAlign: "left" }} />
      </Spacer>
      <Spacer />
      <Spacer />
      <FontBold value={t('wearealwaysreadytohelp')} mystyle={{ fontSize: fontNormalize(24), textAlign: "left", marginLeft: Normalize(15) }} />
      <Spacer />
      <FontLight value={t('youcanreach')} mystyle={{ fontSize: fontNormalize(18), textAlign: "left", marginLeft: Normalize(15), lineHeight: Normalize(30), }} />

      <ScrollView style={styles.scrollstyle} showsVerticalScrollIndicator={false}>
        <Spacer />
        <TouchableOpacity onPress={() => { Linking.openURL(`tel:${phoneNumber}`) }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('callus')}></FontBold>
            <FontAwesome5 style={styles.item2} name="chevron-right" size={Normalize(15)} color="#7a7a7a" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { Linking.openURL('mailto:clean.pchelka@gmail.com') }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('emailus')} ></FontBold>
            <FontAwesome5 style={styles.item2} name="chevron-right" size={Normalize(15)} color="#7a7a7a" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          const url = `whatsapp://send?phone=${phoneNumber}`;
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              setChangingWhats(true);
            }
          });
        }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('WhatsApp')} ></FontBold>
            <Avatar
              size="small"
              rounded
              source={require('../../../assets/whatsapp.png')}
              onPress={async () => { setChangingWhats(true); }}
              activeOpacity={0.7}
              containerStyle={styles.flag}
            />
            <FontAwesome5 style={styles.item2} name="chevron-right" size={Normalize(15)} color="#7a7a7a" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          const url = `viber://add?number=${phoneNumber}`;
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              setChangingViber(true);
            }
          });
        }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('Viber')} ></FontBold>
            <Avatar
              size="small"
              rounded
              source={require('../../../assets/viber.png')}
              onPress={async () => { setChangingViber(true); }}
              activeOpacity={0.7}
              containerStyle={styles.flag}
            />
            <FontAwesome5 style={styles.item2} name="chevron-right" size={Normalize(15)} color="#7a7a7a" />
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
    padding: Normalize(10),
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderBottomColor: '#7a7a7a',
    borderBottomWidth: 1,
    paddingBottom: Normalize(15),
  },
  item1: {
    fontSize: fontNormalize(16),
    marginLeft: Normalize(15),
    width: '30%' // is 50% of container width
  },
  item2: {
    position: "absolute",
    top: Normalize(15),
    right: Normalize(15)
  },
  flag: {
    borderColor: '#000',
    borderWidth: 0,
    backgroundColor: '#fff',
    width: Normalize(30),
    height: Normalize(30),
  },
});

export default withNamespaces()(SupportScreen);
