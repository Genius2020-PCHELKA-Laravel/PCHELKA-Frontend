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
import { navigate } from '../../navigationRef';
import { withNamespaces } from 'react-i18next';
const EditPersonalDetailsScreen = ({ navigation, t }) => {
    const { state, editUserDetails, getUserDetails, dispatch } = useContext(UserContext);
    let [previousMobile, setPreviousMobile] = useState('');
    let [mobile, setMobile] = useState('');
    let [fullName, setFullName] = useState('');
    let [email, setEmail] = useState('');
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
    }, [state.userDetails])
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
    }
    const handleSubmitButton = async () => {
        setErrortext('');
        if (!mobile) {
            setErrortext(t('pleasefillmobile'));
            return;
        }
        if (previousMobile != mobile) {
            setErrortext("Mobile Number Changer:::Must verify by SMS")
            return;
        }
        if (!fullName) {
            setErrortext(t('pleasefillname'));
            return;
        }
        if (!email) {
            setErrortext(t('pleasefillemail'));
            return;
        }
        // if (!dob) {
        //     setErrortext(t('pleasefilldob'));
        //     return;
        // }
        if (!gender) {
            setErrortext(t('pleasefillgender'));
            return;
        }

        // if (!userAddress) {
        //     setErrortext(t('pleasefilladdress'));
        //     return;
        // }
        //Show Loader

        setLoading(true);
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
            if (result == true) {
                //await dispatch({ type: 'edit_user_details', payload: result });
                setLoading(false);
                setIsRegistraionSuccess(true);
                console.log('Edit User Successful. Please Login to proceed');
                navigation.navigate('SettingNavigator');
            } else {
                setLoading(false);
                setErrortext(t('editunsuccessful'));
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };
    return (
        <>
            <View style={styles.mainBody}>
                <Loader loading={loading} />
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={{ marginTop: 15 }}>
                        <KeyboardAvoidingView enabled>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={mobile => handleMobileChange(mobile)}
                                    placeholder={t('entermobile')}
                                    placeholderTextColor="#aaa"
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
                                    style={styles.inputStyle}
                                    onChangeText={fullName => setFullName(fullName)}
                                    placeholder={t('entername')}
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="sentences"
                                    value={fullName}
                                    maxLength={20}
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
                                    style={styles.inputStyle}
                                    onChangeText={email => setEmail(email)}
                                    value={email}
                                    // underlineColorAndroid="#F6F6F7"
                                    placeholder={t('enteremail')}
                                    placeholderTextColor="#aaa"
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
                                        <Fontisto name="date" size={24} color="#FF9800" style={{ left: 9, top: 9 }} />
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
                                <Text style={styles.buttonTextStyle}>{t('edit')}</Text>
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
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#ff9800',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#ff9800',
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        height: 50,
        textAlign: 'center'
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 22,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#ff9800',
        fontSize: 20,
        height: 50
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'green',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});