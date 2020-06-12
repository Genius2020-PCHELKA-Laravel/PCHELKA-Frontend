import React, { useState, useContext, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import FontBold from '../../components/FontBold';
import FontRegular from '../../components/FontRegular';
import FontLight from '../../components/FontLight';
// import CDate from '../../components/CDate';
import Toast from 'react-native-simple-toast';

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
    Platform,
} from 'react-native';
import Loader from '../../components/Loader';
import Spacer from '../../components/Spacer';
import { Context as UserContext } from '../context/UserContext';
import { Context as AuthContext } from '../context/AuthContext';
import { navigate } from '../../navigationRef';
import { withNamespaces } from 'react-i18next';
const EditPersonalDetailsScreen = ({ navigation, t }) => {
    const { state, editUserDetails, getUserDetails, dispatch } = useContext(UserContext);
    const { changemobilesendsms, changemobileverifysms } = useContext(AuthContext);

    let [previousMobile, setPreviousMobile] = useState('');
    let [mobile, setMobile] = useState('');
    let [fullName, setFullName] = useState('');
    let [email, setEmail] = useState('');
    let [mobileStyle, setMobileStyle] = useState(styles.inputStyle);
    let [fullNameStyle, setFullNameStyle] = useState(styles.inputStyle);
    let [emailStyle, setEmailStyle] = useState(styles.inputStyle);
    let [mobilePlaceholderStyle, setMobilePlaceholderStyle] = useState(styles.placeholder);
    let [fullNamePlaceholderStyle, setFullNamePlaceholderStyle] = useState(styles.placeholder);
    let [emailPlaceholderStyle, setEmailPlaceholderStyle] = useState(styles.placeholder);
    // let [userAddress, setUserAddress] = useState('');
    let [dob, setDob] = useState(new Date());
    let [gender, setGender] = useState('');
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    //dateofbirth Section
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    useEffect(() => {
        setMobile(state.userDetails.mobile.toString());
        setPreviousMobile(state.userDetails.mobile.toString());
        setFullName(state.userDetails.fullName);
        setEmail(state.userDetails.email);
        if (state.userDetails.dateOfBirth != null)
            setDob(new Date(state.userDetails.dateOfBirth));
        setGender(state.userDetails.gender);
    }, [state.userDetails]);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDob(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const handleMobileChange = (mobile) => {
        const filteredmobile = mobile.replace(/\D/gm, '');
        setMobile(filteredmobile);
        if (mobile.length != 12) {
            console.log("Mobile is Not Correct");
            setMobileStyle(styles.inputStyleError);
            setMobilePlaceholderStyle('#ffcccb');
            return false;
        }
        else {
            console.log("FullName is Correct");
            setMobileStyle(styles.inputStyle);
            setMobilePlaceholderStyle('#aaa');
            return true;
        }
    }
    const handleFullNameChange = (fullnm) => {
        setFullName(fullnm);
        if (fullnm.length < 5) {
            console.log("FullName is Not Correct");
            setFullNameStyle(styles.inputStyleError);
            setFullNamePlaceholderStyle('#ffcccb');
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
            setEmailPlaceholderStyle('#ffcccb');
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
        if (!mobile || !handleMobileChange(mobile)) {
            setErrortext(t('pleasefillmobile'));
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
        if (!gender) {
            setErrortext(t('pleasefillgender'));
            return;
        }
        setLoading(true);

        if (previousMobile != mobile) {
            //setErrortext("Mobile Number Changer:::Must verify by SMS");
            var otp = Math.floor(1000 + Math.random() * 9000).toString();
            const result = await changemobilesendsms({ mobile: mobile, email: email, otp: otp });
            if (result.status == true && result.data == "Duplicated Mobile") {
                //await dispatch({ type: 'edit_user_details', payload: result });
                setLoading(false);
                setIsRegistraionSuccess(false);
                setErrortext(t('pleaseuseanothermobile'));
                return;
            } else if (result.status == true && result.data == "Duplicated Email") {
                //await dispatch({ type: 'edit_user_details', payload: result });
                setLoading(false);
                setIsRegistraionSuccess(false);
                setErrortext(t('pleaseuseanotheremail'));
                return;
            }
            setLoading(false);
            dispatch({ type: 'update_mobile', payload: "+" + mobile });
            navigate('ChangeMobileVerifyScreen', {
                mobile: mobile,
                otp: otp,
                fullName: fullName,
                email: email,
                dateOfBirth: Moment(dob).format('YYYY-MM-DD'),
                gender: gender,
                language: "Ar"
            });
            //return;
        } else {
            var result = await editUserDetails({
                "mobile": mobile,
                "fullName": fullName,
                "email": email,
                "dateOfBirth": Moment(dob).format('YYYY-MM-DD'),
                "gender": gender,
                "language": "Ar"
            });
            //setTimeout(function () {
            try {
                if (result.status == true && result.data == "Duplicated Mobile") {
                    //await dispatch({ type: 'edit_user_details', payload: result });
                    setLoading(false);
                    setIsRegistraionSuccess(false);
                    setErrortext(t('pleaseuseanothermobile'));
                } else if (result.status == true && result.data == "Duplicated Email") {
                    //await dispatch({ type: 'edit_user_details', payload: result });
                    setLoading(false);
                    setIsRegistraionSuccess(false);
                    setErrortext(t('pleaseuseanotheremail'));
                } else if (result.status == true && result.data == "success") {
                    setLoading(false);
                    setIsRegistraionSuccess(true);
                    console.log('Registration Successful. Please Login to proceed');
                    dispatch({ type: 'edit_user_details', payload: { mobile: mobile, fullName: fullName, email: email, dateOfBirth: dob, gender: gender, language: "En" } });
                    navigation.navigate('SettingNavigator');
                } else {
                    setLoading(false);
                    setErrortext(t('editunsuccessful'));
                }
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        // var result = await editUserDetails({
        //     "mobile": mobile,
        //     "fullName": fullName,
        //     "email": email,
        //     "dateOfBirth": Moment(dob).format('YYYY-MM-DD'),
        //     "gender": gender,
        //     "language": "Ar"
        // });
        // //setTimeout(function () {
        // try {
        //     if (result.status == true && result.data == "Duplicated Email") {
        //         //await dispatch({ type: 'edit_user_details', payload: result });
        //         setLoading(false);
        //         setIsRegistraionSuccess(false);
        //         setErrortext(t('pleaseuseanotheremail'));
        //     } else if (result.status == true && result.data == "success") {
        //         setLoading(false);
        //         setIsRegistraionSuccess(true);
        //         console.log('Registration Successful. Please Login to proceed');
        //         navigation.navigate('SettingNavigator');
        //     } else {
        //         setLoading(false);
        //         setErrortext(t('editunsuccessful'));
        //     }
        // } catch (error) {
        //     setLoading(false);
        //     console.error(error);
        // }
    };
    return (
        <>
            <View style={styles.container}>
                <Loader loading={loading} />
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={{ marginTop: 15 }}>
                        <KeyboardAvoidingView enabled>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={mobileStyle}
                                    onChangeText={(mobile) => { setErrortext(''); handleMobileChange(mobile); }}
                                    placeholder={t('entermobile')}
                                    placeholderTextColor={mobilePlaceholderStyle}
                                    value={mobile}
                                    maxLength={12}
                                    keyboardType='numeric'
                                    // ref={ref => {
                                    //     this._fullnameinput = ref;
                                    // }}
                                    returnKeyType="next"
                                    // onSubmitEditing={() => this._emailinput && this._emailinput.focus()}
                                    blurOnSubmit={false}
                                />
                            </View>
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
                            {/* <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={UserAddress => setUserAddress(UserAddress)}
                                    // underlineColorAndroid="#FFFFFF"
                                    placeholder={t('enteraddress')}
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="sentences"
                                    // ref={ref => {
                                    //     this._addressinput = ref;
                                    // }}
                                    returnKeyType="next"
                                    // onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            </View> */}
                            <View>
                                <View style={styles.SectionStyle}>
                                    <TouchableOpacity onPress={showDatepicker} >
                                        <FontBold mystyle={styles.inputStyle} value={Moment(dob).format('YYYY-MM-DD')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={showDatepicker} >
                                        <Fontisto name="date" size={24} color="#f5c500" style={{ left: 9, top: 9 }} />
                                    </TouchableOpacity>
                                </View>

                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={0}
                                        value={dob}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                        androidMode={"default"}
                                        datePickerBg={{ backgroundColor: 'red' }}

                                    />
                                )}
                            </View>
                            <View style={styles.SectionStyle}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => { setGender('Male') }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <RadioButton value='Male' status={gender == 'Male' ? 'checked' : 'unchecked'} />
                                                <FontBold value={t('male')} mystyle={{ fontSize: 24 }}></FontBold>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <Text>
                                        {'        '}
                                    </Text>
                                    <TouchableOpacity onPress={() => { setGender('Female') }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <RadioButton value='Female' status={gender == 'Female' ? 'checked' : 'unchecked'} />
                                                <FontBold value={t('female')} mystyle={{ fontSize: 24 }}></FontBold>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {
                                errortext != '' ? Toast.show(errortext, Toast.LONG) : null
                                // (<Text style={styles.errorTextStyle}> {errortext} </Text>) : null
                            }
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={handleSubmitButton}>
                                <Text style={styles.buttonTextStyle}>{t('save')}</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};
export default withNamespaces()(EditPersonalDetailsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#7a7a7a',
        alignItems: 'center',
        borderRadius: 7,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 2150,
        height: 50,
        textAlign: 'center'
    },
    buttonTextStyle: {
        color: '#7a7a7a',
        paddingVertical: 10,
        fontSize: 22,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#f5c500',
        fontSize: 20,
        height: 50
    },
    inputStyleError: {
        flex: 1,
        color: 'red',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: 'red',
        fontSize: 20,
        height: 50,

    }
});