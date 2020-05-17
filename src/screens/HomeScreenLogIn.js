import React, {useState, useEffect} from 'react';
import { Text,StyleSheet, View, Button,ScrollView, SafeAreaView,Image,TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import {AntDesign,FontAwesome5} from '@expo/vector-icons';
import Servicesdetails from '../components/Servicesdetails';
import i18n  from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
import { AsyncStorage } from "react-native";
import Spacer from '../components/Spaceer';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const HomeScreenLogIn = ({ navigation,t }) => {
  const [shouldShow, setShouldShow] = useState(true);
  const [lang, setLang] = useState('en');
  //const [dropdownContents, setDropdownContents] = useState('');
  function useFonts(fontMap) {
    let [fontsLoaded, setFontsLoaded] = useState(false);
    (async () => {
      await Font.loadAsync(fontMap);
      setFontsLoaded(true);
    })();
    return [fontsLoaded];
  }
  let [fontsLoaded] = useFonts({
    'Comfortaa-Regular': require('../../assets/fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-Bold': require('../../assets/fonts/Comfortaa-Bold.ttf'),
    'Comfortaa-Light': require('../../assets/fonts/Comfortaa-Light.ttf'),
  });  
  const storeKey = 'myLanguage';
  storeData = async (selectedLanguage) => {
    try {
      await AsyncStorage.setItem(storeKey, selectedLanguage);
      setLang(value);
      changeLanguage(value);
    } catch (error) {
      // Error saving data
    }
  }
  
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(storeKey);
      if (value !== null) {
        // We have data!!
        changeLanguage(value);
        setLang(value);
        if(value == 'en'){
          setShouldShow(true);
        }
        else{
          setShouldShow(false);
        }
      }
     } catch (error) {
       // Error retrieving data
     }
  }
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    storeData(lng);
    shouldShow?setShouldShow(false):setShouldShow(true);
  }


  useEffect(() => {
                   retrieveData();
                  }, []);
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (<> 
        <Spacer>
          <View style={styles.topcontainer}>
            <TouchableOpacity  onPress={()=> navigation.navigate('locationscreen')}>
              <AntDesign name="login" size={24} color="black"/>
            </TouchableOpacity>
            {shouldShow ? 
                  <TouchableOpacity activeOpacity = { .5 } onPress={()=>changeLanguage('ru')}>
                      <Text style={styles.ButtonStyle}>Russian</Text>
                  </TouchableOpacity>
            : 
              <TouchableOpacity  activeOpacity = { .5 } onPress={()=>changeLanguage('en')}>
                  <Text style={styles.ButtonStyle}>English</Text>
              </TouchableOpacity> 
            }

            
            {/* <DropDownPicker
                items={[
                    {label: 'English', value: 'en', selected: true},
                    {label: 'Russian', value: 'ru'},
                ]}
                defaultIndex= {0}
                zIndex={2000}
                containerStyle={{height: 40}}
                onChangeItem={item => changeLanguage(item.value)}
            />  */}
              <TouchableOpacity  onPress={navigation.openDrawer }>
                <FontAwesome5 name="bars" size={24} color="#161924" />
              </TouchableOpacity>
          
            </View>
          </Spacer>
          <Spacer>          
            <View style={styles.middlecontainer1}>
              <TouchableOpacity onPress={()=> navigation.navigate('frequency')}>
                <Image  style={styles.image} source={require('../../assets/homecleaning.jpg')}/>
                <Text style={styles.ButtonStyle}>{t('booknow')}</Text>
              </TouchableOpacity>
            </View>
          </Spacer>
          <Spacer>
            <View style={styles.middlecontainer2}>
              <Text style={styles.homescreentext}>{t('homescreentext')}</Text>
            </View>
          </Spacer>
          <Spacer>
            <View style={styles.bottomcontainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Servicesdetails  contentContainerStyle={{ alignItems: "center" }} title={t('fulltimemade')} imagesource={require('../../assets/maid.jpg')}/>
                <Servicesdetails contentContainerStyle={{ alignItems: "center" }} title={t('laundary')} imagesource={require('../../assets/maid.jpg')}/>
                <Servicesdetails contentContainerStyle={{ alignItems: "center" }} title={t('disinfectionservices')} imagesource={require('../../assets/disinfection.jpg')}/>
                <Servicesdetails contentContainerStyle={{ alignItems: "center" }} title={t('sofacleaning')} imagesource={require('../../assets/sofa.jpg')}/>
              </ScrollView>            
            </View>
          </Spacer>
    </>)};
};



const styles = StyleSheet.create({
  homescreentext: {
    fontSize: 30,
    fontWeight:"500",
    fontFamily:'Comfortaa-Regular'
  },
  servicetext: {
    fontSize: 14,
    fontWeight:"500",
    fontFamily:'Comfortaa-Light'
  },
  topcontainer:{
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  middlecontainer1:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  middlecontainer2:{
    margin: 5,

  },
  bottomcontainer:{
    margin: 0
  },  
  ButtonStyle: {
    marginTop:5,
    padding:5,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#FFD300',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight:"500",
    fontFamily:'Comfortaa-Bold'    
  },  
  
});


export default withNamespaces()(HomeScreenLogIn);
