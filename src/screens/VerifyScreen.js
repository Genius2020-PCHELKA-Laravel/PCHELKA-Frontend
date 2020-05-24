import React, { useState, useEffect, useContext } from 'react';
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

const VerifyScreen = ({ navigation }) => {
    const { mobile, otp } = navigation.state.params;
    const { verifysms, sendsms } = useContext(AuthContext);
    const { state, getUserDetails, checkFullName } = useContext(UserContext);
    const [resendotp, setResendotp] = useState(otp);
    const resend = () => {
        setResendotp(Math.floor(1000 + Math.random() * 9000).toString());
    }
    //const [selectedmobile, setSelectedMobile] = useState(state.mobile);
    useEffect(() => {
        console.log("resend otp:    " + resendotp);
        console.log("mobile in verify:    " + state.mobile);
        sendsms({ mobile: mobile, otp: resendotp });
        console.log('SENDED Mobile, OTP >>>>>>' + "Mobile " + mobile + " otp:" + resendotp);
    }, [resendotp]);
    return (<>
        <View style={styles.container}>
            <Spacer>
                <FontBold mystyle={styles.mobileText} value="Enter The Code That Was Sent To: "></FontBold>
                <FontBold mystyle={styles.mobileText} value={state.mobile}></FontBold>
                <Text>OTP: </Text><FontBold mystyle={styles.mobileText} value={otp}></FontBold>
                <Text>Resend OTP: </Text><FontBold mystyle={styles.mobileText} value={resendotp}></FontBold>
            </Spacer>
            <Spacer />
            <Spacer />
            <Spacer />
            <OtpInputs style={styles.inputsection}
                //handleChange={code => console.log(code)}
                handleChange={(enteredotp) => {
                    if (enteredotp === resendotp) {
                        try {
                            verifysms({ mobile: mobile, enteredotp: enteredotp, otp: resendotp });
                            var res = checkFullName(mobile);
                        } catch (err) {
                            console.log("Error>>>>>>>>" + err)
                        }

                    } else
                        console.log(enteredotp);
                }
                }
                numberOfInputs={4}
                inputStyles={styles.input}
            />
            <FontBold mystyle={styles.resendText} value={'Resend Code in: '}></FontBold>
            <Timer onclick={resend}></Timer>
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
    mobileText: { marginTop: 10, marginLeft: 10, fontSize: 24, fontFamily: 'Comfortaa-Bold' },
    resendText: { justifyContent: 'center', marginTop: 10, marginLeft: 10, fontSize: 14, fontFamily: 'Comfortaa-Bold' },
    input: {
        marginLeft: 10,
        height: 60,
        width: 60,
        borderColor: '#f1c40f',
        borderRadius: 15,
        borderWidth: 2,
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

export default VerifyScreen;