import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import {Input} from '@ui-kitten/components';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {CardItem} from '../components/Book/CardItem';
import {IBook, ICard, IUser} from '../models';
import {emptyCard, ISecureCard} from '../models/card';
import {RootState} from '../redux/reducers';
import {CardFormMessages} from '../utils/actionTypes';
import {addCard, setDefaultCard, createBooking} from '../redux/actions';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const Book: React.FC<Props> = props => {
  let cardNumberRef = useRef(null),
    cardExpireDateRef = useRef(null),
    cardCcvRef = useRef(null);

  let {book}: {book: IBook} = useSelector((state: RootState) => state.book);

  const dispatch = useDispatch();
  const {user}: {user: IUser} = useSelector((state: RootState) => state.auth);
  const {success} = useSelector((state: RootState) => state.auth);
  const [card, setCard] = useState(emptyCard);
  const [selectedField, setSelectedField] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [CNIsValid, setCNIsValid] = useState(null);
  const [CNumValueIsValid, setCNumValueIsValid] = useState(null);
  const [CNumIsValid, setCNumIsValid] = useState(null);
  const [CDIsValid, setCDIsValid] = useState(null);
  const [CDValueIsValid, setCDValueIsValid] = useState(null);
  const [CvcIsValid, setCvcIsValid] = useState(null);
  const [CvcValueIsValid, setCvcValueIsValid] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [payType, setPayType] = useState('later');

  const renderPasswordIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon name={secureTextEntry ? 'eye-slash' : 'eye'} size={20} />
    </TouchableWithoutFeedback>
  );

  const renderValidInputIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon name={'check-circle'} size={20} color={'green'} />
    </TouchableWithoutFeedback>
  );

  const renderInvalidInputIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon name={'exclamation-circle'} size={20} color={'#ff375d'} />
    </TouchableWithoutFeedback>
  );

  const _renderItem = (item: ISecureCard) => {
    return (
      <CardItem key={item.id} card={item} setDefaultCard={_setDefaultCard} />
    );
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    if (success) {
      setModalVisible(false);
      setCard(emptyCard);
    }
  }, [success]);

  const _bookNow = () => {
    if (book.card.id.length) {
      dispatch(createBooking(book, props.navigation));
    } else {
      Alert.alert(
        'Book',
        'Please add a payment method before producing to book',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  const updateFields = (field: string, value: string) => {
    let selectedCard: ICard = card;
    selectedCard = {...selectedCard, [field]: value};
    setCard(selectedCard);
    setSelectedField(field);
  };

  const validateFields = () => {
    const visaRegEx =
      /^(?:4\d{3}|5[1-5]\d{2}|6011|3[47]\d{2})([- ]?)\d{4}\1\d{4}\1\d{4}$/.test(
        card.number,
      );
    const expireDateRegex = /^\d{2}\/\d{2}$/.test(card.expire_date);

    switch (selectedField) {
      case 'name':
        if (card.name.length) {
          setCNIsValid(true);
        } else {
          setCNIsValid(false);
        }
        break;
      case 'number':
        console.log('card number:', card.number);
        if (card.number.length) {
          setCNumIsValid(true);

          if (visaRegEx) {
            setCNumValueIsValid(true);
          } else {
            setCNumValueIsValid(false);
          }
        } else {
          setCNumIsValid(false);
        }
        break;
      case 'expire_date':
        if (card.name.length) {
          setCDIsValid(true);

          if (expireDateRegex) {
            setCDValueIsValid(true);
          } else {
            setCDValueIsValid(false);
          }
        } else {
          setCDIsValid(false);
        }
        break;
      case 'cvc':
        if (card.cvc) {
          setCvcIsValid(true);
          if (card.cvc.length === 3 && parseInt(card.cvc)) {
            setCvcValueIsValid(true);
          } else {
            setCvcValueIsValid(false);
          }
        } else {
          setCvcIsValid(false);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    validateFields();
  }, [card]);

  const cc_expires_format = (cvv: string) => {
    return cvv
      .replace(
        /[^0-9]/g,
        '', // To allow only numbers
      )
      .replace(
        /^([2-9])$/g,
        '0$1', // To handle 3 > 03
      )
      .replace(
        /^(1{1})([3-9]{1})$/g,
        '0$1/$2', // 13 > 01/3
      )
      .replace(
        /^0{1,}/g,
        '0', // To handle 00 > 0
      )
      .replace(
        /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
        '$1/$2', // To handle 113 > 11/3
      );
  };

  useEffect(() => {
    if (
      CNIsValid &&
      CNumIsValid &&
      CNumValueIsValid &&
      CDIsValid &&
      CvcIsValid &&
      CvcValueIsValid
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [
    CNIsValid,
    CNumIsValid,
    CNumValueIsValid,
    CDIsValid,
    CvcIsValid,
    CvcValueIsValid,
  ]);

  const _saveCard = () => {
    dispatch(addCard(card, props.navigation));
  };

  const _setDefaultCard = (card: ISecureCard) => {
    dispatch(setDefaultCard(card));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.qst}> When would you like to pay? </Text>

      <View style={{flex: 1, marginTop: 15}}>
        <Text style={styles.textStyle}> Pay later </Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setPayType('later')}>
            <Image
              source={require('../assets/amex.png')}
              style={{
                height: 50,
                width: 40,
                marginRight: 10,
              }}
            />
            <Image
              source={require('../assets/visa.jpg')}
              style={{
                height: 25,
                width: 40,
                marginTop: 13,
                marginRight: 10,
              }}
            />
            <Image
              source={require('../assets/mastercard.jpg')}
              style={{
                height: 25,
                width: 40,
                marginTop: 13,
              }}
            />
          </TouchableOpacity>
          {payType === 'later' && (
            <Icon
              name="check"
              size={17}
              color="green"
              style={{position: 'absolute', top: 20, right: 10}}
            />
          )}
        </View>
      </View>
      {/* //pay now */}
      <View style={{flex: 1, marginTop: 30}}>
        <Text style={styles.textStyle}> Pay now </Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setPayType('now')}>
            <Image
              source={require('../assets/amex.png')}
              style={{
                height: 50,
                width: 40,
                marginRight: 10,
              }}
            />
            <Image
              source={require('../assets/visa.jpg')}
              style={{
                height: 25,
                width: 40,
                marginTop: 13,
                marginRight: 10,
              }}
            />
            <Image
              source={require('../assets/mastercard.jpg')}
              style={{
                height: 25,
                width: 40,
                marginTop: 13,
              }}
            />
          </TouchableOpacity>
          {payType === 'now' && (
            <Icon
              name="check"
              size={17}
              color="green"
              style={{position: 'absolute', top: 20, right: 10}}
            />
          )}
        </View>
      </View>
      <Text style={{...styles.textStyle, lineHeight: 20, marginTop: 25}}>
        {' '}
        The property will charge you the full amount after you book. This
        booking is non-refundable.
      </Text>

      <View style={{flex: 1, marginTop: 35}}>
        <Text style={{...styles.textStyle, fontWeight: 'bold'}}>
          Your reservation guarantee
        </Text>
        <View style={{...styles.row, marginTop: 30}}>
          <Icon
            name="credit-card"
            size={13}
            color="#000"
            style={{marginRight: 10}}
          />
          <Text style={{...styles.textStyle}}>
            Your credit card is needed to guarantee your booking.
          </Text>
        </View>
      </View>

      <View style={{flex: 1, marginTop: 25}}>
        <Text style={styles.qst}> How do you want to pay? </Text>
        <Button
          title="Select a payment method"
          containerStyle={{width: 250}}
          iconComponent={Icon}
          icon={{
            name: 'plus-square',
            type: 'font-awesome',
            size: 17,
            color: '#00AAFF',
            marginRight: 15,
          }}
          //  backgroundColor="#ff5d62"

          buttonStyle={styles.buttonPayStyle}
          titleStyle={styles.textButtonPay}
          onPress={() => setModalVisible(true)}
        />

        {user.cards.length > 0 && user.cards.map(item => _renderItem(item))}
      </View>
      <View style={{flex: 1, marginTop: 25}}>
        <Text
          style={{...styles.textStyle, fontWeight: 'bold', marginBottom: 5}}>
          {user.fullname}
        </Text>
        <Text style={{...styles.textStyle, marginBottom: 3}}>{user.email}</Text>
        <Text style={{...styles.textStyle, marginBottom: 3}}> France </Text>
        <Text style={styles.textStyle}> {user.phone} </Text>
      </View>
      <View style={{flex: 1, marginTop: 30}}>
        <Text style={{...styles.qst, marginBottom: 15}}>{book.hotel.name}</Text>
        <View style={{...styles.row, marginTop: 10}}>
          <Text style={styles.checkIn}>Check-in</Text>
          <Text style={styles.checkInValue}>
            {Moment(book.check_in_date).format('ll')}
          </Text>
        </View>
        <View style={{...styles.row, marginTop: 20}}>
          <Text style={styles.checkIn}>Check-out</Text>
          <Text style={styles.checkInValue}>
            {Moment(book.check_out_date).format('ll')}
          </Text>
        </View>
        <Text style={{...styles.textStyle, marginTop: 30}}>
          1 night, 1 room, 2 adults
        </Text>
        <View style={{flex: 1, marginTop: 30}}>
          <Text style={{...styles.textStyle}}>Total price</Text>
          <Text style={{...styles.priceStyle}}>€{book.price}</Text>
        </View>
      </View>
      <Button
        title={'Book now'}
        containerStyle={{width: 'auto'}}
        buttonStyle={styles.button}
        titleStyle={styles.textButton}
        type="solid"
        onPress={() => _bookNow()}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.container}>
          <View style={{height: 60, alignItems: 'center', marginTop: 35}}>
            <View style={{...styles.row}}>
              <Image
                source={require('../assets/amex.png')}
                style={{
                  height: 50,
                  width: 40,
                  marginRight: 10,
                }}
              />
              <Image
                source={require('../assets/visa.jpg')}
                style={{
                  height: 25,
                  width: 40,
                  marginTop: 13,
                  marginRight: 10,
                }}
              />
              <Image
                source={require('../assets/mastercard.jpg')}
                style={{
                  height: 25,
                  width: 40,
                  marginTop: 13,
                }}
              />
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Input
                autoFocus
                label="Card Name"
                placeholder="Place your card name"
                placeholderTextColor="#000"
                value={card.name}
                accessoryRight={
                  CNIsValid
                    ? renderValidInputIcon
                    : CNIsValid === false
                    ? renderInvalidInputIcon
                    : null
                }
                status={
                  CNIsValid
                    ? 'success'
                    : CNIsValid === false
                    ? 'danger'
                    : 'basic'
                }
                onChangeText={text => updateFields('name', text)}
                onSubmitEditing={() => cardNumberRef.focus()}
              />
              {CNIsValid === false && (
                <View style={styles.errorContainer}>
                  <Icon
                    name="exclamation-triangle"
                    color={'#ff375d'}
                    size={8}
                    style={styles.errorIcon}
                  />
                  <Text style={styles.errorStyle}>{CardFormMessages.name}</Text>
                </View>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Input
                ref={ref => (cardNumberRef = ref)}
                label="Card Number"
                placeholder="Place your card number"
                placeholderTextColor="#000"
                value={card.number
                  .replace(/\s?/g, '')
                  .replace(/(\d{4})/g, '$1 ')
                  .trim()}
                accessoryRight={
                  CNumIsValid && CNumValueIsValid
                    ? renderValidInputIcon
                    : CNumIsValid === false || CNumValueIsValid === false
                    ? renderInvalidInputIcon
                    : null
                }
                status={
                  CNumIsValid && CNumValueIsValid
                    ? 'success'
                    : CNumIsValid === false || CNumValueIsValid === false
                    ? 'danger'
                    : 'basic'
                }
                onChangeText={text => updateFields('number', text)}
                onSubmitEditing={() => cardExpireDateRef.focus()}
              />
              {CNumIsValid === false && (
                <View style={styles.errorContainer}>
                  <Icon
                    name="exclamation-triangle"
                    color={'#ff375d'}
                    size={8}
                    style={styles.errorIcon}
                  />
                  <Text style={styles.errorStyle}>
                    {CardFormMessages.number}
                  </Text>
                </View>
              )}
              {CNumValueIsValid === false && (
                <View style={styles.errorContainer}>
                  <Icon
                    name="exclamation-triangle"
                    color={'#ff375d'}
                    size={8}
                    style={styles.errorIcon}
                  />
                  <Text style={styles.errorStyle}>
                    {CardFormMessages.number_not_valid}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Input
                ref={ref => (cardExpireDateRef = ref)}
                label="Card Expiration Date"
                placeholder="MM/YY"
                placeholderTextColor="#000"
                value={cc_expires_format(card.expire_date)}
                accessoryRight={
                  CDIsValid
                    ? renderValidInputIcon
                    : CNumIsValid === false
                    ? renderInvalidInputIcon
                    : null
                }
                status={
                  CDIsValid && CDValueIsValid
                    ? 'success'
                    : CDIsValid === false || CDValueIsValid === false
                    ? 'danger'
                    : 'basic'
                }
                onChangeText={text => updateFields('expire_date', text)}
                onSubmitEditing={() => cardCcvRef.focus()}
              />

              {CDIsValid === false && (
                <View style={styles.errorContainer}>
                  <Icon
                    name="exclamation-triangle"
                    color={'#ff375d'}
                    size={8}
                    style={styles.errorIcon}
                  />
                  <Text style={styles.errorStyle}>
                    {CardFormMessages.expire_date}
                  </Text>
                </View>
              )}
              {CDValueIsValid === false && (
                <View style={styles.errorContainer}>
                  <Icon
                    name="exclamation-triangle"
                    color={'#ff375d'}
                    size={8}
                    style={styles.errorIcon}
                  />
                  <Text style={styles.errorStyle}>
                    {CardFormMessages.expire_date_not_valid}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Input
                ref={ref => (cardCcvRef = ref)}
                label="CVV"
                placeholder="Place your secure number"
                placeholderTextColor="#000"
                secureTextEntry={secureTextEntry}
                accessoryRight={renderPasswordIcon}
                value={card.cvc}
                status={
                  CvcIsValid && CvcValueIsValid
                    ? 'success'
                    : CvcIsValid === false || CvcValueIsValid === false
                    ? 'danger'
                    : 'basic'
                }
                onChangeText={text => updateFields('cvc', text)}
                onSubmitEditing={() => isValid && _saveCard()}
              />
              {CvcIsValid === false && (
                <View style={styles.errorContainer}>
                  <Icon
                    name="exclamation-triangle"
                    color={'#ff375d'}
                    size={8}
                    style={styles.errorIcon}
                  />
                  <Text style={styles.errorStyle}>{CardFormMessages.cvc}</Text>
                </View>
              )}
              {CvcValueIsValid === false && (
                <View style={styles.errorContainer}>
                  <Icon
                    name="exclamation-triangle"
                    color={'#ff375d'}
                    size={8}
                    style={styles.errorIcon}
                  />
                  <Text style={styles.errorStyle}>
                    {CardFormMessages.cvcNotValid}
                  </Text>
                </View>
              )}
            </View>
            <View style={{flex: 1, marginTop: 100}}>
              <Button
                title={'Use this card'}
                containerStyle={{width: 'auto'}}
                buttonStyle={styles.button}
                titleStyle={styles.textButton}
                type="solid"
                disabled={!isValid}
                onPress={() => _saveCard()}
              />
              <TouchableHighlight
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.textCancelModal}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  row: {
    flexDirection: 'row',
  },
  qst: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textStyle: {
    color: '#000',
    fontSize: 13,
  },
  buttonPayStyle: {
    backgroundColor: '#fff',
    marginTop: 15,
    marginBottom: 10, //20 ios
    width: '100%',
    height: 50,
  },
  textButtonPay: {
    color: '#00AAFF',
    fontSize: 16,
    fontWeight: '600',
  },
  checkIn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  checkInValue: {
    fontSize: 16,
    color: '#000',
    position: 'absolute',
    right: 5,
  },
  priceStyle: {
    fontSize: 27,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2756a1',
    borderRadius: 10,
    width: '100%',
    height: 50,
    marginTop: 100,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    marginTop: 15,
  },
  inputContainer: {
    marginBottom: 25,
  },
  textInput: {
    fontSize: 16,
  },
  textCancelModal: {
    color: '#32b471',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  expireDate: {
    fontSize: 16,
    color: '#000',
  },
  errorContainer: {
    flexDirection: 'row',
    marginTop: 5,
    paddingLeft: 10,
  },
  errorIcon: {
    paddingTop: 4,
  },
  errorStyle: {
    fontSize: 12,
    marginLeft: 3,
    color: '#ff375d',
  },
});

export default Book;
