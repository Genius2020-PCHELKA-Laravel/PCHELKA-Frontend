import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, Button, ScrollView, SafeAreaView, Image, TouchableOpacity, Dimensions, Vibration, Platform, FlatList, ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements';
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Servicesdetails from '../components/Servicesdetails';
import i18n from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
import { AsyncStorage } from "react-native";
import Spacer from '../components/Spacer';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Slider from '../components/Slider';
import FontBold from '../components/FontBold';
import FontRegular from '../components/FontRegular';
import FontLight from '../components/FontLight';
import { Context as AuthContext } from './context/AuthContext';
import { Context as UserContext } from './context/UserContext';
import { Context as HCContext } from './context/HCContext';
import { navigate } from '../navigationRef';
// import NotificationsComponent from '../components/NotificationsComponent';
import { BackHandler } from 'react-native';
import ExitDialog from '../components/ExitDialog';
import EvaluationDialog from '../components/EvaluationDialog';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { initnotify, getToken, newChannel, notify } from 'expo-push-notification-helper';
import OfflineNotice from '../components/OfflineNotice';
import { getStorageExpoToken, setStorageExpoToken, removeStorageExpoToken } from '../api/token';
import { getLang, storeLang } from '../api/userLanguage';
import Loader from '../components/Loader';
import { fontNormalize, Normalize } from '../components/actuatedNormalize';

