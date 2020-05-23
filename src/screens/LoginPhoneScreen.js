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


const LoginPhoneScreen = ({ navigation }) => {
  const { sendsms } = useContext(AuthContext);
  const { state, dispatch } = useContext(UserContext);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');


  useEffect(() => {
    setOtp(Math.floor(1000 + Math.random() * 9000).toString());
  }, []);
  useEffect(() => {
    if (mobile.length == 12) {
      //setOtp(Math.floor(1000 + Math.random() * 9000).toString());
      navigation.navigate('Verify', { mobile: mobile, otp: otp });
      console.log({ mobile, otp })
      sendsms({ mobile, otp });
      dispatch({
        type: 'update_mobile',
        payload: mobile
      });
      console.log("Finish Enter Mobile Phone>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    }
  }, [mobile]);

  return (<>
    <View style={styles.container}>
      <Spacer>
        <FontBold mystyle={styles.mobileText} value="your mobile number"></FontBold>
      </Spacer>
      <View style={styles.phoneParts}>
        {/* <TextInput
          keyboardType='phone-pad'
          placeholder='+963'
          placeholderTextColor={"#aaaaaa"}
          style={styles.input}
          editable={false}
        //leftIcon={<Icon name='phone' size={24} color='black' />}
        /> */}
        <TextInput
          keyboardType='phone-pad'
          placeholder='963123456789'
          placeholderTextColor={"#aaaaaa"}
          style={styles.input}
          maxLength={12}
          //leftIcon={<Icon name='phone' size={24} color='black' />}
          value={mobile}
          onChangeText={setMobile} />
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
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileText: { marginTop: 0, fontSize: 30, fontFamily: 'Comfortaa-Bold' },
  Textss: { fontSize: 12, paddingRight: 280 },
  input: {
    fontSize: 32,
    paddingBottom: 20,
    padding: 20,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  phoneParts: {
    flexDirection: 'row'
  }
});

export default LoginPhoneScreen;