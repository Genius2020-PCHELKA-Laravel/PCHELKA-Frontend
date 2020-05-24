import React, { useState, useContext } from 'react';
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
import MapComponent from '../components/MapComponent';
import GooglePlacesInput from '../components/GooglePlacesInput';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from './context/AuthContext';
import { navigate } from '../navigationRef';

const RegisterUserScreen = ({ navigation }) => {
    const { state, register } = useContext(AuthContext);
    let [fullName, setfullName] = useState('');
    let [email, setemail] = useState('');
    let [userAddress, setUserAddress] = useState('');
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    const handleSubmitButton = async () => {
        setErrortext('');
        if (!fullName) {
            setErrortext('Please fill Name');
            return;
        }
        if (!email) {
            setErrortext('Please fill Email');
            return;
        }
        if (!userAddress) {
            setErrortext('Please fill Address');
            return;
        }
        //Show Loader
        setLoading(true);
        var result = await register({
            fullName: fullName, email: email, language: "Ar",
            address: userAddress,
            lat: "-87.8",
            lon: "-99.18",
            details: "sdsad",
            area: "sdsad",
            street: "sadasd",
            buildingNumber: "asdsa",
            apartment: "sadsad"
        });
        //setTimeout(function () {
        try {
            //Hide Loader
            console.log(result);
            // If server response message same as Data Matched
            if (result == true) {
                setLoading(false);
                setIsRegistraionSuccess(true);
                console.log('Registration Successful. Please Login to proceed');
                navigation.navigate('HomeCleaningScreen');

            } else {
                setLoading(false);
                setErrortext('Registration Unsuccessful');
            }
        } catch (error) {
            //Hide Loader
            setLoading(false);
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

            <View style={styles.mainBody}>
                <Loader loading={loading} />
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
                    <View style={{ marginTop: 15 }}>
                        <KeyboardAvoidingView enabled>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={fullName => setfullName(fullName)}
                                    placeholder="Enter Name"
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="sentences"
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
                                    onChangeText={email => setemail(email)}
                                    // underlineColorAndroid="#F6F6F7"
                                    placeholder="Enter Email"
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
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={UserAddress => setUserAddress(UserAddress)}
                                    // underlineColorAndroid="#FFFFFF"
                                    placeholder="Enter Address"
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="sentences"
                                    // ref={ref => {
                                    //     this._addressinput = ref;
                                    // }}
                                    returnKeyType="next"
                                    // onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            </View>
                            {
                                errortext != '' ?
                                    (<Text style={styles.errorTextStyle}> {errortext} </Text>) : null
                            }
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={handleSubmitButton}>
                                <Text style={styles.buttonTextStyle}>REGISTER</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};
export default RegisterUserScreen;

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
        backgroundColor: '#DAA520',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#DAA520',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'white',
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