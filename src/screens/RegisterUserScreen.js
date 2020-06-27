import React, { useState, useContext, useEffect } from 'react';
//Import all required component
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Loader from '../components/Loader';
import FontBold from '../components/FontBold';
import FontRegular from '../components/FontRegular';
import FontLight from '../components/FontLight';
// import MapComponent from '../components/MapComponent';
import GooglePlacesInput from '../components/GooglePlacesInput';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from './context/AuthContext';
import { Context as UserContext } from './context/UserContext';
import { navigate } from '../navigationRef';
import { withNamespaces } from 'react-i18next';
import Toast from 'react-native-simple-toast';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { setRedirect } from '../api/redirect';
import MapContainer from '../components/lcation/MapContainer';
import { BackHandler } from 'react-native';

const RegisterUserScreen = ({ navigation, t }) => {
    const { redirect } = navigation.state.params;
    const { state, register } = useContext(AuthContext);
    const { state: ustate, getUserDetails } = useContext(UserContext);
    let [fullName, setFullName] = useState('');
    let [email, setEmail] = useState('');
    let [fullNameStyle, setFullNameStyle] = useState(styles.inputStyleError);
    let [emailStyle, setEmailStyle] = useState(styles.inputStyleError);
    let [fullNamePlaceholderStyle, setFullNamePlaceholderStyle] = useState('#aaa');
    let [emailPlaceholderStyle, setEmailPlaceholderStyle] = useState('#aaa');
    // let [userAddress, setUserAddress] = useState("");
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => { return true });
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => { return true });
        };
    }, []);
    // useEffect(() => {
    //     if (ustate.addresses != [])
    //         setUserAddress(ustate.addresses[0].address);
    // }, [ustate.addresses]);
    const handleFullNameChange = (fullnm) => {
        setFullName(fullnm);
        if (fullnm.length < 5) {
            console.log("FullName is Not Correct");
            setFullNameStyle(styles.inputStyleError);
            setFullNamePlaceholderStyle('#aaa');
            return false;
        }
        else {
            console.log("FullName is Correct");
            setFullNameStyle(styles.inputStyle);
            setFullNamePlaceholderStyle('#aaa');
            return true;
        }
    }
    const handleEmailChange = (eml) => {
        setEmail(eml);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(eml) === false) {
            console.log("Email is Not Correct");
            setEmailStyle(styles.inputStyleError);
            setEmailPlaceholderStyle('#aaa');
            return false;
        }
        else {
            console.log("Email is Correct");
            setEmailStyle(styles.inputStyle);
            setEmailPlaceholderStyle('#aaa');
            return true;
        }
    }
    const handleSubmitButton = async () => {
        setErrortext('');
        if (!fullName) {
            setErrortext(t('pleasefillname'));
            return;
        }
        if (!handleFullNameChange(fullName)) {
            setErrortext(t('pleasefillname'));
            return;
        }
        if (!email) {
            setErrortext(t('pleasefillemail'));
            return;
        }
        if (!handleEmailChange(email)) {
            setErrortext(t('pleasecheckemail'));
            return;
        }
        // if (!userAddress) {
        //     setErrortext(t('pleasefilladdress'));
        //     return;
        // }
        //Show Loader
        setLoading(true);
        var result = await register({
            fullName: fullName, email: email, language: "En"
        });
        //setTimeout(function () {
        try {
            //Hide Loader
            console.log(result);
            // If server response message same as Data Matched
            if (result.status == true && result.data == "Duplicated Email") {
                setLoading(false);
                setIsRegistraionSuccess(false);
                setErrortext(t('pleaseuseanotheremail'));
            } else if (result.status == true && result.data == "success") {
                getUserDetails().then((response) => {
                    console.log("RegisterUserScreen::useffect::getUseDetails::response:: ");
                    console.log(response);

                }).catch((error) => {
                    console.log("RegisterUserScreen::getUserDetails#1 " + error);
                });
                setLoading(false);
                setIsRegistraionSuccess(true);
                console.log('Registration Successful. Please Login to proceed');
                navigation.navigate(redirect);
            } else {
                setLoading(false);
                setErrortext(t('registrationunsuccessful'));
            }
        } catch (error) {
            //Hide Loader
            setLoading(false);
            setErrortext(t('registrationunsuccessful'));
            console.error(error);
        }
        //}, 2500);
    };


    // if (isRegistraionSuccess) {
    //     navigation.navigate('Frequncy');
    //     // return (
    //     //     <View
    //     //         style={{
    //     //             flex: 1,
    //     //             backgroundColor: '#307ecc',
    //     //             justifyContent: 'center',
    //     //         }}>
    //     //         <Image
    //     //             source={require('../../assets/back.jpg')}
    //     //             style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
    //     //         />
    //     //         <Text style={styles.successTextStyle}>Registration Successful.</Text>
    //     //         <TouchableOpacity
    //     //             style={styles.buttonStyle}
    //     //             activeOpacity={0.5}
    //     //             onPress={() => props.navigation.navigate('LoginScreen')}>
    //     //             <Text style={styles.buttonTextStyle}>Login Now</Text>
    //     //         </TouchableOpacity>
    //     //     </View>
    //     // );
    // }
    return (
        <>
            {/* <View style={{ flex: 1 }}>
                <Loader loading={loading} />
                {/* <GooglePlacesInput /> */}
            {/* <ScrollView keyboardShouldPersistTaps="handled"> */}

            <View style={styles.container}>
                <Loader loading={loading} />
                <Spacer />
                <ScrollView keyboardShouldPersistTaps="handled">
                    {/* <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/back.jpg')}
                            style={{
                                width: '50%',
                                height: 250,
                                resizeMode: 'contain',
                                margin: 30,
                            }}
                        />

                        <MapComponent style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }} ></MapComponent>
                    </View> */}
                    <View >
                        <KeyboardAvoidingView enabled>
                            <FontLight value={t('name')} mystyle={{ left: 15, marginBottom: -10 }} />
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={fullNameStyle}
                                    onChangeText={(fullName) => { setErrortext(''); handleFullNameChange(fullName); }}
                                    placeholder={t('entername')}
                                    placeholderTextColor={fullNamePlaceholderStyle}
                                    autoCapitalize="sentences"
                                    value={fullName}
                                    maxLength={25}
                                    // ref={ref => {
                                    //     this._fullnameinput = ref;
                                    // }}
                                    returnKeyType="next"
                                    // onSubmitEditing={() => this._emailinput && this._emailinput.focus()}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <Spacer />
                            <FontLight value={t('email')} mystyle={{ left: 15, marginBottom: -10 }} />
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={emailStyle}
                                    onChangeText={(email) => { setErrortext(''); handleEmailChange(email); }}
                                    value={email}
                                    maxLength={30}
                                    // underlineColorAndroid="#F6F6F7"
                                    placeholder={t('enteremail')}
                                    placeholderTextColor={emailPlaceholderStyle}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    // ref={ref => {
                                    //     this._emailinput = ref;
                                    // }}
                                    returnKeyType="next"
                                    // onSubmitEditing={() => this._addressinput && this._addressinput.focus()}
                                    blurOnSubmit={false}
                                />
                            </View>
                            {/* <View flexDirection='row' style={styles.addressSectionStyle}>
                                <TextInput
                                    style={styles.addressinputStyle}
                                    onChangeText={UserAddress => setUserAddress(UserAddress)}
                                    value={userAddress}
                                    // underlineColorAndroid="#FFFFFF"
                                    placeholder={t('enteraddress')}
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="sentences"
                                    // ref={ref => {
                                    //     this._addressinput = ref;
                                    // }}
                                    editable={false}
                                    returnKeyType="next"
                                    // onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={async () => {
                                        setRedirect('RegisterUserScreen');
                                        navigate('MapScreen');
                                    }}
                                    style={{
                                        position: 'absolute', right: 15,
                                    }}>
                                    <Entypo name="plus" size={45} color="#7a7a7a" />
                                </TouchableOpacity>
                            </View> */}
                            {
                                errortext != '' ? Toast.show(errortext, Toast.SHORT) : null
                                // (<Text style={styles.errorTextStyle}> {errortext} </Text>) : null
                            }

                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitButton}>
                <FontBold mystyle={styles.buttonTextStyle} value={t('register')} />
            </TouchableOpacity>
        </>
    );
};
export default withNamespaces()(RegisterUserScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 50,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    addressSectionStyle: {
        flexDirection: 'row',
        height: 50,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    buttonStyle: {
        backgroundColor: '#f5c500',
        borderRadius: 4,
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        height: 45,
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 22,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#aaa',
        fontSize: 20,
        padding: 10,
        height: 50
    },
    inputStyleError: {
        flex: 1,
        color: '#aaa',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#aaa',
        fontSize: 20,
        height: 50,

    }

});