import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import FontBold from '../../components/FontBold';
import FontRegular from '../../components/FontRegular';
import FontLight from '../../components/FontLight';
import Spacer from '../../components/Spacer';
import { withNamespaces } from 'react-i18next';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Linking } from 'react-native'
const SupportScreen = ({ navigation, t }) => {
  const phoneNumber = "0934515020";
  return (
    <View style={styles.container}>
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
