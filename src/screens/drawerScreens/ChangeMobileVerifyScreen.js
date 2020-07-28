import React, { useState, useEffect, useContext, useRef } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import Loader from '../../components/Loader';
import Spacer from '../../components/Spacer';
import Timer from '../../components/Timer';
import OtpInputs from "react-native-otp-inputs";
import { Context as UserContext } from '../context/UserContext';
import { withNamespaces } from 'react-i18next';
import { navigate } from '../../navigationRef';
import OfflineNotice from '../../components/OfflineNotice';
import { Normalize, fontNormalize } from '../../components/actuatedNormalize';

const ChangeMobileVerifyScreen = ({ navigation, t }) => {
    const { mobile, otp, fullName, email, dateOfBirth, gender, language } = navigation.state.params;
    const { changemobilesendsms, changemobileverifysms } = useContext(AuthContext);
    const { state, getUserDetails, checkFullName, dispatch } = useContext(UserContext);
    const [resendotp, setResendotp] = useState(otp);
    let [loading, setLoading] = useState(false);
    const verifyMountedRef = useRef(null);
    const resend = () => {
        setResendotp(Math.floor(1000 + Math.random() * 9000).toString());
    }
    //const [selectedmobile, setSelectedMobile] = useState(state.mobile);
    useEffect(() => {
        verifyMountedRef.current = true;
        console.log("resend otp:    " + resendotp);
        console.log("mobile in verify:    " + state.mobile);
        if (verifyMountedRef.current)
            changemobilesendsms({ mobile: mobile, otp: resendotp });
        return () => verifyMountedRef.current = false;
    }, [resendotp]);
    return (<>
        <View style={styles.container}>
            <OfflineNotice />

            <Loader loading={loading} />
            <Spacer>
                <FontBold mystyle={styles.mobileText} value={t('enterthecodethatwassentto')}></FontBold>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <FontBold mystyle={styles.mobileText} value={state.mobile}></FontBold>
                </View>
                {/* <Text>OTP: </Text><FontBold mystyle={styles.mobileText} value={otp}></FontBold>
                <Text>Resend OTP: </Text><FontBold mystyle={styles.mobileText} value={resendotp}></FontBold> */}
            </Spacer>
            <Spacer />
            <OtpInputs style={styles.inputsection}
                handleChange={async (enteredotp) => {
                    if (enteredotp === resendotp) {
                        try {
                            setLoading(true);
                            const result = await changemobileverifysms({
                                mobile: mobile,
                                enteredotp: enteredotp,
                                otp: resendotp,
                                fullName: fullName,
                                email: email,
                                dateOfBirth: dateOfBirth,
                                gender: gender,
                                language: language
                            });
                            setLoading(false);
                            dispatch({ type: 'edit_user_details', payload: { mobile, fullName, email, dateOfBirth, gender, language } });
                            navigate('SettingNavigator');

                        } catch (err) {
                            setLoading(false);
                            console.log("ChangeMobileVerifyScreen::Error>>>>>>>>" + err)
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
        {/* <View>
            <FontBold mystyle={{ fontSize: fontNormalize(12) }} value={"if you in ukraine you will receive message"}></FontBold>
            <FontBold mystyle={{ fontSize: fontNormalize(12) }} value={"OTP: " + otp}></FontBold>
            <FontBold mystyle={{ fontSize: fontNormalize(12) }} value={"Resend OTP:" + resendotp}></FontBold>
        </View> */}
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputsection: { flexDirection: 'row', justifyContent: 'center' },
    mobileText: { marginTop: Normalize(10), marginLeft: Normalize(10), fontSize: fontNormalize(24) },
    resendText: { justifyContent: 'center', marginTop: Normalize(10), marginLeft: Normalize(10), fontSize: fontNormalize(14) },
    input: {
        marginLeft: Normalize(10),
        height: Normalize(60),
        width: Normalize(60),
        borderColor: '#f5c500',
        borderRadius: 15,
        borderWidth: 1,
        fontSize: fontNormalize(26),
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

export default withNamespaces()(ChangeMobileVerifyScreen);