const HomeScreen = ({ navigation, t }) => {
  const { getUserDetails, getUserAddresses, dispatch: udispatch, getNotificationFromServer, subscribeToNotification, unsubscribeToNotification, userLanguage } = useContext(UserContext);
  const { state: hcstate, setHC, setBS, setDI, setDE, setSF, setMA, setCA, setCU, getServices, getUpcoming, getPast, getSelectedPast, dispatch: hcdispatch } = useContext(HCContext);
  const { state, logout } = useContext(AuthContext);
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 12 / 16);
  const imageWidth = dimensions.width;
  const [changing, setChanging] = useState(false);
  const [notification, setNotification] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingID, setBookingID] = useState('');
  const [bookingRefCode, setBookingRefCode] = useState('');
  const [providerImageURL, setProviderImageURL] = useState('');
  const [providerName, setProviderName] = useState('');
  const [origin, setOrigin] = useState('');
  const [notificationId, setNotificationId] = useState('');
  // const [expoToken, setExpoToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ploading, psetLoading] = useState(true);
  const [pisListEnd, psetIsListEnd] = useState(false);
  const [pserverData, psetServerData] = useState([]);
  const [pfetching_from_server, pset_fetching_from_server] = useState(false);
  const [poffset, psetOffset] = useState(1);

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
      await Notifications.createChannelAndroidAsync('PCHELKA-CLEANING', {
        name: 'PCHELKA-CLEANING',
        sound: true,
        priority: 'high',
        vibrate: [0, 250, 250, 250],
      });
    }
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      //await setStorageExpoToken('ExponentPushToken[MvcYILJyHS34NhC0vmcMYx]');
      //await subscribeToNotification({ expo_token: 'ExponentPushToken[MvcYILJyHS34NhC0vmcMYx]' });
      try {
        // alert("before")
        token = await Notifications.getExpoPushTokenAsync();
        //token = await Notifications.getDevicePushTokenAsync();
        // alert("after")
        // alert(token);
        //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + token);
        //alert(token);
        await setStorageExpoToken(token);
        await subscribeToNotification({ expo_token: token });
        // setExpoToken(token);
      } catch (err) {
        console.log("@@@@@@@@@@@@@@@ :: " + err)
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  const _handleNotification = notification => {
    Vibration.vibrate();
    // alert(JSON.stringify(notification))
    // console.log(notification);
    // setNotification(notification);

    if (notification.origin == "received" || notification.origin == "selected") {
      let rand = Math.floor(1000 + Math.random() * 9000).toString();
      hcdispatch({ type: 'set_reloadappoitments', payload: rand })
    }
    // if (notification.origin == "received" || notification.origin == "selected") {
    // getUpcoming().then((response) => {
    //   console.log("HomeScreen::useffect::getUpcoming::response:: ");
    //   //console.log("######################" + JSON.stringify(response));
    // }).catch((error) => {
    //   console.log(error);
    // });
    // getPast().then((response) => {
    //   console.log("HomeScreen::useffect::getUpcoming::response:: ");
    //   //console.log("######################" + JSON.stringify(response));
    // }).catch((error) => {
    //   console.log(error);
    // });
    // }
    if (notification.data.status === "Completed") {
      setModalVisible(true);
      setProviderImageURL(notification.data.image);
      setProviderName(notification.data.providerName);
      setBookingID(notification.data.bookId);
      setBookingRefCode(notification.data.refCode);
      setOrigin(notification.origin);
      setNotificationId(notification.notificationId);
    }
    else
      if (notification.origin === "selected") {
        if (notification.data.status === "Canceled")
          navigate("Past");
        if (notification.data.status === "Confirmed" || notification.data.status === "Rescheduled")
          navigate("Upcoming");
      }

  };

  useEffect(() => {
    ploadMoreData();

    // setModalVisible(true);
    // setProviderImageURL('https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg');
    // setBookingID(63);
    // setBookingRefCode('WL8THF');
    registerForPushNotificationsAsync();
    // initnotify().then(async (data) => {
    //   if (data) {
    //     setExpoToken(await getToken());
    //     console.log("ExpoToken" + expoToken);
    //     alert(expoToken);
    //   } else {
    //     alert('please grant this app notification permission in settings.')
    //   }
    // });
    // newChannel("GroupMessage");
    // notify(expoToken, "new message", "hello there how are you doing", "default")

    _notificationSubscription = Notifications.addListener(_handleNotification);

    getLang().then((response) => {
      console.log("HomeScreen:: selected Lang in Use Effect:  " + response);
      i18n.changeLanguage(response);
      userLanguage({ language: response })
        .then((resposnse) => {
          //console.log("LogoutButton::UserLanguage" + (resposnse));
        })
        .catch((err) => {
          console.log("LogoutButton::UserLanguage::error:: " + err);
        });
    }).catch(async (err) => {
      console.log("InternetScreen::Can not get lang");

    });

  }, []);
  // const [testToken, setTestToken] = useState('');

  // getData = async () => {
  //   try {
  //     setTestToken(await getToken());
  //     console.log("Get Data: " + token);
  //   } catch (e) {
  //     console.log("error in token" + e);
  //   }
  // }
  useEffect(() => {
    //hcdispatch({ type: 'RESET' });
    // getServices().then((response) => {
    //   setHC(response[0]);
    //   setDI(response[10]);
    //   setDE(response[6]);
    //   setBS(response[11]);
    //   setSF(response[5]);
    //   setMA(response[4]);
    //   setCA(response[3]);
    //   setCU(response[2]);
    //   console.log("HomeScreen::UseEffect::getServices::response::");
    //   console.log(response);
    // }).catch((error) => {
    //   console.log("Error::HomeScreen::UseEffect::getServices");
    //   console.log(error);
    // });

    // getUserDetails().then((response) => {
    //   console.log("HomeScreen::useffect::getUseDetails::response:: ");
    //   console.log(response);
    //   getUserAddresses().then((res) => {
    //     console.log("HomeScreen::useffect::getUserAddresses::response:: ");
    //     console.log(res);
    //     udispatch({ type: 'set_user_addresses_loaded', payload: true });
    //     udispatch({ type: 'set_user_addresses', payload: res });
    //   }).catch((error) => {
    //     console.log("HomeScreen::useffect::getUserAddresses::error:: ");
    //   });
    // }).catch((error) => {
    //   console.log("HomeScreen::getUserDetails#1 " + error);
    // });

    // getUpcoming().then((response) => {
    //   //console.log("Upcoming::useffect::getUpcoming::response:: ");
    //   //console.log("######################" + JSON.stringify(response));
    // }).catch((error) => {
    //   console.log(error);
    // });
    // getPast().then((response) => {
    //   //console.log("Upcoming::useffect::getUpcoming::response:: ");
    //   //console.log("######################" + JSON.stringify(response));
    // }).catch((error) => {
    //   console.log(error);
    // });

  }, []);
  const unsubscribe = navigation.addListener('didFocus', () => {
    console.log("HomeScreen::didFocus");
    hcdispatch({ type: 'RESET' });
    BackHandler.addEventListener('hardwareBackPress', () => { setChanging(true); return true; });
  });
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => { setChanging(true); return true; });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => { setChanging(false); return true; });
    };
  }, []);
  useEffect(() => {
    psetLoading(true);
    psetIsListEnd(false);
    pset_fetching_from_server(false);
    psetOffset(2);
    psetServerData([]);
    getPast({ page: 1 }).then((response) => {
      psetLoading(false);
      if (response.length > 0) {
        console.log("PastScreen::onrefresh::getUpcoming::response:: ");
        console.log("######################1");
        console.log("######################" + JSON.stringify(response[0].id));
        psetServerData([...response]);
        pset_fetching_from_server(false);
      } else {
        pset_fetching_from_server(false);
        psetIsListEnd(true);
      }
    }).catch((error) => {
      console.log("Error::UpcomingScree::Onrefresh " + error);
      pset_fetching_from_server(false);
      psetIsListEnd(true);
      psetLoading(false);
    });
  }, [hcstate.reloadAppointments]);
  // useEffect(() => {
  //   getUpcoming().then((response) => {
  //     console.log("Upcoming::useffect::getUpcoming::response:: ");
  //     console.log("######################" + JSON.stringify(response));
  //   }).catch((error) => {
  //     console.log(error.response);
  //   });
  //   getPast().then((response) => {
  //     //console.log("Upcoming::useffect::getUpcoming::response:: ");
  //     //console.log("######################" + JSON.stringify(response));
  //   }).catch((error) => {
  //     console.log(error.response);
  //   });
  // }, [hcstate.reloadAppointments]);
  // useEffect(() => {
  //   getUpcoming().then((response) => {
  //     console.log("HomeScreen::useffect::getUpcoming::response:: ");
  //     console.log("######################" + JSON.stringify(response));
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }, []);
  // useEffect(() => {
  //   getUpcoming().then((response) => {
  //     console.log("HomeScreen::useffect::getUpcoming::response:: ");
  //     console.log("######################" + JSON.stringify(response));
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }, [hcstate.reloadAppointments]);
  //const [dropdownContents, setDropdownContents] = useState('');
  const ploadMoreData = () => {
    if (!pfetching_from_server && !pisListEnd) {
      pset_fetching_from_server(true);
      getPast({ page: poffset }).then((presponse) => {
        psetLoading(false);
        if (presponse.length > 0) {
          console.log("HomeScreenn::loadMoreData::getPast::presponse:: ");
          console.log("######################" + poffset);
          console.log("######################" + JSON.stringify(presponse[0]));
          if (typeof presponse[0].id != 'undefined')
            console.log("######################" + JSON.stringify(presponse[0].id));
          let pnewoffset = poffset + 1;
          psetOffset(pnewoffset);
          //After the response increasing the offset for the next API call.
          psetServerData([...pserverData, ...presponse])
          //adding the new data with old one available
          pset_fetching_from_server(false);
          //updating the loading state to false
        } else {
          pset_fetching_from_server(false);
          psetIsListEnd(true);
        }
      }).catch((error) => {
        console.log("Error::HomeScreenn:: " + error);
        pset_fetching_from_server(false);
        psetIsListEnd(true);
      });
    }
  };
  const prenderFooter = () => {
    return (
      <View style={styles.footer}>
        {pfetching_from_server ? (
          <Image style={{ width: Normalize(65), height: Normalize(65), top: Normalize(10) }} source={require('../../assets/spin.gif')} />
          // <ActivityIndicator color="#f5c500" size="large" />
        ) : null}
      </View>
    );
  }
  const pemptyAppoitments = () => {
    return (
      <View style={{ flex: 1, dispatch: "none" }}>
      </View>);
  }
  const bookagain = (item) => {
    console.log(item);
    hcdispatch({ type: 'set_providerid', payload: item.providerData.id });
    setIsLoading(true);
    getSelectedPast({
      id: item.id,
    }).then((response) => {
      hcdispatch({ type: 'set_selected_past_provider_data', payload: item.providerData });
      console.log("####SelectedPast####" + JSON.stringify(response));
      setIsLoading(false);
      if (response.serviceType === "HomeCleaning") {
        hcdispatch({ type: 'set_frequency', payload: response.frequency });
        hcdispatch({ type: 'set_hours', payload: response.hoursNeeded });
        hcdispatch({ type: 'set_cleaners', payload: response.cleanerCount });
        hcdispatch({ type: 'set_materials', payload: response.requireMaterial });
        udispatch({ type: 'set_selected_address', payload: response.addressDetails.locationId });
        udispatch({ type: 'set_selected_address_name', payload: response.addressDetails.address });
        navigate("HomeCleaningScreen");
      }
      else if (response.serviceType === "DisinfectionService") {
        hcdispatch({ type: 'set_frequency', payload: response.frequency });
        hcdispatch({ type: 'set_hours', payload: response.hoursNeeded });
        hcdispatch({ type: 'set_cleaners', payload: response.cleanerCount });
        hcdispatch({ type: 'set_materials', payload: response.requireMaterial });
        udispatch({ type: 'set_selected_address', payload: response.addressDetails.locationId });
        udispatch({ type: 'set_selected_address_name', payload: response.addressDetails.address });
        navigate("DisinfectionScreen");
      }
      else if (response.serviceType === "DeepCleaning") {
        hcdispatch({ type: 'set_frequency', payload: response.frequency });
        hcdispatch({ type: 'set_hours', payload: response.hoursNeeded });
        hcdispatch({ type: 'set_cleaners', payload: response.cleanerCount });
        hcdispatch({ type: 'set_materials', payload: response.requireMaterial });
        udispatch({ type: 'set_selected_address', payload: response.addressDetails.locationId });
        udispatch({ type: 'set_selected_address_name', payload: response.addressDetails.address });
        navigate("DeepCleaningScreen");
      }
      else if (response.serviceType === "BabysitterService") {
        hcdispatch({ type: 'set_frequency', payload: response.frequency });
        hcdispatch({ type: 'set_hours', payload: response.hoursNeeded });
        hcdispatch({ type: 'set_cleaners', payload: response.cleanerCount });
        udispatch({ type: 'set_selected_address', payload: response.addressDetails.locationId });
        udispatch({ type: 'set_selected_address_name', payload: response.addressDetails.address });
        navigate("BabySitterScreen");
      } else if (response.serviceType === "CarpetCleaning") {
        hcdispatch({ type: 'set_quantity', payload: response.quantity, });
        hcdispatch({ type: 'set_square_meters', payload: response.squareMeters });
        hcdispatch({ type: 'set_materials', payload: response.requireMaterial });
        udispatch({ type: 'set_selected_address', payload: response.addressDetails.locationId });
        udispatch({ type: 'set_selected_address_name', payload: response.addressDetails.address });
        navigate("CarpetCleaningScreen");
      } else if (response.serviceType === "CurtainCleaning") {
        hcdispatch({ type: 'set_quantity', payload: response.quantity, });
        hcdispatch({ type: 'set_square_meters', payload: response.squareMeters });
        hcdispatch({ type: 'set_materials', payload: response.requireMaterial });
        udispatch({ type: 'set_selected_address', payload: response.addressDetails.locationId });
        udispatch({ type: 'set_selected_address_name', payload: response.addressDetails.address });
        navigate("CurtainCleaningScreen");
      } else if (response.serviceType === "MattressCleaning") {
        hcdispatch({ type: 'set_quantity', payload: response.quantity, });
        hcdispatch({ type: 'set_materials', payload: response.requireMaterial });
        udispatch({ type: 'set_selected_address', payload: response.addressDetails.locationId });
        udispatch({ type: 'set_selected_address_name', payload: response.addressDetails.address });
        navigate("MattressCleaningScreen");
      } else if (response.serviceType === "SofaCleaning") {
        hcdispatch({ type: 'set_quantity', payload: response.quantity, });
        hcdispatch({ type: 'set_materials', payload: response.requireMaterial });
        udispatch({ type: 'set_selected_address', payload: response.addressDetails.locationId });
        udispatch({ type: 'set_selected_address_name', payload: response.addressDetails.address });
        navigate("SofaCleaningScreen");
      }
    });

  }
  return (<>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Loader loading={isLoading} />
      <ExitDialog changing={changing} setChanging={setChanging} />
      <EvaluationDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        providerImageURL={providerImageURL}
        providerName={providerName}
        bookingID={bookingID}
        bookingRefCode={bookingRefCode}
        origin={origin}
        notificationId={notificationId}
      />
      <Slider />
      {/* booking again */}
      <View style={styles.container}>
        {ploading ? (
          <View>
            {/* <FontLight value={t('yourfavorites')} />
            <FontBold value={t('bookagain')} /> */}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image style={{ width: Normalize(80), height: Normalize(80) }} source={require('../../assets/spin.gif')} />
            </View>
          </View>
          // <ActivityIndicator size="large" color="#f5c500" />
        ) : (

            <FlatList
              style={{ flex: 1, marginLeft: Normalize(10), marginRight: Normalize(10) }}
              contentContainerStyle={{ justifyContent: "center", flexDirection: "row" }}
              keyExtractor={(item, index) => index.toString()}
              data={pserverData}
              onEndReached={() => ploadMoreData()}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={pemptyAppoitments}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              // refreshControl={
              //     <RefreshControl
              //         refreshing={prefreshing}
              //         onRefresh={p_onRefresh}
              //     />
              // }
              renderItem={({ item, index }) => (
                item.status == "Completed" ?
                  <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                    {
                      <View style={styles.providerThumup}>
                        <View style={{ position: "absolute", right: 2, top: 2 }}>
                          <FontLight value={t(item.refCode)} mystyle={{ fontSize: fontNormalize(12) }} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                          <View style={{ flexDirection: "column", justifyContent: "center" }}>
                            <Image style={styles.image} source={{ uri: item.providerData.imageUrl }} />
                          </View>
                          <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                            <View style={{ flexDirection: "row" }}>
                              <FontBold value={item.providerData.name} />
                            </View>
                            <View style={{ flexDirection: "row", marginTop: Normalize(10) }}>

                              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                {
                                  item.providerData.evaluation == 0 ?
                                    <FontAwesome name="star-o" size={Normalize(18)} color="#ff9800" style={{}} />
                                    :
                                    item.providerData.evaluation == 1 ?
                                      <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                      :
                                      item.providerData.evaluation == 2 ?
                                        <>
                                          <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                          <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                        </>
                                        :
                                        item.providerData.evaluation == 3 ?
                                          <>
                                            <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                            <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                            <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                          </>
                                          :
                                          item.providerData.evaluation == 4 ?
                                            <>
                                              <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                              <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                              <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                              <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                            </>
                                            :
                                            item.providerData.evaluation == 5 ?
                                              <>
                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                              </>
                                              :
                                              item.providerData.evaluation > 1 && item.providerData.evaluation < 2 ?
                                                <>
                                                  <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                  <FontAwesome name="star-half-empty" size={Normalize(18)} color="#ff9800" style={{}} />
                                                </>
                                                :
                                                item.providerData.evaluation > 2 && item.providerData.evaluation < 3 ?
                                                  <>
                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                    <FontAwesome name="star-half-empty" size={Normalize(18)} color="#ff9800" style={{}} />
                                                  </>
                                                  :
                                                  item.providerData.evaluation > 3 && item.providerData.evaluation < 4 ?
                                                    <>
                                                      <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                      <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                      <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                      <FontAwesome name="star-half-empty" size={Normalize(18)} color="#ff9800" style={{}} />
                                                    </>
                                                    :
                                                    item.providerData.evaluation > 4 && item.providerData.evaluation < 5 ?
                                                      <>
                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                        <FontAwesome name="star-half-empty" size={Normalize(18)} color="#ff9800" style={{}} />
                                                      </>
                                                      :
                                                      <>
                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                      </>
                                }
                                {/* <Text>{' '}</Text> */}
                                {
                                  item.providerData.evaluation == 0 ?
                                    <FontLight mystyle={{ fontSize: fontNormalize(11), padding: 0, marginLeft: Normalize(5) }} value={t('notevaluated')} />
                                    :
                                    <FontLight mystyle={{ fontSize: fontNormalize(11), padding: 0, marginLeft: Normalize(5), textAlignVertical: "top" }} value={item.providerData.evaluation} />
                                }
                                <TouchableOpacity
                                  style={{ flexDirection: "row" }}
                                  onPress={() => bookagain(item)}
                                >
                                  <FontBold mystyle={styles.bookagainbuttonStyle} value={t('bookagain')} />
                                  <FontAwesome name="chevron-right" size={Normalize(12)} color="blue" style={{ marginTop: Normalize(7), marginLeft: Normalize(4), marginRight: Normalize(15) }} />
                                </TouchableOpacity>
                              </View>



                            </View>
                            {
                              item.providerData.lastServiceDate != null ?
                                <View style={{ flexDirection: "row", marginTop: Normalize(10) }}>
                                  <FontLight mystyle={{ color: "#000", fontSize: fontNormalize(12) }} value={t('lastservedat')} />
                                  <FontLight mystyle={{ color: "#000", fontSize: fontNormalize(12) }} value={item.providerData.lastServiceDate} />
                                </View>
                                :
                                <View style={{ flexDirection: "row", marginTop: Normalize(10) }}>
                                  {/* <FontLight mystyle={{ color: "#000", fontSize: 12 }} value={t('lastservedat')} /> */}
                                  <FontLight mystyle={{ color: "#000", fontSize: fontNormalize(12) }} value={t('notcompleted')} />
                                </View>
                            }
                          </View>
                        </View>
                      </View>

                    }
                  </View>
                  :
                  null
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListFooterComponent={prenderFooter}
            //Adding Load More button as footer component
            />
          )}
      </View>
      {/* end booking agin */}

      <Spacer>
        <View style={styles.middlecontainer1}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeCleaningScreen', { redirect: "Dashboard" })}>
            <Image resizeMethod='auto' style={{ opacity: 0.5, backgroundColor: 'black', borderRadius: 7, height: imageHeight, width: imageWidth - Normalize(20), marginLeft: Normalize(5), marginRight: Normalize(5) }} source={require('../../assets/services/homecleaning.jpg')} />
            <Text style={styles.booknowButtonStyle}>
              <FontBold value={t('booknow') + " "} mystyle={{ textAlignVertical: "center", }} />
              <FontAwesome5 name="chevron-right" size={Normalize(15)} color="#7a7a7a" />
            </Text>
            <FontBold value={t('cleaningservicetext')} mystyle={styles.cleaningservicetext} />
            <FontRegular value={t('cleaningservicedetailtext')} mystyle={styles.cleaningservicedetailtext} />
          </TouchableOpacity>
        </View>
      </Spacer>
      {/* <View>
        <TouchableOpacity onPress={async () => {
          //await subscribeToNotification({ expo_token: 'ExponentPushToken[rplFsYMBUnIcHy8J-jPsXV]' });
          await subscribeToNotification({ expo_token: 'ExponentPushToken[MvcYILJyHS34NhC0vmcMYx]' });
          getNotificationFromServer();
        }}>
          <Spacer>
            <Text>subscribe and get notification</Text>
          </Spacer>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          ////old android app
          //await unsubscribeToNotification({ expo_token: 'ExponentPushToken[rplFsYMBUnIcHy8J-jPsXV]' });
          /////android build
          //await unsubscribeToNotification({ expo_token: 'ExponentPushToken[FBUTilDBNd-yFQBOHmoy5S]' });
          //new Android App
          await unsubscribeToNotification({ expo_token: 'ExponentPushToken[MvcYILJyHS34NhC0vmcMYx]' });
          // await unsubscribeToNotification({ expo_token: expoToken });
        }}>
          <Spacer>
            <Text>unsubscribe</Text>
          </Spacer>
        </TouchableOpacity>
      </View> */}
      <Spacer>
        <View style={styles.everthingtext}>
          <Text style={styles.everthingtext}>
            <FontLight value={t('everthingtext')} />
          </Text>
        </View>
        <View style={styles.middlecontainer3}>
          <FontBold value={t('homescreentext')} mystyle={styles.homescreentext} />
        </View>
      </Spacer>
      {/* <NotificationsComponent /> */}

      <Spacer>
        <View style={styles.bottomcontainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingHorizontal: Normalize(10) }}>
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"DisinfectionScreen"} trending="no" biosafe="yes" comming="no" title={t('disinfectionservices')} imagesource={require('../../assets/services/disinfection.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"CarpetCleaningScreen"} trending="no" biosafe="no" comming="no" title={t('carpetcleaning')} imagesource={require('../../assets/services/carpetcleaning.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"CurtainCleaningScreen"} trending="no" biosafe="no" comming="no" title={t('curtaincleaning')} imagesource={require('../../assets/services/curtaincleaning.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"SofaCleaningScreen"} trending="no" biosafe="no" comming="no" title={t('sofacleaning')} imagesource={require('../../assets/services/sofacleaning.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={""} trending="no" biosafe="no" comming="yes" title={t('carwash')} imagesource={require('../../assets/services/carwash.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={""} trending="no" biosafe="no" comming="yes" title={t('accleaning')} imagesource={require('../../assets/services/accleaning.jpg')} />
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingHorizontal: Normalize(10) }}>
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} trending="yes" biosafe="no" comming="no" title={t('babysitter')} imagesource={require('../../assets/services/babysitter.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"DeepCleaningScreen"} trending="no" biosafe="no" comming="no" title={t('deepcleaning')} imagesource={require('../../assets/services/deepcleaning.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"MattressCleaningScreen"} trending="no" biosafe="no" comming="no" title={t('mattresscleaning')} imagesource={require('../../assets/services/matresscleaning.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={""} biosafe="no" trending="no" comming="yes" title={t('fulltimemade')} imagesource={require('../../assets/services/fulltimemaid.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={""} biosafe="no" trending="no" comming="yes" title={t('laundary')} imagesource={require('../../assets/services/laundary.jpg')} />
            </View>
          </View>

          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          </ScrollView> */}
        </View>
      </Spacer>
    </ScrollView>
    <OfflineNotice />

  </>)
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  everthingtext: {
    fontSize: fontNormalize(12),
    color: '#b4b4b4',
  },
  homescreentext: {
    fontSize: fontNormalize(18),
  },
  servicetext: {
    fontSize: fontNormalize(14),
    fontWeight: "500",
    // fontFamily: 'Comfortaa-Light'
  },
  topcontainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  middlecontainer1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  middlecontainer2: {
    margin: Normalize(5),
  },
  middlecontainer3: {
    margin: Normalize(5),
  },
  bottomcontainer: {
    margin: 0
  },
  topButtonStyle: {
    padding: Normalize(5),
    //backgroundColor:'#DAA520',
    borderRadius: Normalize(10),
    borderWidth: 1,
    borderColor: '#DAA520',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: fontNormalize(12),
    fontWeight: "500",
    // fontFamily: 'Comfortaa-Bold'
  },
  booknowButtonStyle: {
    position: "absolute",
    bottom: Normalize(25),
    left: Normalize(10),
    height: Normalize(35),
    backgroundColor: '#f5c500',
    padding: Normalize(5),
    borderRadius: Normalize(4),
    borderWidth: 0,
    borderColor: '#7a7a7a',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: fontNormalize(16),
    fontWeight: "500",
    paddingHorizontal: Normalize(25),
    color: '#7a7a7a',
    flexDirection: "column",
    justifyContent: "center"
  },
  cleaningservicetext: {
    marginTop: Normalize(20),
    position: "absolute",
    top: Normalize(45),
    left: Normalize(10),
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: fontNormalize(34),
    fontWeight: "900",
    // fontFamily: 'Comfortaa-Bold',
    padding: Normalize(5),
    color: '#fff',
    fontWeight: "bold"
  },
  cleaningservicedetailtext: {
    marginTop: Normalize(40),
    position: "absolute",
    top: Normalize(85),
    left: Normalize(10),
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'left',
    fontSize: fontNormalize(15),
    // fontFamily: 'Comfortaa-Regular',
    padding: Normalize(5),
    color: '#fff',
    lineHeight: Normalize(25)
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
  image: {
    width: Normalize(70),
    height: Normalize(70),
    borderRadius: Normalize(45),
    marginTop: Normalize(5),
    marginBottom: Normalize(5),
    marginLeft: Normalize(10),
    marginRight: Normalize(10),
    borderWidth: 2,
    borderColor: "#fff",
  },
  providerThumup: {
    paddingRight: Normalize(15),
    backgroundColor: '#fff',
    height: Normalize(90),
    borderRadius: Normalize(4),
    borderWidth: 0,
    marginRight: Normalize(10),
    marginLeft: Normalize(10),
    marginTop: Normalize(10),
    marginBottom: Normalize(10),
    shadowColor: '#7a7a7a',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: Normalize(10),
      width: Normalize(10)
    },
    elevation: 3,
    shadowRadius: Normalize(10),
  },
  bookagainbuttonStyle: {
    textAlign: 'center',
    color: 'blue',
    fontSize: fontNormalize(14),
    marginLeft: Normalize(15),
    bottom: Normalize(7),
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});


export default withNamespaces()(HomeScreen);
