import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Rating} from 'react-native-elements';
import Moment from 'moment';
import {IBook} from '../../models';
import {baseURL} from '../../config/config';

export const BookingItem = ({booking}: {booking: IBook}) => {
  return (
    <TouchableOpacity style={styles.hotelRow}>
      <Image
        source={{uri: `${baseURL}/files/${booking.hotel.main_picture}/view`}}
        style={styles.imageStyle}
      />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.title}>{booking.hotel.name}</Text>
          <Rating
            imageSize={13}
            readonly
            startingValue={booking.hotel.rating}
            style={{...styles.iconAdressStyle, marginTop: 4}}
          />
        </View>
        <View style={styles.row}>
          <Icon
            name="map-marker"
            size={12}
            color="#000"
            style={styles.iconAdressStyle}
          />
          <Text style={styles.adress}>{booking.hotel.short_address}</Text>
        </View>
        <View style={styles.typeStyle}>
          <Text style={styles.room}>
            Reservation for: {booking.night_numbers}{' '}
            <Text style={styles.reservationDetails}>
              night
              {booking.night_numbers > 1 ? 's' : ''}
            </Text>
          </Text>
          <Text style={styles.room}>
            Check-in date:{' '}
            <Text style={styles.reservationDetails}>
              {Moment(booking.check_in_date).format('ll')}
            </Text>
          </Text>
          <Text style={styles.room}>
            Check-out date:{' '}
            <Text style={styles.reservationDetails}>
              {Moment(booking.check_out_date).format('ll')}
            </Text>
          </Text>
          <View style={{...styles.row, paddingRight: 0}}>
            <Text style={styles.paymentDetails}>Total paid:</Text>
            <Text style={styles.price}>€{booking.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hotelRow: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#f4ab49',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  info: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginRight: 7,
  },
  adress: {
    fontSize: 14,
    color: '#000',
  },
  room: {
    fontSize: 12,
    color: '#000',
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 5,
  },
  paymentDetails: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 5,
    marginRight: 5,
  },
  typeStyle: {
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  imageStyle: {
    height: 190,
    width: 130,
  },
  reservationDetails: {
    fontWeight: 'bold',
  },
  iconAdressStyle: {marginRight: 5, marginTop: 2},
});
