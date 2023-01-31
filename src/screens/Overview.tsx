import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {Rating, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {IBook, IUser} from '../models';
import {RootState} from '../redux/reducers';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const Overview: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {book}: {book: IBook} = useSelector((state: RootState) => state.book);
  const {user}: {user: IUser} = useSelector((state: RootState) => state.auth);

  return (
    <Layout style={styles.container}>
      <View style={styles.row}>
        <Image
          source={require('../assets/1.jpeg')}
          style={{
            height: 90,
            width: 80,
          }}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <View
            style={{
              height: 18,
              width: 44,
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 4,
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={styles.tag}>Hotels</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{book.hotel.title}</Text>
            <Rating
              imageSize={15}
              readonly
              startingValue={book.hotel.rating}
              style={{paddingTop: 5}}
            />
          </View>
          <Text style={styles.adress}>{book.hotel.address}</Text>
        </View>
      </View>
      <View style={{...styles.row, marginTop: 30}}>
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
      <View style={{flex: 1}}>
        <View style={{...styles.row, marginTop: 30}}>
          <Text style={{...styles.textStyle}}>Total price for</Text>
          <Text style={styles.boldText}>1 room</Text>
          <Text style={styles.boldText}>{book.night_numbers} night</Text>
        </View>
        <Text style={styles.price}>€{book.price}</Text>
      </View>
      <View style={{flex: 1, marginTop: 30}}>
        <Text style={{...styles.roomStyle}}>{book.room.title}</Text>
        <View style={[styles.row, {marginTop: 30}]}>
          <Icon
            name="user-circle"
            size={14}
            color="#000"
            style={{marginTop: 1, marginRight: 15}}
          />
          <View style={styles.row}>
            <Text style={{...styles.textStyle, fontSize: 15, marginRight: 5}}>
              Booking for
            </Text>
            <Text style={styles.nameStype}>{user.fullname}</Text>
          </View>
        </View>
        <View style={[styles.row, {marginTop: 15}]}>
          <Icon
            name="users"
            size={14}
            color="#000"
            style={{marginTop: 1, marginRight: 15}}
          />
          <Text style={{...styles.textStyle, fontSize: 15}}>2 adults</Text>
        </View>
        <View style={[styles.row, {marginTop: 15}]}>
          <Icon
            name="bed"
            size={14}
            color="#000"
            style={{marginTop: 1, marginRight: 15}}
          />
          <Text style={{...styles.nameStype, fontSize: 15}}>1 large bed</Text>
        </View>
        <View style={[styles.row, {marginTop: 30}]}>
          <Icon
            name="ban"
            size={14}
            color="#000"
            style={{marginTop: 1, marginRight: 15}}
          />
          <Text style={{...styles.boldText, fontSize: 15}}>Non-refundable</Text>
        </View>
        <View style={[styles.row, {marginTop: 15}]}>
          <Icon
            name="credit-card"
            size={14}
            color="#000"
            style={{marginTop: 1, marginRight: 15}}
          />
          <Text style={{...styles.boldText, fontSize: 15}}>Pay in advance</Text>
        </View>
      </View>
      <Button
        title={'Final Step'}
        containerStyle={{width: 'auto'}}
        buttonStyle={styles.button}
        titleStyle={styles.textButton}
        type="solid"
        onPress={() => props.navigation.navigate('Book')}
      />
    </Layout>
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
  tag: {
    fontSize: 12,
    color: '#000',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginRight: 5,
    marginBottom: 10,
  },
  adress: {
    fontSize: 15,
    color: '#000',
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
  textStyle: {
    fontSize: 13,
    color: '#000',
  },
  boldText: {
    fontSize: 13,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  price: {
    fontSize: 30,
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
  roomStyle: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  nameStype: {
    color: '#00AAFF',
    fontSize: 15,
    marginTop: 1,
  },
});

export default Overview;
