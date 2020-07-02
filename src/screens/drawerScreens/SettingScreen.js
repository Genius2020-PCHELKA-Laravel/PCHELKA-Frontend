import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, AsyncStorage, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Context as Authcontext2 } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import FontLight from '../../components/FontLight';
import FontBold from '../../components/FontBold';
import FontRegular from '../../components/FontRegular';
import Spacer from '../../components/Spacer';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import LogoutButton from '../../components/LogoutButton';
import { navigate } from '../../navigationRef';
import { withNamespaces } from 'react-i18next';
import { BackHandler } from 'react-native';
import OfflineNotice from '../../components/OfflineNotice';
import LanguageDialog from '../../components/LanguageDialog';
import i18n from '../../locales/i18n';
import { getLang, storeLang } from '../../api/userLanguage';
const SettingScreen = ({ navigation, t }) => {
  //After Update Get the updatetd info
  const { state, userLanguage } = useContext(UserContext);
  const [fullName, setFullName] = useState(t('fullname'));
  const [mobile, setMobile] = useState(t('mobile'));
  const [lang, setLang] = useState('en');
  const changeLanguage = (lng) => {
    try {
      console.log("Toggle language to:  " + lng);
      setLang(lng);
      storeLang(lng);
      i18n.changeLanguage(lng);
      userLanguage({ language: lng })
        .then((resposnse) => {
          //console.log("LogoutButton::UserLanguage" + (resposnse));
        })
        .catch((err) => {
          console.log("LogoutButton::UserLanguage::error:: " + err);
        });
      // shouldShow ? setShouldShow(false) : setShouldShow(true);
    } catch (e) { "Error:: " + e }
  }

  const [showModalVisibleLanguage, setShowModalVisibleLanguage] = useState(false);
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width;
  // const unsubscribe = navigation.addListener('didFocus', () => {
  //   console.log("Settings focussed#");
  //   getUserDetailsStorage().then((response) => {
  //     console.log("SettingsScreen didfocus:: " + JSON.stringify(response));
  //     setFullName(response.fullName);
  //     setMobile(response.mobile);
  //   }).catch(() => {
  //     console.log("SettingScreen didfocus:: " + err);
  //   });
  // });
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
  useEffect(() => {
    setFullName(state.userDetails.fullName);
    setMobile(state.userDetails.mobile);
  }, [state.userDetails]);
  useEffect(() => {
    getLang().then((response) => {
      console.log("SettingScreen selected Lang in Use Effect:  " + response);
      setLang(response);
      i18n.changeLanguage(response);
    }).catch((err) => {
      console.log("Settings Screen Can not get lang");
      storeLang('en');
      i18n.changeLanguage('en');
    });
  }, []);
  return (
    <View style={styles.container}>
      <OfflineNotice />
      <LanguageDialog
        lang={lang}
        setLang={setLang}
        changeLanguage={changeLanguage}
        showModalVisibleLanguage={showModalVisibleLanguage}
        setShowModalVisibleLanguage={setShowModalVisibleLanguage} />
      <View >
        <Image resizeMethod='auto' style={{ borderRadius: 5, height: imageHeight, width: imageWidth, }} source={require('../../../assets/lightbackground.png')} />
        <FontBold value={fullName} mystyle={styles.name} />
        <FontLight value={"+ " + mobile} mystyle={styles.mobile} />
        <View style={{ flex: 1, alignItems: 'center', top: -230 }}>
          <Avatar
            size="small"
            rounded
            icon={{ name: 'user', type: 'font-awesome', color: '#fff' }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={styles.avatar}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollstyle} showsVerticalScrollIndicator={false}>
        <Spacer />
        <FontLight mystyle={styles.listtitle} value={t('accountsettings')}></FontLight>
        <Spacer />
        <TouchableOpacity onPress={() => { navigate('EditPersonalDetailsScreen') }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('editpersonaldetails')}></FontBold>
            <FontAwesome5 style={styles.item2} name="chevron-right" size={15} color="#7a7a7a" />
          </View>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity onPress={() => { navigate('ManageAddresses') }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('manageaddresses')} ></FontBold>
            <FontAwesome5 style={styles.item2} name="chevron-right" size={15} color="#7a7a7a" />
          </View>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity onPress={() => { setShowModalVisibleLanguage(true) }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item3} value={t('language')} ></FontBold>
            {
              lang === 'en' ?
                <Avatar
                  size="small"
                  rounded
                  source={require('../../../assets/en.png')}
                  onPress={() => { setShowModalVisibleLanguage(true) }}
                  activeOpacity={0.7}
                  containerStyle={styles.flag}
                />
                :
                lang === 'ru' ?
                  <Avatar
                    size="small"
                    rounded
                    source={require('../../../assets/ru.png')}
                    onPress={async () => { setShowModalVisibleLanguage(true) }}
                    activeOpacity={0.7}
                    containerStyle={styles.flag}
                  />
                  :
                  <Avatar
                    size="small"
                    rounded
                    source={require('../../../assets/en.png')}
                    onPress={async () => { setShowModalVisibleLanguage(true) }}
                    activeOpacity={0.7}
                    containerStyle={styles.flag}
                  />
            }
            <FontAwesome5 style={styles.item2} name="chevron-right" size={15} color="#7a7a7a" />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => { navigate('ManageCreditCards') }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value={t('managecreditcards')}></FontBold>
            <FontAwesome5 mystyle={styles.item2} name="chevron-right" size={15} color="black" />
          </View>
        </TouchableOpacity> */}
        <Spacer />
        <Spacer />
        {/* <FontLight mystyle={styles.listtitle} value={t('appsettings')} ></FontLight> */}
        {/* <TouchableOpacity onPress={() => { }}>
          <View style={styles.row}>
            <FontBold mystyle={styles.item1} value='Language'></FontBold>
            <FontAwesome5 mystyle={styles.item2} name="chevron-right" size={15} color="black" />
          </View>
        </TouchableOpacity> */}
        <Spacer />
        <LogoutButton />
      </ScrollView>
      {/* <Spacer> */}
      {/* <FontBold
            value={t('homepage')}
            mystyle={{
              textDecorationLine: 'underline',
              textDecorationStyle: "solid",
              textDecorationColor: "blue",
              textAlign: "center",
              fontSize: 12,
              color: 'blue'
            }} /> */}
      {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <FontAwesome5
            style={{ color: '#000' }}
            onPress={() => navigate('HomeNavigator')}
            name="home"
            size={35}
          />
        </View>
      </Spacer> */}
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    paddingBottom: 20,
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
  item3: {
    fontSize: 16,
    marginLeft: 15,
    width: '30%' // is 50% of container width
  },
  // avatar: {
  //   position: 'absolute',
  //   backgroundColor: '#f5c500',
  //   flex: 1,
  //   marginLeft: 20,
  //   bottom: -30
  // },
  avatar: {
    position: 'absolute',
    backgroundColor: '#ddd',
    top: 50,

  },
  name: {
    position: 'absolute',
    fontSize: 22,
    top: 80,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#000',
  },
  mobile: {
    position: 'absolute',
    fontSize: 20,
    top: 120,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#000',
  },
  listtitle: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 15
  },
  flag: {
    borderColor: '#000',
    borderWidth: 0,
    backgroundColor: '#fff',
    width: 30,
    height: 30,
  },
});

export default withNamespaces()(SettingScreen);


