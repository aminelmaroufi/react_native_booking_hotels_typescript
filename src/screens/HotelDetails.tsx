import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, View, Image, Text, Alert} from 'react-native';
import {Datepicker} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Rating, Button} from 'react-native-elements';
import Moment from 'moment';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootState} from '../redux/reducers';
import {IBook} from '../models';
import {baseURL} from '../config/config';
import {updateReservation} from '../redux/actions';

// type Props = {
//   book: IBook;
// };

const HotelDetails: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const {book} = useSelector((state: RootState) => state.book);

  useEffect(() => {
    navigation.setOptions({title: `${book.hotel.name}`});
  });

  const _pickDate = (type: string, value: Date | null) => {
    let booking: IBook = book;
    if (type === 'checkIn') {
      booking = {...booking, check_in_date: value};
    } else {
      const checkOutDate = Moment(value);
      const diff_in_time: number = checkOutDate.diff(
        booking.check_in_date,
        'days',
      );
      let price: number = booking.hotel.rooms[0].price;
      if (diff_in_time > 1) {
        price = price * diff_in_time;
      }

      booking = {
        ...booking,
        check_out_date: value,
        night_numbers: diff_in_time,
        price,
      };
    }
    dispatch(updateReservation(booking));
  };

  const _selectRooms = () => {
    if (book.night_numbers === 0) {
      Alert.alert(
        'Reservation Date',
        'You should pick a reservation date for the check in and check out before selecting a room',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if (
      Moment(book.check_out_date).diff(book.check_in_date, 'days') < 0
    ) {
      Alert.alert(
        'Reservation Date',
        'Please select a check-out date value bigger than the check-in date value',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      navigation.navigate('CHECK_ROOMS');
    }
  };

  return (
    <ScrollView testID="hotelDetails" style={styles.container}>
      <View>
        <Image
          testID="mainImage"
          source={{uri: `${baseURL}/files/${book.hotel.second_picture}/view`}}
          style={styles.imageStyle}
        />
        <View style={styles.info}>
          <View style={styles.row}>
            <Text testID="hotelName" style={styles.title}>
              {book.hotel.name}
            </Text>
            <View testID="hotelComponent">
              <Rating
                imageSize={15}
                readonly
                startingValue={book.hotel.rating}
                style={styles.rating}
              />
            </View>
          </View>
          <View style={styles.bookInfo}>
            {book.price > 0 && (
              <View style={{flex: 1}}>
                <Text style={styles.date}>
                  Pick for {book.night_numbers} night
                  {book.night_numbers === 1 ? '' : 's'} (
                  {Moment(book.check_in_date).format('ll')} -{' '}
                  {Moment(book.check_out_date).format('ll')})
                </Text>
                <Text testID="hotelPrice" style={styles.price}>
                  €{book.price}
                </Text>
              </View>
            )}
            <View style={[styles.row, {marginTop: 20}]} testID="hotelAddress">
              <Icon
                name="map-marker"
                size={14}
                color="#000"
                style={{marginRight: 15}}
              />
              <Text style={styles.adress}>{book.hotel.address}</Text>
            </View>
            <View style={[styles.row, {marginTop: 10}]} testID="hotelLocation">
              <Icon
                name="subway"
                size={14}
                color="#000"
                style={{marginRight: 15}}
              />
              <Text style={styles.adress}>{book.hotel.location}</Text>
            </View>
            <View style={[styles.row, {marginTop: 10}]}>
              <Icon
                name="star"
                size={14}
                color="#000"
                style={{marginRight: 15}}
              />
              <Text style={styles.adress}>
                8,9 - Fabulous location! (based on 560 location ratings)
              </Text>
            </View>

            <View style={[styles.row, {marginTop: 50}]}>
              <View style={{flex: 1}}>
                <Text style={styles.dateCheck}>Check-in</Text>

                <Datepicker
                  testID="checkInDateComponent"
                  style={{width: 140}}
                  date={book.check_in_date}
                  onSelect={date => _pickDate('checkIn', date)}
                  placeholder={
                    book.night_numbers === 0
                      ? 'Pick a date'
                      : Moment(book.check_in_date).format('ll')
                  }
                  min={new Date()}
                  backdropStyle={styles.backdropStyle}
                />
              </View>
              <View>
                <Text style={styles.dateCheck}>Check-out</Text>
                <Datepicker
                  testID="checkOutDateComponent"
                  style={{width: 140}}
                  date={book.check_out_date}
                  onSelect={date => _pickDate('checkOut', date)}
                  placeholder={
                    book.night_numbers === 0
                      ? 'Pick a date'
                      : Moment(book.check_out_date).format('ll')
                  }
                  placement="bottom"
                  min={book.check_in_date ? book.check_in_date : new Date()}
                  backdropStyle={styles.backdropStyle}
                />
              </View>
            </View>
            <View style={{flex: 1, marginTop: 40}} testID="hotelReviews">
              <Text style={styles.reviewsTitle}>
                What guests loved the most:
              </Text>
              <View style={{flex: 1, marginTop: 20}}>
                <Text style={styles.reviewDesc}>
                  "Very modern property tucked away so no noise from traffic or
                  people. The room was very large with superior bed and modern
                  up to date bathroom. No faults"
                </Text>
                <View style={[styles.row, {marginTop: 15}]}>
                  <View style={styles.guestInfo}>
                    <Text style={{...styles.guestFStyle, color: '#fff'}}>
                      G
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.guestFStyle}>Greg</Text>
                    <View style={[styles.row, {marginTop: 10}]}>
                      <Image
                        source={require('../assets/UK.png')}
                        style={styles.reviewImage}
                      />
                      <Text style={styles.guestCountryStyle}>
                        United Kingdom
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* //Second review */}
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewDesc}>
                  "Excellent location and friendly staff, this hotel was perfect
                  for our weekend away"
                </Text>
                <View style={[styles.row, {marginTop: 15}]}>
                  <View style={styles.guestInfo}>
                    <Text style={{...styles.guestFStyle, color: '#fff'}}>
                      A
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.guestFStyle}>Amani</Text>
                    <View style={[styles.row, {marginTop: 10}]}>
                      <Image
                        source={require('../assets/UK.png')}
                        style={styles.reviewImage}
                      />
                      <Text style={styles.guestCountryStyle}>
                        United Kingdom
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* //end  */}
              {/* //Third review */}
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewDesc}>
                  "Beautiful location, quiet, comfortable. Amazing value for
                  money. friendly staff, clean and hygienic appliences. Loved
                  the bathroom and shower place."
                </Text>
                <View style={[styles.row, {marginTop: 15}]}>
                  <View style={styles.guestInfo}>
                    <Text style={{...styles.guestFStyle, color: '#fff'}}>
                      S
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.guestFStyle}>Susan</Text>
                    <View style={[styles.row, {marginTop: 10}]}>
                      <Image
                        source={require('../assets/UK.png')}
                        style={styles.reviewImage}
                      />
                      <Text style={styles.guestCountryStyle}>
                        United Kingdom
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* //end  */}
            </View>
          </View>
        </View>
        <View style={styles.viewButton}>
          <Button
            testID="selectRoomBtn"
            title="Select rooms"
            containerStyle={{width: 'auto'}}
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
            type="solid"
            onPress={_selectRooms}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: 150,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  bookInfo: {marginTop: 30},
  info: {
    flex: 1,
    padding: 15,
    paddingLeft: 30,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginRight: 7,
  },
  rating: {paddingTop: 5},
  date: {
    fontSize: 13,
    color: '#000',
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  adress: {
    fontSize: 15,
    color: '#000',
  },
  dateCheck: {
    fontSize: 14,
    color: '#000',
  },
  dateCheckIn: {
    fontSize: 17,
    color: '#00AAFF',
    fontWeight: 'bold',
  },
  guestInfo: {
    height: 40,
    width: 40,
    borderRadius: 100,
    padding: 11,
    paddingLeft: 14,
    backgroundColor: 'red',
  },
  reviewInfo: {flex: 1, marginTop: 30},
  reviewsTitle: {
    fontSize: 17,
    color: '#000',
    fontWeight: 'bold',
  },
  reviewImage: {
    height: 8,
    width: 18,
    marginTop: 1,
  },
  reviewDesc: {
    fontSize: 13,
    color: '#000',
  },
  guestFStyle: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  guestCountryStyle: {
    fontSize: 10,
    color: '#000',
    marginLeft: 5,
  },
  viewButton: {flex: 1, padding: 10},
  button: {
    backgroundColor: '#2756a1',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    height: 50,
    //textAlign:'center'
  },
  textButton: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  backdropStyle: {
    backgroundColor: '#000',
    opacity: 0.4,
  },
});

export default HotelDetails;
