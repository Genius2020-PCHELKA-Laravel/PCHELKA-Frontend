import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, AsyncStorage, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

import { Context as Authcontext2 } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import FontLight from '../../components/FontLight';
import FontBold from '../../components/FontBold';
import FontRegular from '../../components/FontRegular';
import Spacer from '../../components/Spacer';
import { getUserDetailsStorage, setUserDetailsStorage, removeUserDetailsStorage } from '../../api/userDetails';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import LogoutButton from '../../components/LogoutButton';
import { navigate } from '../../navigationRef';
import { withNamespaces } from 'react-i18next';

const SettingScreen = ({ navigation, t }) => {
  const { dispatch, state, getUserDetails } = useContext(UserContext);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width;

  // getUserDetails().then((response) => {
  useEffect(() => {
    getUserDetailsStorage().then((response) => {
      if (response != null) {
        setFullName(response.fullName);
        setMobile(response.mobile);
        console.log("Getting details of user from AscyncStorage");
        return;
      };
    }).catch((err) => { console.log("SlideBar useffect #1 " + err); });

    getUserDetails().then((details) => {
      getUserDetailsStorage().then((response) => {
        console.log("Getting details of user from AscyncStorage");
        console.log("SET Full Name IN SlideBar:" + response.fullName);
        setFullName(response.fullName);
      }).catch((err) => { console.log(err); });
    }).catch((err) => { console.log("SlideBar useffect #2 " + err); });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image resizeMethod='auto' style={{ borderRadius: 5, height: imageHeight, width: imageWidth, }} source={require('../../../assets/lightbackground.png')} />
        <FontRegular value={fullName} mystyle={styles.name} />
        <FontRegular value={"+" + mobile} mystyle={styles.mobile} />
        <Avatar
          size="large"
          rounded
          icon={{ name: 'user', type: 'font-awesome' }}
          onPress={() => console.log("Works!")}

          activeOpacity={0.7}
          containerStyle={styles.avatar}
        />
      </View>
      <ScrollView style={styles.scrollstyle} showsVerticalScrollIndicator={false}>
        <Spacer />
        <FontLight mystyle={styles.listtitle} value={t('accountsettings')}></FontLight>
        <TouchableOpacity onPress={() => { navigate('EditPersonalDetailsScreen') }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('editpersonaldetails')}></FontBold>
            <FontAwesome5 mystyle={styles.item2} name="chevron-right" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigate('ManageAddresses') }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('manageaddresses')} ></FontBold>
            <FontAwesome5 mystyle={styles.item2} name="chevron-right" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigate('ManageCreditCards') }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('managecreditcards')}></FontBold>
            <FontAwesome5 mystyle={styles.item2} name="chevron-right" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <Spacer />
        <Spacer />
        <FontLight mystyle={styles.listtitle} value={t('appsettings')} ></FontLight>
        {/* <TouchableOpacity onPress={() => { }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value='Language'></FontBold>
            <FontAwesome5 mystyle={styles.item2} name="chevron-right" size={15} color="black" />
          </View>
        </TouchableOpacity> */}
        <Spacer />
        <LogoutButton />
      </ScrollView>

    </View>);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollstyle: {
    marginTop: 20,
  },
  row: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  item1: {
    marginLeft: 15,
    width: '90%' // is 50% of container width
  },
  item2: {
    width: '10%' // is 50% of container width
  },

  avatar: {
    position: 'absolute',
    backgroundColor: '#FF9800',
    flex: 1,
    marginLeft: 20,
    bottom: -30
  },
  name: {
    position: 'absolute',
    fontSize: 40,
    top: 20,
    textAlign: 'center',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  },
  mobile: {
    position: 'absolute',
    fontSize: 20,
    top: 70,
    textAlign: 'center',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  },
  listtitle: {
    color: '#aaa',
    fontSize: 16,
    marginLeft: 15
  }
});

export default withNamespaces()(SettingScreen);
