import React, { Component, useState, useContext, useEffect } from 'react';
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Context as HCContext } from '../screens/context/HCContext';
import { Context as UserContext } from '../screens/context/UserContext';
import Spacer from '../components/Spacer';
import FontBold from '../components/FontBold';
import FontLight from '../components/FontLight';
import FontRegular from '../components/FontRegular';
import { withNamespaces } from 'react-i18next';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { getLang } from '../api/userLanguage';
import Loader from '../components/Loader';
import { Avatar } from 'react-native-elements';
import { Notifications } from 'expo';
import Toast from 'react-native-simple-toast';
import { navigate } from "../navigationRef";

const EvaluationDialog = ({ navigation, t, modalVisible, setModalVisible, providerImageURL, bookingID, bookingRefCode, origin, notificationId }) => {
    // const [modalVisible, setModalVisible] = useState(false);
    const { state: hcstate, evaluation } = useContext(HCContext);
    const { state: ustate } = useContext(UserContext);
    const [lang, setLang] = useState('en');
    const [reviews_names, set_reviews_names] = useState('');
    const [isloading, setIsLoading] = useState(false);

    // const fetchLang
    useEffect(() => {
        let en_reviews_names = ['Terrible', 'Bad', 'Okay', 'Good', 'Great'];
        let ru_reviews_names = ['ужасный', 'Плохой', 'Ладно', 'Хорошо', 'большой'];
        getLang().then((response) => {
            if (response === 'ru')
                set_reviews_names(ru_reviews_names)
            else if (response === 'en' || typeof response === 'undefined')
                set_reviews_names(en_reviews_names);
        });
    }, []);


    const ratingCompleted = async (rating) => {
        // alert("Rating is: " + rating);
        setIsLoading(true);
        await evaluation({
            bookId: bookingID,
            starCount: rating
        }).then(() => {
            //remove the notification from statusbar
            Notifications.dismissNotificationAsync(notificationId);
            console.log("evaluated:: " + rating);
            setModalVisible(false);
            setIsLoading(false);
            if (origin === "selected")
                navigate("Past");

        }).catch((error) => {
            console.log(error);
            setModalVisible(false);
            setIsLoading(false);
            Toast.show(t('notevaluated') + error, Toast.LONG);
        });
    }

    return (
        <View style={{ marginTop: 0 }}>
            <Loader loading={isloading} />
            <Modal
                style={{ flex: 1, margin: 0 }}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={1200}
                animationOutTiming={600}
                avoidKeyboard={true}
                backdropColor='transparent'
                transparent={true}
                isVisible={modalVisible}
                hideModalContentWhileAnimating={false}
                coverScreen={true}
                onBackButtonPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                swipeThreshold={200}
                swipeDirection="down"
                onRequestClose={() => {
                    // alert('Modal has been closed.');
                }}>

                <View>
                    <TouchableOpacity
                        style={{ position: "absolute", right: 0, padding: 15, zIndex: 20 }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <FontBold value={t('skip')} mystyle={{ fontSize: 24, color: "#fff" }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.container} >
                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                        <Spacer>
                            <FontRegular
                                value={t('yourorder') + " \"" + bookingRefCode + "\" " + t('hasbeencompleted')}
                                mystyle={{ fontSize: 20, color: "#fff", textAlign: "center" }}
                            />
                        </Spacer>
                    </View>
                    <Spacer />
                    <Spacer />
                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                        <Avatar
                            rounded
                            size="large"
                            title={bookingRefCode}
                            source={{
                                uri:
                                    providerImageURL,
                            }}
                            containerStyle={{}}
                        />
                    </View>
                    <View style={{}}>
                        <AirbnbRating
                            count={5}
                            reviews={reviews_names}
                            onFinishRating={ratingCompleted}
                            defaultRating={3}
                            size={45}
                        />
                    </View>
                </View>
            </Modal>
            {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(true);
                    }} style={styles.modalButtonStyle}>
                    <View flexDirection='row'>

                        <View flexDirection='column' style={{ justifyContent: 'center' }}>
                            <FontBold value="Evaluate" />
                        </View>
                    </View>

                </TouchableOpacity>
            </View> */}

        </View >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7a7a7aee",
        flexDirection: 'column',
        justifyContent: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '50%' // is 50% of container width
    },
    modalText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 12,
        padding: 0,
    },
    modalButtonStyle: {
        flex: 0.4,
        bottom: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 0,
        borderColor: '#7a7a7a',
        color: '#7a7a7a',
        height: 35,
        // fontFamily: 'Comfortaa-Bold',
    },

});
export default withNamespaces()(EvaluationDialog);