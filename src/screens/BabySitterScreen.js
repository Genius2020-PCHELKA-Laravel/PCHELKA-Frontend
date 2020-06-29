import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Frequency from '../components/BabySitterSteps/Frequency';
import BabySitterDetails from '../components/BabySitterSteps/BabySitterDetails';
import DateandTimeDetails from '../components/BabySitterSteps/DateandTimeDetails';
import AddressDetails from '../components/BabySitterSteps/AddressDetails';
import Payment from '../components/BabySitterSteps/Payment';
import BookedScreen from '../components/BabySitterSteps/BookedScreen';

import Spacer from '../components/Spacer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import ModalDetails from '../components/BabySitterSteps/ModalDetails';
import { Context as UserContext } from './context/UserContext';
import { Context as HCContext } from './context/HCContext';
import { withNamespaces } from 'react-i18next';
import Toast from 'react-native-simple-toast';
import { navigate } from '../navigationRef';
import Loader from '../components/Loader';
import i18n from '../locales/i18n';
import { BackHandler } from 'react-native';
import OfflineNotice from '../components/OfflineNotice';

const BabySitterScreen = ({ navigation, t }) => {
  // static navigationOptions = {
  //   headerShown: false
  // };
  const { state: hcstate, HCBooking, dispatch: hcdispatch, getProviders, getSchedules, pay } = useContext(HCContext);
  const { state } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const [dateErrors, setDateErrors] = useState(false);
  const [addressErrors, setAddressErrors] = useState(false);
  const [showBookedModal, setShowBookedModal] = useState(false);

  // const [ispaid, setIspaid] = useState('');
  // const [hourPrice, setHourPrice] = useState(0);
  // const [hourMaterialPrice, setHourMaterialPrice] = useState(0);

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    }
  };
  // const unsubscribe = navigation.addListener('didFocus', () => {

  // });
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => { return true });
    let isCanceled = false;
    // if (!isCanceled)
    //   hcdispatch({ type: 'RESET' });
    // if (!isCanceled)
    //   hcdispatch({ type: 'set_frequency', payload: 1 });
    // if (!isCanceled)
    //   hcdispatch({ type: 'set_hours', payload: 2 });
    // if (!isCanceled)
    //   hcdispatch({ type: 'set_quantity', payload: 2 });
    // if (!isCanceled)
    //   hcdispatch({ type: 'set_cleaners', payload: 1 });
    // if (!isCanceled)
    //   hcdispatch({ type: 'set_materials', payload: 0 });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => { return true });
      isCanceled = true;
    };
  }, []);
  useEffect(() => {
    console.log("BabySitterScreen::UseEffect::gethourprice");
    console.log("BabySitterScreen::UseEffect::State hour price:: " + hcstate.BS.name)

    console.log("BabySitterScreen::UseEffect::gethourprice");
    console.log("BabySitterScreen::UseEffect::State hour price:: " + hcstate.BS.hourPrice)

    console.log("BabySitterScreen::UseEffect::gethourmaterialprice");
    console.log("BabySitterScreen::UseEffect::State hour material price:: " + hcstate.BS.materialPrice);
    getProviders({ serviceType: 'BabysitterService' }).then((response) => {
      console.log("BabySitterScreen::Providers");
      console.log(response);
    }).catch((error) => {
      console.log("Error::BabySitterScreen::Providers");
      console.log(error);
    });


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
    console.log('hcstate.desc ' + hcstate.desc);
  };
  const onDateTimeStepComplete = () => {
    console.log('hcstate.providerid ' + hcstate.providerid);
    console.log('hcstate.autoassign ' + hcstate.autoassign);
    console.log('hcstate.selectedday::hcstate.start ' + hcstate.selectedday + '  ' + hcstate.start);
    if (hcstate.selectedday == '') {
      Toast.show(i18n.t('selectdateplease'), Toast.LONG);
      setDateErrors(true);
      return;
    } else {
      setDateErrors(false);
    }
    if (hcstate.start == '') {
      Toast.show(i18n.t('selecttimeplease'), Toast.LONG);
      setDateErrors(true);
      return;
    }
    else {
      setDateErrors(false);
    }
  };
  const onAddressStepComplete = () => {
    console.log('state.selected_address_name:: ' + state.selected_address_name);
    if (state.selected_address == '') {
      Toast.show(i18n.t('selectaddressplease'), Toast.LONG);
      setAddressErrors(true);
      return;
    }
    else {
      setAddressErrors(false);
    }
  };

  const onPrevStep = () => {
    console.log('called previous step');
  };

  const onSubmitSteps = async () => {
    if (hcstate.method == -1) {
      Toast.show(i18n.t('selectpaymentmethodplease'), Toast.LONG);
      setIsLoading(false);
      return;
    }
    if (state.selected_address == '') {
      Toast.show(i18n.t('selectaddressplease'), Toast.LONG);
      setIsLoading(false);
      return;
    }
    if (hcstate.selectedday == '') {
      Toast.show(i18n.t('selectdateplease'), Toast.LONG);
      setIsLoading(false);
      return;
    }
    if (hcstate.start == '') {
      Toast.show(i18n.t('selecttimeplease'), Toast.LONG);
      setIsLoading(false);
      return;
    }

    var ispaid = '';
    setIsLoading(true);
    console.log('hcstate.method:: ' + hcstate.method);
    // console.log('hcstate.selectedday:: ' + hcstate.selectedday);
    if (hcstate.method == 0 && hcstate.valid == false) {
      Toast.show(i18n.t('yourcardnumbernotvalid'), Toast.LONG);
      setIsLoading(false);
      return;
    }
    var oid = '';
    if (hcstate.method == 0 && hcstate.valid == true) {
      oid = "order_id_" + Math.floor(1000000000000 + Math.random() * 9000000000000) + "_" + Math.floor(1000000000000 + Math.random() * 9000000000000);
      var result = await pay({
        order_id: oid,
        card: hcstate.card.replace(/\s/g, ''),
        card_exp_month: hcstate.card_exp_month,
        card_exp_year: hcstate.card_exp_year,
        card_cvv: hcstate.card_cvv,
        amount: hcstate.subtotal,
        description: hcstate.selectedday + "  " + oid + " " + hcstate.desc
      }).then((response) => {
        // console.log("###################" + JSON.stringify(response));
        console.log("BabySitterScreen::paid");
        if (response.data.data.result == 'ok') {
          console.log("result: ok, status:success");
          Toast.show(i18n.t('thankyouforyourorder') + "\n" + i18n.t('paymentresult') + ": " + response.data.data.result + "\n" + i18n.t('paymentstatus') + ": " + response.data.data.status, Toast.LONG);
          ispaid = 'yes';
        }
        else if (response.data.data.result == 'error') {
          Toast.show(i18n.t('paymentresult') + ": " + response.data.data.result + "\n" + i18n.t('paymentstatus') + ": " + response.data.data.status + "\n" + i18n.t('error') + ": " + response.data.data.err_description, Toast.LONG);
          setIsLoading(false);
          ispaid = 'no';
        }
      }).catch(() => {
        console.log("BabySitterScreen::NOTpaid" + error);
        setIsLoading(false);
        ispaid = 'no';
        Toast.show(i18n.t('notcompletedpayment'), Toast.LONG);
      });
    }
    console.log("ispaid" + ispaid);
    // to prevent from booking
    if (hcstate.method == 1 || ispaid == 'yes') {


      var frequency = -1;
      if (hcstate.frequency == 1) frequency = 'One-time';
      if (hcstate.frequency == 2) frequency = 'Bi-weekly';
      if (hcstate.frequency == 3) frequency = 'Weekly';
      var hours = -1;
      if (hcstate.hours == 2) hours = 41;
      if (hcstate.hours == 3) hours = 42;
      if (hcstate.hours == 4) hours = 43;
      if (hcstate.hours == 5) hours = 44;
      if (hcstate.hours == 6) hours = 45;
      if (hcstate.hours == 7) hours = 46;
      var cleaners = -1;
      if (hcstate.cleaners == 1) cleaners = 47;
      if (hcstate.cleaners == 2) cleaners = 48;
      if (hcstate.cleaners == 3) cleaners = 49;
      if (hcstate.cleaners == 4) cleaners = 50;

      var paymentWays = -1;
      if (hcstate.method == 0) paymentWays = 0;
      if (hcstate.method == 1) paymentWays = 1;
      HCBooking({
        serviceType: "BabysitterService",
        duoDate: hcstate.selectedday,
        duoTime: hcstate.start,
        subTotal: hcstate.subtotal,
        discount: hcstate.discount,
        totalAmount: hcstate.total,
        locationId: state.selected_address,
        // providerId: hcstate.providerid,
        providerId: "2",
        autoassign: hcstate.autoassign,
        scheduleId: "1",
        paymentWays: paymentWays,
        frequency: frequency,
        materialPrice: 0,
        answers: [
          {
            questionId: 1,
            answerId: hcstate.frequency,
            answerValue: null
          },
          {
            questionId: 12,
            answerId: hours,
            answerValue: null
          },
          {
            questionId: 13,
            answerId: cleaners,
            answerValue: null
          },
          {
            questionId: 5,
            answerId: null,
            answerValue: hcstate.desc
          }
        ]
      }).then((reponse) => {
        console.log(reponse)
        setIsLoading(false);
        hcdispatch({
          type: 'RESET'
        });
        // Toast.show(i18n.t('booked'), Toast.LONG);
        // navigate('BookedScreen')
        setShowBookedModal(true);

      }).catch((error) => {
        console.log(error);
        setIsLoading(false);
        Toast.show(i18n.t('notbooked'), Toast.LONG);
      });
    }
  };
  // FFFDD0...Cream EEDC82 ffe5b4 fedc56 ceb180 f8e473 ffbf00 fce205 ffc30b
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Loader loading={isloading} />
        <BookedScreen
          showBookedModal={showBookedModal}
          setShowBookedModal={setShowBookedModal}
        />
        <OfflineNotice />

        <ProgressSteps
          activeStepIconBorderColor='#f5c500'
          activeLabelColor='#f5c500'
          completedProgressBarColor='#f5c500'
          completedStepIconColor='#f5c500'
          labelFontFamily=''
          backgroundColor='#fff'>
          <ProgressStep
            label={'    ' + t('frequency')}
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
            label={t('service')}
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
            <BabySitterDetails />
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
            finishBtnText={t('submit')}
            errors={dateErrors}>
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
            finishBtnText={t('submit')}
            errors={addressErrors}>
            <AddressDetails />
          </ProgressStep>
          <ProgressStep
            label={t('payment') + '  '}
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
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
            <Payment />
          </ProgressStep>
        </ProgressSteps>
        <View style={{
          borderWidth: .1,
          borderColor: '#eee',
          borderBottomWidth: 0,
          shadowColor: '#eee',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 1,
        }} />
        <ModalDetails style={styles.modalText} total={hcstate.total}></ModalDetails>
      </View>

      {/* <Text style={styles.modalText}>Modal{'  '}<FontAwesome5 name="chevron-up" size={15} color="#161924" /></Text> */}

    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  nextButtonStyle: {
    top: 85,
    right: -50,
    backgroundColor: '#f5c500',
    borderRadius: 4,
    width: '100%'
  },
  previousButtonStyle: {
    top: 85,
    left: -50,
    backgroundColor: '#f5c500',
    borderRadius: 4,
    // fontFamily: 'Comfortaa-Bold',
    width: '100%'

  },
  ButtonTextStyle: {
    color: '#fff',
    fontSize: 14,
  },
});
export default withNamespaces()(BabySitterScreen);