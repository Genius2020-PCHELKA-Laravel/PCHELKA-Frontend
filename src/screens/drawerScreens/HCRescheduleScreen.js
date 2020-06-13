import React, { useState, useEffect, useContext } from 'react';
import { Text, Image, TextInput, StyleSheet, View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Feather, FontAwesome5, FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { Container, Footer, FooterTab, Button } from 'native-base';
import Toast from 'react-native-simple-toast';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Card, ListItem, CheckBox, Icon, Badge, withBadge } from 'react-native-elements'
import { RadioButton, Avatar } from 'react-native-paper';
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import { Context as HCContext } from '../../screens/context/HCContext';
import { Context as UserContext } from '../../screens/context/UserContext';
import { Slider, Input } from "react-native-elements";
import { withNamespaces } from 'react-i18next';
import Loader from '../../components/Loader';
import { navigate } from '../../navigationRef';
import ModalDetails from './ModalDetails'
const HCRescheduleScreen = ({ children, t }) => {
    const { dispatch: hcdispatch, state: hcstate, getSchedules } = useContext(HCContext);
    const { dispatch: udispatch, state: ustate } = useContext(UserContext);
    //const [day, setDay] = useState(hcstate.selectedday);
    const [selectedDay, setSelectedDay] = useState(hcstate.selectedupcoming.duoDate);
    const [start, setStart] = useState(hcstate.selectedupcoming.duoTime);
    const [providerid, setProviderid] = useState(hcstate.selectedupcomingproviderdata.id);
    const [autoassign, setAutoassign] = useState(hcstate.autoassign);
    const [isloading, setIsLoading] = useState(false);

    let days_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const isInArray = (array, value) => {
        return (array.find(item => { return item == value }) || []).length > 0;
    }

    useEffect(() => {
        let isCancelled1 = false;
        if (!isCancelled1)
            hcdispatch({
                type: 'set_providerid',
                payload: providerid,
            });
        return () => {
            isCancelled1 = true;
        };
    }, [providerid]);
    useEffect(() => {
        let isCancelled2 = false;
        if (!isCancelled2)
            hcdispatch({
                type: 'set_autoassign',
                payload: autoassign,
            });
        return () => {
            isCancelled2 = true;
        };
    }, [autoassign]);
    useEffect(() => {
        console.log('Day::hcstate.selectedday' + hcstate.selectedday);
        console.log('Day::hcstate.start' + hcstate.start);
        console.log('Day::selectedDay' + selectedDay);
        console.log('Day::start' + start);
        let isCancelled3 = false;
        if (!isCancelled3)
            hcdispatch({
                type: 'set_selectedday',
                payload: selectedDay,
            });
        return () => {
            isCancelled3 = true;
        };
    }, [selectedDay]);
    useEffect(() => {
        console.log('start::hcstate.selectedday' + hcstate.selectedday);
        console.log('start::hcstate.start' + hcstate.start);
        console.log('start::selectedDay' + selectedDay);
        console.log('start::start' + start);
        let isCancelled4 = false;
        if (!isCancelled4)
            hcdispatch({
                type: 'set_start',
                payload: start,
            });
        return () => {
            isCancelled4 = true;
        };
    }, [start]);
    useEffect(() => {
        getSchedules({ id: providerid }).then((response) => {
            console.log("HCRescheduleScreen::schedules");
            console.log(response);
            //console.log(response.filter((e) => e.serviceProviderId == 1 && e.availableDate == "2020-05-31"))
        }).catch((error) => {
            console.log("Error::HCRescheduleScreen::schedules");
            console.log(error);
        });
        let isCancelled5 = false;

        if (!isCancelled5)
            hcdispatch({ type: 'set_frequency', payload: hcstate.selectedupcoming.frequency, });
        if (!isCancelled5)
            hcdispatch({ type: 'set_hours', payload: hcstate.selectedupcoming.hoursNeeded, });
        if (!isCancelled5)
            hcdispatch({ type: 'set_cleaners', payload: hcstate.selectedupcoming.cleanerCount, });
        // var materialpricepaid = hcstate.selectedupcoming.hoursNeeded * hcstate.selectedupcoming.requireMaterial * hcstate.HC.materialPrice;
        if (!isCancelled5)
            hcdispatch({ type: 'set_materials', payload: hcstate.selectedupcoming.requireMaterial, });
        if (!isCancelled5)
            hcdispatch({ type: 'update_totals', payload: { total: (hcstate.selectedupcoming.totalAmount).toFixed(2), subtotal: (hcstate.selectedupcoming.subTotal).toFixed(2), discount: (hcstate.selectedupcoming.discount).toFixed(2) }, });
        if (!isCancelled5)
            udispatch({ type: 'set_selected_address_name', payload: hcstate.selectedupcoming.addressDetails.address, });

        return () => {
            isCancelled5 = true;
        };
    }, []);
    useEffect(() => {
        let isCancelled6 = false;
        if (!isCancelled6)
            setIsLoading(true);
        getSchedules({ id: providerid }).then((response) => {
            console.log("HCRescheduleScreen::schedules");
            if (!isCancelled6)
                setIsLoading(false);
            console.log(response);
            //console.log(response.filter((e) => e.serviceProviderId == 1 && e.availableDate == "2020-05-31"))
        }).catch((error) => {
            console.log("Error::HCRescheduleScreen::schedules");
            console.log(error);
            if (!isCancelled6)
                setIsLoading(false);
        });
        return () => {
            isCancelled6 = true;
        };
    }, [providerid]);
    /////////////////////
    //dayes
    ///////////////////
    var days = [];
    const date = new Date();
    for (let i = 1; i < 15; i++) {
        const newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);
        // (d.getDate() < 10 ? '0' : '') + d.getDate
        let fdate = newDate.getFullYear().toString() +
            '-' + ((newDate.getMonth() + 1 < 10 ? '0' : '') + (newDate.getMonth() + 1)).toString() +
            '-' + ((newDate.getDate() < 10 ? '0' : '') + (newDate.getDate())).toString();
        var controlstyles = false;

        if (hcstate.providerid != '') {
            const availabledates = [];
            hcstate.schedules.filter((e) => e.serviceProviderId == hcstate.providerid).map((u, i) => {
                availabledates[i] = u.availableDate;
            });
            const uniqueNDates = Array.from(new Set(availabledates));
            var controlstyles = isInArray(uniqueNDates, fdate) ? false : true;
        }
        days.push(
            <TouchableOpacity key={fdate} onPress={() => {
                setSelectedDay(fdate);
                setStart('');
                hcdispatch({
                    type: 'set_selectedday',
                    payload: fdate,
                });
                hcdispatch({
                    type: 'set_start',
                    payload: '',
                });
            }}
                disabled={controlstyles}>
                <View style={styles.cloumn}>
                    <View style={styles.item1}>
                        <FontRegular mystyle={{}} value={days_names[(newDate.getDay()) % 7]} />
                    </View>
                    <View style={styles.item2}>
                        <Text style={controlstyles ? styles.notactive : selectedDay == fdate ? styles.thumbdown : styles.thumbup}>{newDate.getDate()}</Text>
                        <View style={controlstyles ? styles.diagonaline : null}></View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    /////////////////////
    //starts
    ///////////////////
    var starts = [];
    //const date = new Date();
    for (let i = 0; i < 21; i++) {
        const newDateStart = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);
        let fdate = newDateStart.getFullYear().toString() +
            '-' + ((newDateStart.getMonth() + 1 < 10 ? '0' : '') + (newDateStart.getMonth() + 1)).toString() +
            '-' + ((newDateStart.getDate() < 10 ? '0' : '') + (newDateStart.getDate())).toString();
        let fhour = i == 0 || i == 1 ? "08" : i == 2 || i == 3 ? "09" : i == 4 || i == 5 ? "10" :
            i == 6 || i == 7 ? "11" : i == 8 || i == 9 ? "12" : i == 10 || i == 11 ? "13" :
                i == 12 || i == 13 ? "14" : i == 14 || i == 15 ? "15" : i == 16 || i == 17 ? "16" :
                    i == 18 || i == 19 ? "17" : i == 20 || i == 21 ? "18" : "";
        let fminute = i % 2 == 0 ? "00" : "30";
        let fstart = fhour + ":" + fminute + ":00";
        var timecontrolstyles = false;

        const timeStarts = [];
        if (hcstate.providerid != '') {
            hcstate.schedules.filter((e) => { return (e.serviceProviderId == hcstate.providerid && e.availableDate == hcstate.selectedday) }).map((u, i) => {
                timeStarts[i] = u.timeStart;
            });
            console.log(timeStarts);
            //const uniqueNStarts = Array.from(new Set(timeStarts));

            var timecontrolstyles = isInArray(timeStarts, fstart) ? false : true;
            var previousstartstyle = (hcstate.selectedupcoming.duoTime == fstart && hcstate.selectedupcoming.duoDate == selectedDay);
            // for (var j = 0; j < parseInt(hcstate.hours); j++) {
            //     timecontrolstyles = isInArray(timeStarts, fstart) ? false : true;
            // }
        }
        starts.push(
            <TouchableOpacity key={fstart} onPress={() => {
                if (providerid != '') {
                    var selectedhour = fstart.split(':')[0];
                    var selectedminute = fstart.split(':')[1];
                    var limithour = parseInt(selectedhour) + parseInt(hcstate.hours);
                    for (var j = parseInt(selectedhour); j <= limithour; j++) {
                        var limit = '';
                        if (j < 10)
                            limit = '0' + j + ':' + selectedminute + ':' + '00';
                        else
                            limit = j + ':' + selectedminute + ':' + '00';
                        console.log(j + " limit: " + limit);
                        if (isInArray(timeStarts, limit) ? false : true) {
                            Toast.show('You selected ' + hcstate.hours + ' hours' + '\n select Another time please', Toast.LONG);
                            return;
                        }
                    }
                }
                hcdispatch({ type: 'set_start', payload: fstart });
                setStart(fstart);
            }}
                disabled={timecontrolstyles}>
                <View>
                    <Text style={previousstartstyle ? styles.timenotactiveprevious : timecontrolstyles ? styles.timenotactive : start == fstart ? styles.timethumbdown : styles.timethumbup}>{fstart}</Text>
                    <View style={previousstartstyle ? styles.timediagonalineprevious : timecontrolstyles ? styles.timediagonaline : null}></View>
                </View>
            </TouchableOpacity>
        )
    }
    const defaultScrollViewProps = {
        keyboardShouldPersistTaps: 'handled',
        contentContainerStyle: {
            flex: 1,
            justifyContent: 'center',
        }
    };
    return (
        <>
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <Loader loading={isloading} />
                <ProgressSteps
                    activeStepIconBorderColor='#f5c500'
                    activeLabelColor='#f5c500'
                    completedProgressBarColor='#f5c500'
                    completedStepIconColor='#f5c500'
                    labelFontFamily=''
                    backgroundColor='#fff'
                    activeStep={2}>
                    <ProgressStep
                        label={'    ' + t('frequency')}
                        // onNext={onFrequencyStepComplete}
                        // onPrevious={onPrevStep}
                        scrollViewProps={defaultScrollViewProps}
                        nextBtnTextStyle={styles.ButtonTextStyle}
                        nextBtnStyle={styles.nextButtonStyle}
                        nextBtnText={t('next')}
                        previousBtnText={t('previous')}
                        finishBtnText={t('submit')}
                        isComplete={true}
                    >
                    </ProgressStep>
                    <ProgressStep
                        label={t('cleaning')}
                        // onNext={onCleaningDetailsComplete}
                        // onPrevious={onPrevStep}
                        scrollViewProps={defaultScrollViewProps}
                        nextBtnTextStyle={styles.ButtonTextStyle}
                        nextBtnStyle={styles.nextButtonStyle}
                        previousBtnStyle={styles.previousButtonStyle}
                        previousBtnTextStyle={styles.ButtonTextStyle}
                        nextBtnText={t('next')}
                        previousBtnText={t('previous')}
                        finishBtnText={t('submit')}
                        isComplete={true}
                    >
                    </ProgressStep>
                    <ProgressStep
                        label={t('date')}
                        // onNext={onDateTimeStepComplete}
                        // onPrevious={onPrevStep}
                        scrollViewProps={defaultScrollViewProps}
                        nextBtnTextStyle={styles.ButtonTextStyle}
                        nextBtnStyle={styles.nextButtonStyle}
                        previousBtnStyle={styles.previousButtonStyle}
                        previousBtnTextStyle={styles.ButtonTextStyle}
                        nextBtnText={t('next')}
                        previousBtnText={t('previous')}
                        finishBtnText={t('submit')}
                        previousBtnDisabled
                        nextBtnDisabled
                    >

                        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} showsVerticalScrollIndicator={false}>
                            <Loader loading={isloading} />
                            {
                                hcstate.selectedupcoming.serviceType == "HomeCleaning" ?
                                    <FontBold mystyle={styles.qText} value={t('dateq0')} /> :
                                    hcstate.selectedupcoming.serviceType == "BabysitterService" ?
                                        <FontBold mystyle={styles.qText} value={t('babydateq0')} /> : null

                            }

                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', left: 15 }}>
                                {/* redering Auto-Assign */}
                                <TouchableOpacity style={providerid == '' ? styles.providerThumdown : styles.providerThumup}
                                    onPress={() => {
                                        setSelectedDay('');
                                        setStart('');
                                        hcdispatch({
                                            type: 'set_selectedday',
                                            payload: '',
                                        });
                                        hcdispatch({
                                            type: 'set_start',
                                            payload: '',
                                        });
                                        console.log('AutoAssign::hcstate.selectedday' + hcstate.selectedday);
                                        console.log('AutoAssign::hcstate.start' + hcstate.start);
                                        console.log('AutoAssign::selectedDay' + selectedDay);
                                        console.log('AutoAssign::start' + start);
                                        setAutoassign(1);
                                        setProviderid('');
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                        <Image style={providerid == "" ? styles.imageThumdown : styles.imageThumup} source={require('../../../assets/Splash/SplashScreen1.png')} />
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                        <FontBold mystyle={{ fontSize: 10, marginLeft: 5 }} value={t('autoassign')} />

                                    </View>
                                    <FontRegular mystyle={{ color: "#000", fontSize: 12, marginLeft: 5 }} value={t('wewillassignthebestcleaner')} />
                                </TouchableOpacity>

                                {/* redering the providers */}


                                {/* hcstate.selectedupcomingproviderdata.map((u, i) => { */}

                                <TouchableOpacity key={hcstate.selectedupcomingproviderdata.id} style={providerid == hcstate.selectedupcomingproviderdata.id ? styles.providerThumdown : styles.providerThumup}
                                    onPress={() => {
                                        setIsLoading(true);
                                        setSelectedDay('');
                                        setStart('');
                                        hcdispatch({
                                            type: 'set_selectedday',
                                            payload: '',
                                        });
                                        hcdispatch({
                                            type: 'set_start',
                                            payload: '',
                                        });
                                        console.log('Provider::hcstate.selectedday' + hcstate.selectedday);
                                        console.log('Provider::hcstate.start' + hcstate.start);
                                        console.log('Provider::selectedDay' + selectedDay);
                                        console.log('Provider::start' + start);
                                        setAutoassign(0);
                                        setProviderid(hcstate.selectedupcomingproviderdata.id);
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>

                                        <Image
                                            source={{ uri: hcstate.selectedupcomingproviderdata.imageUrl }}
                                            style={providerid == hcstate.selectedupcomingproviderdata.id ? styles.imageThumdown : styles.imageThumup}
                                        />
                                        {
                                            <Badge
                                                status="success"
                                                badgeStyle={{ width: 15, height: 15, borderRadius: 10, borderColor: '#fff', borderWidth: 1 }}
                                                containerStyle={{ position: 'absolute', top: 5, right: 22, }}
                                            />
                                        }

                                        {/* {
                                            u.count < 0 ?
                                                null :
                                                u.count > 0 ?
                                                    <Badge
                                                        status="success"
                                                        badgeStyle={{ width: 15, height: 15, borderRadius: 10, borderColor: '#fff', borderWidth: 1 }}
                                                        containerStyle={{ position: 'absolute', top: 5, right: 22, }}
                                                    />
                                                    : u.count == 0 ?
                                                        <Badge
                                                            status="error"
                                                            badgeStyle={{ width: 15, height: 15, borderRadius: 10, borderColor: '#fff', borderWidth: 1 }}
                                                            containerStyle={{ position: 'absolute', top: 5, right: 22 }}
                                                        />
                                                        : null
                                        }  */}
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                        <FontBold mystyle={{ fontSize: 10 }} value={hcstate.selectedupcomingproviderdata.name} />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                        {
                                            hcstate.selectedupcomingproviderdata.evaluation >= 4 ?
                                                <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                :
                                                <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{ top: 3 }} />
                                        }
                                        <Text>{' '}</Text>
                                        {
                                            <FontRegular mustyle={{ fontSize: 11, padding: 0 }} value={hcstate.selectedupcomingproviderdata.evaluation} />
                                        }
                                    </View>
                                    {
                                        hcstate.selectedupcomingproviderdata.lastServiceDate != null ?
                                            <View>
                                                <View style={{ flexDirection: "row", justifyContent: "flex-start", marginLeft: 5, marginRight: 5 }}>
                                                    <FontRegular mystyle={{ color: "#000", fontSize: 12 }} value={t('lastservedat')} />
                                                </View>
                                                <View style={{ flexDirection: "row", justifyContent: "center", marginLeft: 5, marginRight: 5 }}>
                                                    <FontRegular mystyle={{ color: "#000", fontSize: 12 }} value={hcstate.selectedupcomingproviderdata.lastServiceDate} />
                                                </View>
                                            </View>
                                            : null
                                    }
                                </TouchableOpacity>
                            </ScrollView>
                            <Spacer />
                            {
                                hcstate.selectedupcoming.serviceType == "HomeCleaning" ?
                                    <FontBold mystyle={styles.qText} value={t('dateq1')} /> :
                                    hcstate.selectedupcoming.serviceType == "BabysitterService" ?
                                        <FontBold mystyle={styles.qText} value={t('babydateq1')} /> : null

                            }
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', left: 15, marginRight: 15 }}>
                                {days}
                            </ScrollView>

                            <Spacer />
                            <FontBold mystyle={styles.qText} value={t('dateq2')} />
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', left: 15, marginRight: 15 }}>
                                {starts}
                            </ScrollView>
                        </ScrollView >
                    </ProgressStep>
                    <ProgressStep
                        label={t('address')}
                        // onNext={onAddressStepComplete}
                        // onPrevious={onPrevStep}
                        // onSubmit={onSubmitSteps}
                        scrollViewProps={defaultScrollViewProps}
                        nextBtnTextStyle={styles.ButtonTextStyle}
                        nextBtnStyle={styles.nextButtonStyle}
                        previousBtnStyle={styles.previousButtonStyle}
                        previousBtnTextStyle={styles.ButtonTextStyle}
                        nextBtnText={t('next')}
                        previousBtnText={t('previous')}
                        finishBtnText={t('submit')}>
                    </ProgressStep>
                    <ProgressStep
                        label={t('payment') + '  '}
                        // onPrevious={onPrevStep}
                        // onSubmit={onSubmitSteps}
                        scrollViewProps={defaultScrollViewProps}
                        nextBtnTextStyle={styles.ButtonTextStyle}
                        nextBtnStyle={styles.nextButtonStyle}
                        previousBtnStyle={styles.previousButtonStyle}
                        previousBtnTextStyle={styles.ButtonTextStyle}
                        nextBtnText={t('next')}
                        previousBtnText={t('previous')}
                        finishBtnStyle={styles.nextButtonStyle}
                        finishBtnTextStyle={styles.ButtonTextStyle}
                        finishBtnText={t('submit')}>
                    </ProgressStep>
                </ProgressSteps>
                <TouchableOpacity
                    style={styles.mynextButtonStyle}
                    activeOpacity={0.5}
                    onPress={() => {
                        navigate('HCRescheduleReduced');
                    }}>
                    <FontBold mystyle={styles.mybuttonTextStyle} value={t('next')} />
                </TouchableOpacity>
                <ModalDetails style={styles.modalText} total={hcstate.total}></ModalDetails>
            </View>
        </>
        //          <View style={styles.ourpolicycontainer}>
        //                 <AntDesign style={{ marginBottom: 5 }} name="warning" size={30} color="#d21404" />
        //                 <FontLight mystyle={{ fontSize: 16 }} value={t('ourpolicydoc')} />
        //                 <View style={styles.container}>
        //                     <TouchableOpacity
        //                         style={styles.policybuttonStyle}
        //                         activeOpacity={0.5}
        //                         onPress={() => {
        //                             navigate('ReschedulePolicy');
        //                         }}>
        //                         <FontLight mystyle={{ color: "blue" }} value={t('viewourpolicy')} />
        //                     </TouchableOpacity>
        //                 </View>

        //             </View> 
        // <TouchableOpacity
        //     style={styles.reschedulebuttonStyle}
        //     activeOpacity={0.5}
        //     onPress={() => {
        //         navigate('HCReschedule');
        //     }}>
        //     <FontBold mystyle={styles.buttonTextStyle} value={t('reschedule')} />
        // </TouchableOpacity> 
    );
};

const styles = StyleSheet.create({
    cloumn: {
        marginTop: 0,
        flex: 1,
        alignItems: 'center' // if you want to fill rows left to right
    },
    item1: {
        height: '30%' // is 50% of container width
    },
    item2: {
        height: '70%' // is 50% of container width
    },
    qText: {
        fontSize: 20,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 7
    },
    aText: {
        fontSize: 12,
        textAlign: 'center',
    },
    thumb: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'white',
        borderColor: '#f5c500',
        borderWidth: 2,
    },
    thumbup: {
        fontSize: 24,
        padding: 7,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: 'white',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    thumbdown: {
        fontSize: 24,
        padding: 7,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#f5c500aa',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    notactive: {
        fontSize: 24,
        padding: 7,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#dcdcdc',
        borderColor: '#aaa',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4,
        color: "#7a7a7a"

    },
    timethumbup: {
        fontSize: 20,
        padding: 7,
        width: 65,
        height: 40,
        borderRadius: 65 / 2,
        backgroundColor: 'white',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    timethumbdown: {
        fontSize: 20,
        padding: 7,
        width: 65,
        height: 40,
        borderRadius: 65 / 2,
        backgroundColor: '#f5c500aa',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    timenotactive: {
        display: 'none',
        fontSize: 20,
        padding: 7,
        width: 65,
        height: 40,
        borderRadius: 65 / 2,
        backgroundColor: '#dcdcdc',
        borderColor: '#aaa',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4,
        color: "#7a7a7a"
    },
    timenotactiveprevious: {
        // display: 'none',
        fontSize: 20,
        padding: 7,
        width: 65,
        height: 40,
        borderRadius: 65 / 2,
        backgroundColor: '#ffcccb',
        borderColor: '#aaa',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4,
        color: "#7a7a7a"

    },
    providerThumup: {
        backgroundColor: '#fff',
        width: 120,
        height: 170,
        borderColor: "#f5c500aa",
        borderRadius: 4,
        borderWidth: 2,
        marginRight: 10,
    },
    providerThumdown: {
        backgroundColor: '#f5c500aa',
        width: 120,
        height: 170,
        borderColor: "#f5c500",
        borderRadius: 2,
        borderWidth: 4,
        marginRight: 10,
    },
    imageThumup: {
        width: 80,
        height: 80,
        borderRadius: 45,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 3,
        borderColor: "#f5c500",
        opacity: 1,

    },
    imageThumdown: {
        width: 80,
        height: 80,
        borderRadius: 45,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 3,
        borderColor: "#fff",
        opacity: 1,

    },

    diagonaline: {
        position: 'absolute',
        transform: [{ rotate: '-45deg' }],
        right: 2,
        top: 22,
        width: 60,
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 2,
    },
    timediagonaline: {
        position: 'absolute',
        transform: [{ rotate: '-45deg' }],
        right: 2,
        top: 22,
        width: 80,
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 2,
    },
    timediagonalineprevious: {
        position: 'absolute',
        transform: [{ rotate: '-45deg' }],
        right: 2,
        top: 22,
        width: 80,
        borderBottomColor: '#ffcccb',
        borderBottomWidth: 2,
    },
    ourpolicycontainer: {
        margin: 15,
        borderWidth: 1,
        borderColor: "#7a7a7a",
        padding: 15,
    },
    reschedulebuttonStyle: {
        position: 'absolute',
        bottom: 15,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#7a7a7a',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        color: '#7a7a7a',
        paddingVertical: 10,
        fontSize: 22,
    },
    mynextButtonStyle: {
        position: 'absolute',
        bottom: 58,
        right: 15,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        // fontFamily: 'Comfortaa-Bold',
        width: '25%',
        paddingVertical: 10,
        alignItems: "center"
    },
    myButtonTextStyle: {
        color: '#7a7a7a',
        fontSize: 20,
        textAlign: "center"
    },
    nextButtonStyle: {
        display: 'none',
        top: 0,
        right: -50,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        // fontFamily: 'Comfortaa-Bold',
        width: '100%'
    },
    previousButtonStyle: {
        display: 'none',
        top: 0,
        left: -50,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        // fontFamily: 'Comfortaa-Bold',
        width: '100%'

    },
    // notactive: {
    //     transform: [{ rotate: '-45deg' }],
    //     borderBottomColor: 'gray',
    //     borderBottomWidth: 1,
    // }
});

export default withNamespaces()(HCRescheduleScreen);