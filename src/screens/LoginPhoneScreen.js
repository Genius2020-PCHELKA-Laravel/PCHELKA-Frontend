import React, { useState, useEffect, useContext } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { Context as AuthContext } from './context/AuthContext';
import { Context as UserContext } from './context/UserContext';
import FontBold from '../components/FontBold';
import FontLight from '../components/FontLight';
import FontRegular from '../components/FontRegular';
import Spacer from '../components/Spacer';
import { withNamespaces } from 'react-i18next';
import { BackHandler } from 'react-native';
import OfflineNotice from '../components/OfflineNotice';


const LoginPhoneScreen = ({ navigation, t }) => {

  const { sendsms } = useContext(AuthContext);
  const { state, dispatch } = useContext(UserContext);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => { return true });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => { return true });
    };
  }, []);
  // useEffect(() => {
  // }, []);
  useEffect(() => {
    setOtp(Math.floor(1000 + Math.random() * 9000).toString());
    if (mobile.length == 9) {
      console.log('redirect')
      console.log(navigation.getParam('redirect'))
      //setOtp(Math.floor(1000 + Math.random() * 9000).toString());
      console.log("OTP  " + otp);
      console.log("Mobile  " + mobile);
      // sendsms({ mobile: "380" + mobile, otp });
      navigation.navigate('VerifyScreen', { mobile: "380" + mobile, otp: otp, redirect: navigation.getParam('redirect') });
      dispatch({
        type: 'update_mobile',
        payload: "+380 " + mobile
      });
      console.log({ mobile, otp })
      console.log("Finish Enter Mobile Phone>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    }
  }, [mobile]);
  const handleMobileChange = (mobile) => {
    const filteredmobile = mobile.replace(/\D/gm, '');
    setMobile(filteredmobile);
  }
  return (<>
    <View style={styles.container}>
      <Spacer>
        <FontBold mystyle={styles.mobileText} value={t('yourmobilenumber')}></FontBold>
      </Spacer>
      <View style={styles.phoneParts}>
        <TextInput
          keyboardType='phone-pad'
          placeholder='+380'
          placeholderTextColor={"#aaaaaa"}
          style={styles.input}
          editable={false}
        //leftIcon={<Icon name='phone' size={24} color='black' />}
        />
        <TextInput
          keyboardType='phone-pad'
          placeholder='123456789'
          placeholderTextColor={"#aaaaaa"}
          style={styles.input}
          maxLength={9}
          //leftIcon={<Icon name='phone' size={24} color='black' />}
          value={mobile}
          onChangeText={handleMobileChange} />
      </View>
      {/* {mobile.length != 9 ? <Text style={styles.error}> phone should be 9</Text> : null} */}
      {/* {mobile.length == 9 ? [navigation.navigate('Verify', { mobile: mobile })] : null} */}
      {
      }
      {/* <Button
        icon={
          <Icon
            name="arrow-right"
            size={15}
            color="white"
          />
        } iconRight title="verify"
        onPress={() => {
          otp = Math.floor(1000 + Math.random() * 9000).toString();
          navigation.navigate('ver', { data: mobile, ver: otp });
          mobile = mobile;
          console.log({ mobile, otp })
          signin({ mobile, otp });
        }}

      />
      <Text style={styles.Texts}> {mobile}  </Text>
      {state.errorMessage ? <Text style={styles.Texts}> {state.errorMessage}  </Text> : null} */}
    </View>
    <OfflineNotice />
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  mobileText: { marginLeft: 15, fontSize: 30 },
  input: {
    fontSize: 30,
    paddingBottom: 20,
    padding: 20,
    paddingHorizontal: 10,
  },
  phoneParts: {
    flexDirection: 'row'
  }
});

export default withNamespaces()(LoginPhoneScreen);