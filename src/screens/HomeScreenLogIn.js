import React, {useState, useEffect} from 'react';
import { Text,StyleSheet, View, Button,ScrollView, SafeAreaView,Image,TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import {AntDesign,FontAwesome5} from '@expo/vector-icons';
import Servicesdetails from '../components/Servicesdetails';
import i18n  from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
import { AsyncStorage } from "react-native";

const HomeScreenLogIn = ({ navigation,t }) => {
  const [shouldShow, setShouldShow] = useState(true);
  const [lang, setLang] = useState('en');
  //const [dropdownContents, setDropdownContents] = useState('');
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
  return (<> 
        <View style={styles.topcontainer}>
          <TouchableOpacity  onPress={()=> navigation.navigate('locationscreen')}>
            <AntDesign name="login" size={24} color="black"/>
          </TouchableOpacity>
          {shouldShow ? 
                <TouchableOpacity style={styles.LangButtonStyle} activeOpacity = { .5 } onPress={()=>changeLanguage('ru')}>
                    <Text>Russian</Text>
                </TouchableOpacity>
           : 
            <TouchableOpacity  style={styles.LangButtonStyle} activeOpacity = { .5 } onPress={()=>changeLanguage('en')}>
                <Text>English</Text>
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
          <View style={styles.middlecontainer1}>
            <TouchableOpacity onPress={()=> navigation.navigate('frequency')}>
              <Image  style={styles.image} source={require('../../assets/homecleaning.jpg')}/>
              <Text style={styles.text}>{t('booknow')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.middlecontainer2}>
            <Text style={styles.text}>{t('homescreentext')}</Text>
          </View>
          <View style={styles.bottomcontainer}>
            <ScrollView horizontal >
              <Servicesdetails title={t('fulltimemade')} imagesource={require('../../assets/maid.jpg')}/>
              <Servicesdetails title={t('laundary')} imagesource={require('../../assets/maid.jpg')}/>
              <Servicesdetails title={t('disinfectionservices')} imagesource={require('../../assets/disinfection.jpg')}/>
              <Servicesdetails title={t('sofacleaning')} imagesource={require('../../assets/sofa.jpg')}/>
            </ScrollView>            
          </View>
    </>);
};



const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color :"#161924",
    fontWeight:"500"
  },

  topcontainer:{
    flex:.5,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    margin: 10,
  },
  middlecontainer1:{
    flex:1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middlecontainer2:{
    flex:.5,
    margin: 10
  },
  bottomcontainer:{
    flex:1,
    margin: 10
  },  
  LangButtonStyle: {
    marginTop:10,
    padding:5,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#00BCD4',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },  
});


export default withNamespaces()(HomeScreenLogIn);
