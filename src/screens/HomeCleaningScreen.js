import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Frequency from '../components/HomeCleaningSteps/Frequency';
import HomeCleaningDetails from '../components/HomeCleaningSteps/HomeCleaningDetails';
import DateandTimeDetails from '../components/HomeCleaningSteps/DateandTimeDetails';
import AddressDetails from '../components/HomeCleaningSteps/AddressDetails';
import Payment from '../components/HomeCleaningSteps/Payment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import ModalDetails from '../components/HomeCleaningSteps/ModalDetails';
import { Context as UserContext } from './context/UserContext';
import { Context as HCContext } from './context/HCContext';
import { withNamespaces } from 'react-i18next';
import Toast from 'react-native-simple-toast';
import { navigate } from '../navigationRef';
import Loader from '../components/Loader';
const HomeCleaningScreen = ({ navigation, t }) => {
  // static navigationOptions = {
  //   headerShown: false
  // };
  const { state: hcstate, HCBooking, dispatch, getProviders, getSchedules, pay } = useContext(HCContext);
  const { state } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  // const [hourPrice, setHourPrice] = useState(0);
  // const [hourMaterialPrice, setHourMaterialPrice] = useState(0);

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    }
  };
  useEffect(() => {
    console.log("HomeCleaningScreen::UseEffect::gethourprice");
    console.log("HomeCleaningScreen::UseEffect::State hour price:: " + hcstate.HC.name)

    console.log("HomeCleaningScreen::UseEffect::gethourprice");
    console.log("HomeCleaningScreen::UseEffect::State hour price:: " + hcstate.HC.hourPrice)

    console.log("HomeCleaningScreen::UseEffect::gethourmaterialprice");
    console.log("HomeCleaningScreen::UseEffect::State hour material price:: " + hcstate.HC.materialPrice);
    getProviders({ serviceType: 'HomeCleaning' }).then((response) => {
      console.log("HomeCleaniningScreen::Providers");
      console.log(response);
    }).catch((error) => {
      console.log("Error::HomeCleaniningScreen::Providers");
      console.log(error);
    });

    // getSchedulesDays({ id: 1 }).then((response) => {
    //   console.log("HomeCleaniningScreen::schedules");
    //   console.log(response);
    // }).catch((error) => {
    //   console.log("Error::HomeCleaniningScreen::schedules");
    //   console.log(error);
    // });
    // getSchedules().then((response) => {
    //   console.log("HomeCleaniningScreen::schedules");
    //   //console.log(response);
    //   //console.log(response.filter((e) => e.serviceProviderId == 1 && e.availableDate == "2020-05-31"))
    // }).catch((error) => {
    //   console.log("Error::HomeCleaniningScreen::schedules");
    //   console.log(error);
    // });

  }, []);
  useEffect(() => {
    // const availabledates = [];
    // hcstate.schedules.filter((e) => e.serviceProviderId == hcstate.providerid).map((u, i) => {
    //   availabledates[i] = u.availableDate;
    // });
    // const uniqueNDates = Array.from(new Set(availabledates));
    // console.log("#########Unique dates:");
    // console.log(uniqueNDates);
  }, [hcstate.providerid]);

  const onFrequencyStepComplete = () => {
    console.log('state.frequency:: ' + hcstate.frequency);
  };
  const onCleaningDetailsComplete = () => {
    console.log('hcstate.hours ' + hcstate.hours);
    console.log('hcstate.cleaners ' + hcstate.cleaners);
    console.log('hcstate.materials ' + hcstate.materials);
    console.log('hcstate.desc ' + hcstate.desc);
  };
  const onDateTimeStepComplete = () => {
    console.log('hcstate.providerid ' + hcstate.providerid);
    console.log('hcstate.autoassign ' + hcstate.autoassign);
    console.log('hcstate.selectedday::hcstate.start ' + hcstate.selectedday + '  ' + hcstate.start);
    if (hcstate.selectedday == '') {
      Toast.show('Select date please', Toast.LONG);
      return;
    }
    if (hcstate.start == '') {
      Toast.show('Select time please', Toast.LONG);
      return;
    }
  };
  const onAddressStepComplete = () => {
    console.log('state.selected_address_name:: ' + state.selected_address_name);
    if (state.selected_address == '') {
      Toast.show('Select address please', Toast.LONG);
      return;
    }
  };

  const onPrevStep = () => {
    console.log('called previous step');
  };

  const onSubmitSteps = async () => {
    setIsLoading(true);
    console.log('hcstate.method:: ' + hcstate.method);
    // console.log('hcstate.selectedday:: ' + hcstate.selectedday);
    if (hcstate.method == 0 && hcstate.valid == false) {
      Toast.show('Your card number not valid', Toast.LONG);
      setIsLoading(false);
      return;
    }
    var oid = '';
    if (hcstate.method == 0 && hcstate.valid == true) {
      oid = "order_id_" + Math.floor(1000000000000 + Math.random() * 9000000000000);
      var result = await pay({
        order_id: oid,
        card: hcstate.card.replace(/\s/g, ''),
        card_exp_month: hcstate.card_exp_month,
        card_exp_year: hcstate.card_exp_year,
        card_cvv: hcstate.card_cvv,
        amount: hcstate.subtotal,
        description: hcstate.selectedday + "  " + oid + " " + hcstate.desc
      }).then((response) => {
        console.log("###################" + JSON.stringify(response));
        console.log("HomeCleaningScreen::paid");
      }).catch(() => {
        console.log("HomeCleaningScreen::NOTpaid" + error);
        setIsLoading(false);
        return;
      });
      console.log(result);
      if (!result) {
        setIsLoading(false);
        return;
      }


    }
    if (state.selected_address == '') {
      Toast.show('Select address please', Toast.LONG);
      setIsLoading(false);
      return;
    }
    if (hcstate.selectedday == '') {
      Toast.show('Select date please', Toast.LONG);
      setIsLoading(false);
      return;
    }
    if (hcstate.start == '') {
      Toast.show('Select time please', Toast.LONG);
      setIsLoading(false);
      return;
    }
    if (hcstate.method == -1) {
      Toast.show('Select payment method please', Toast.LONG);
      setIsLoading(false);
      return;
    }
    var frequency = -1;
    if (hcstate.frequency == 1) frequency = 'One-time';
    if (hcstate.frequency == 2) frequency = 'Bi-weekly';
    if (hcstate.frequency == 3) frequency = 'Weekly';
    var hours = -1;
    if (hcstate.hours == 2) hours = 4;
    if (hcstate.hours == 3) hours = 5;
    if (hcstate.hours == 4) hours = 6;
    if (hcstate.hours == 5) hours = 7;
    if (hcstate.hours == 6) hours = 8;
    if (hcstate.hours == 7) hours = 9;
    var cleaners = -1;
    if (hcstate.cleaners == 1) cleaners = 10;
    if (hcstate.cleaners == 2) cleaners = 11;
    if (hcstate.cleaners == 3) cleaners = 12;
    if (hcstate.cleaners == 4) cleaners = 13;
    var materials = -1;
    if (hcstate.materials == 0) materials = 14;
    if (hcstate.materials == 1) materials = 15;
    var paymentWays = -1;
    if (hcstate.method == 0) paymentWays = 0;
    if (hcstate.method == 1) paymentWays = 2;
    HCBooking({
      serviceType: "HomeCleaning",
      duoDate: hcstate.selectedday,
      duoTime: hcstate.start,
      subTotal: hcstate.subtotal,
      discount: hcstate.discount,
      totalAmount: hcstate.total,
      locationId: state.selected_address,
      providerId: hcstate.providerid,
      autoassign: hcstate.autoassign,
      scheduleId: "1",
      paymentWays: paymentWays,
      frequency: frequency,
      answers: [
        {
          questionId: 1,
          answerId: hcstate.frequency,
          answerValue: null
        },
        {
          questionId: 2,
          answerId: hours,
          answerValue: null
        },
        {
          questionId: 3,
          answerId: cleaners,
          answerValue: null
        },
        {
          questionId: 4,
          answerId: materials,
          answerValue: null
        },
        {
          questionId: 5,
          answerId: null,
          answerValue: hcstate.desc
        }
      ]
    }).then(() => {
      setIsLoading(false);
      dispatch({
        type: 'RESET'
      });
      Toast.show('Booked', Toast.LONG);
      navigate('HomeNavigator')
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
      Toast.show('Error:: NotBooked', Toast.LONG);
    });
  };
  // FFFDD0...Cream EEDC82 ffe5b4 fedc56 ceb180 f8e473 ffbf00 fce205 ffc30b
  return (
    <>
      <View style={{ flex: 1, marginTop: 10, margin: 15 }}>
        <Loader loading={isloading} />
        <ProgressSteps
          activeStepIconBorderColor='#f1c40f'
          activeLabelColor='#f1c40f'
          completedProgressBarColor='#f1c40f'
          completedStepIconColor='#f1c40f'
          labelFontFamily='' backgroundColor='#ffffff'>
          <ProgressStep
            label={t('frequency')}
            onNext={onFrequencyStepComplete}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnText={t('next')}
            previousBtnText={t('previous')}
            finishBtnText={t('submit')}
          >
            <Frequency />
          </ProgressStep>
          <ProgressStep
            label={t('cleaning')}
            onNext={onCleaningDetailsComplete}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}
            nextBtnText={t('next')}
            previousBtnText={t('previous')}
            finishBtnText={t('submit')}>
            <HomeCleaningDetails />
          </ProgressStep>
          <ProgressStep
            label={t('date')}
            onNext={onDateTimeStepComplete}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}
            nextBtnText={t('next')}
            previousBtnText={t('previous')}
            finishBtnText={t('submit')}>
            <DateandTimeDetails />
          </ProgressStep>
          <ProgressStep
            label={t('address')}
            onNext={onAddressStepComplete}
            onPrevious={onPrevStep}
            // onSubmit={onSubmitSteps}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}
            nextBtnText={t('next')}
            previousBtnText={t('previous')}
            finishBtnText={t('submit')}>
            <AddressDetails />
          </ProgressStep>
          <ProgressStep
            label={t('payment')}
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}
            nextBtnText={t('next')}
            previousBtnText={t('previous')}
            finishBtnText={t('submit')}>
            <Payment />
          </ProgressStep>
        </ProgressSteps>
      </View>

      {/* <Text style={styles.modalText}>Modal{'  '}<FontAwesome5 name="chevron-up" size={15} color="#161924" /></Text> */}
      <ModalDetails style={styles.modalText} total={hcstate.total}></ModalDetails>

    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  nextButtonStyle: {
    top: 20,
    right: -65,
    backgroundColor: '#f1c40f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DAA520',
    // fontFamily: 'Comfortaa-Bold',
    paddingHorizontal: 25,
  },
  previousButtonStyle: {
    top: 20,
    left: 0,
    backgroundColor: '#f1c40f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DAA520',
    // fontFamily: 'Comfortaa-Bold',
    paddingHorizontal: 20,
  },
  modalButtonStyle: {
    position: 'absolute',
    left: 10,
    bottom: 35,
    paddingHorizontal: 20,
    backgroundColor: '#f1c40f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DAA520',
    // fontFamily: 'Comfortaa-Bold',

  },
  modalText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  ButtonTextStyle: {
    color: '#fff'
  },
});
export default withNamespaces()(HomeCleaningScreen);