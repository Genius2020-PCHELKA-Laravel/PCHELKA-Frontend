import React, { useState, useEffect, useContext, useRef } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { Context as AuthContext } from './context/AuthContext';
import FontBold from '../components/FontBold';
import FontLight from '../components/FontLight';
import FontRegular from '../components/FontRegular';
import Spacer from '../components/Spacer';
import Timer from '../components/Timer';
import OtpInputs from "react-native-otp-inputs";
import Axios from '../api/axiosapi';
import { Context as UserContext } from '../screens/context/UserContext';
import { withNamespaces } from 'react-i18next';
import { BackHandler } from 'react-native';

const VerifyScreen = ({ navigation, t }) => {
    const { mobile, otp, redirect } = navigation.state.params;
    const { verifysms, sendsms } = useContext(AuthContext);
    const { state, getUserDetails, checkFullName } = useContext(UserContext);
    const [resendotp, setResendotp] = useState(otp);
    const verifyMountedRef = useRef(null);
    const resend = () => {
        setResendotp(Math.floor(1000 + Math.random() * 9000).toString());
    }
    //const [selectedmobile, setSelectedMobile] = useState(state.mobile);
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => { return true });
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => { return true });
        };
    }, []);
    useEffect(() => {
        verifyMountedRef.current = true;

        console.log("redirect:    " + redirect);
        console.log("resend otp:    " + resendotp);
        console.log("mobile in verify:    " + state.mobile);
        if (verifyMountedRef.current)
            sendsms({ mobile: mobile, otp: resendotp });
        console.log('SENDED Mobile, OTP >>>>>>' + "Mobile " + mobile + " otp:" + resendotp);
        return () => verifyMountedRef.current = false;
    }, [resendotp]);
    return (<>
        <View style={styles.container}>
            <Spacer>
                <FontBold mystyle={styles.mobileText} value={t('enterthecodethatwassentto')}></FontBold>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <FontBold mystyle={styles.mobileText} value={state.mobile}></FontBold>
                </View>

            </Spacer>
            <Spacer />
            <OtpInputs style={styles.inputsection}
                //handleChange={code => console.log(code)}
                handleChange={(enteredotp) => {
                    if (enteredotp === resendotp) {
                        try {
                            verifysms({ mobile: mobile, enteredotp: enteredotp, otp: resendotp });
                            var res = checkFullName(mobile, redirect);
                        } catch (err) {
                            console.log("VerifyScreen::Error>>>>>>>>" + err)
                        }

                    } else
                        console.log(enteredotp);
                }
                }
                numberOfInputs={4}
                inputStyles={styles.input}
            />
            <FontBold mystyle={styles.resendText} value={t('resendcodein')}></FontBold>
            <Timer onclick={resend}></Timer>
        </View>
        <View>
            <FontBold mystyle={{ fontSize: 12 }} value={"if you in ukraine you will receive message"}></FontBold>
            <FontBold mystyle={{ fontSize: 12 }} value={"OTP: " + otp}></FontBold>
            <FontBold mystyle={{ fontSize: 12 }} value={"Resend OTP:" + resendotp}></FontBold>
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputsection: { flexDirection: 'row', justifyContent: 'center' },
    mobileText: { marginTop: 10, marginLeft: 10, fontSize: 24 },
    resendText: { justifyContent: 'center', marginTop: 10, marginLeft: 10, fontSize: 14 },
    input: {
        marginLeft: 10,
        height: 60,
        width: 60,
        borderColor: '#f5c500',
        borderRadius: 15,
        borderWidth: 1,
        fontSize: 26,
        // backgroundColor: '#DAA520',
        textAlign: 'center',
    },
    phoneParts: {
        flexDirection: 'row'
    },
    red: {
        backgroundColor: 'red'
    }
});

export default withNamespaces()(VerifyScreen);