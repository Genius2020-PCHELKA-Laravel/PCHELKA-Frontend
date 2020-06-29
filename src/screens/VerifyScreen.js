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
import { Context as HCContext } from '../screens/context/HCContext';
import { withNamespaces } from 'react-i18next';
import { BackHandler } from 'react-native';
import Loader from '../components/Loader';
import { navigate } from '../navigationRef';
import OfflineNotice from '../components/OfflineNotice';

const VerifyScreen = ({ navigation, t }) => {
    const { mobile, otp, redirect } = navigation.state.params;
    const { verifysms, sendsms } = useContext(AuthContext);
    const { state, getUserDetails, checkFullName, getUserAddresses, dispatch: udispatch } = useContext(UserContext);
    const { state: hcstate, setHC, setBS, setDI, setDE, setSF, setMA, setCA, setCU, getServices, getUpcoming, getPast, dispatch: hcdispatch } = useContext(HCContext);

    const [resendotp, setResendotp] = useState(otp);
    const verifyMountedRef = useRef(null);
    const [isloading, setIsLoading] = useState(false);

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
    const fetchSMS = async () => {
        await sendsms({ mobile: mobile, otp: resendotp });
    };
    useEffect(() => {
        // var isCanceled = false;

        console.log("redirect:    " + redirect);
        console.log("resend otp:    " + resendotp);
        console.log("mobile in verify:    " + state.mobile);
        // if (!isCanceled) {
        fetchSMS();
        // }
        console.log('SENDED Mobile, OTP >>>>>>' + "Mobile " + mobile + " otp:" + resendotp);
        // return () => {
        //     isCanceled = true
        // };
    }, [resendotp]);

    const fetchServices = async () => {
        await getServices().then((response) => {
            setHC(response[0]);
            setDI(response[10]);
            setDE(response[6]);
            setBS(response[11]);
            setSF(response[5]);
            setMA(response[4]);
            setCA(response[3]);
            setCU(response[2]);
            console.log("HomeScreen::UseEffect::getServices::response::");
            console.log(response);
        }).catch((error) => {
            console.log("Error::HomeScreen::UseEffect::getServices");
            console.log(error);
        });
    }
    const fetchAddresses = async () => {
        await getUserDetails().then((response) => {
            console.log("HomeScreen::useffect::getUseDetails::response:: ");
            console.log(response);
            getUserAddresses().then((res) => {
                console.log("HomeScreen::useffect::getUserAddresses::response:: ");
                console.log(res);
                udispatch({ type: 'set_user_addresses_loaded', payload: true });
                udispatch({ type: 'set_user_addresses', payload: res });
            }).catch((error) => {
                console.log("HomeScreen::useffect::getUserAddresses::error:: ");
            });
        }).catch((error) => {
            console.log("HomeScreen::getUserDetails#1 " + error);
        });
    }
    const fetchUpcoming = async () => {
        getUpcoming().then((response) => {
            //console.log("Upcoming::useffect::getUpcoming::response:: ");
            //console.log("######################" + JSON.stringify(response));
        }).catch((error) => {
            console.log(error);
        });
    }
    const fetchPast = async () => {
        getPast().then((response) => {
            //console.log("Upcoming::useffect::getUpcoming::response:: ");
            //console.log("######################" + JSON.stringify(response));
        }).catch((error) => {
            console.log(error);
        });
    }
    return (<>
        <View style={styles.container}>
            <Loader loading={isloading} />
            <Spacer>
                <FontBold mystyle={styles.mobileText} value={t('enterthecodethatwassentto')}></FontBold>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <FontBold mystyle={styles.mobileText} value={state.mobile}></FontBold>
                </View>

            </Spacer>
            <Spacer />
            <OtpInputs style={styles.inputsection}
                //handleChange={code => console.log(code)}
                handleChange={async (enteredotp) => {
                    if (enteredotp === resendotp) {
                        setIsLoading(true);
                        try {
                            await verifysms({ mobile: mobile, enteredotp: enteredotp, otp: resendotp });
                            await fetchServices();
                            await fetchAddresses();
                            await fetchUpcoming();
                            await fetchPast();
                            await checkFullName(mobile, redirect);
                            setIsLoading(false);
                        } catch (err) {
                            console.log("VerifyScreen::Error>>>>>>>>" + err);
                            setIsLoading(false);
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
        <OfflineNotice />
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