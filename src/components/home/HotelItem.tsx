import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Rating} from 'react-native-elements';
import {IHotel} from '../../models';
import {baseURL} from '../../config/config';

type Props = {
  index: string;
  item: IHotel;
  onSelectHotel: (item: IHotel) => void;
};

export const HotelItem = (props: Props) => {
  const item: IHotel = props.item;

  return (
    <TouchableOpacity
      testID={props.index}
      style={styles.hotelRow}
      onPress={() => props.onSelectHotel(item)}>
      <Image
        source={{uri: `${baseURL}/files/${item.main_picture}/view`}}
        style={styles.imageStyle}
      />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.title}>{item.name}</Text>
          <Rating
            imageSize={13}
            readonly
            startingValue={item.rating}
            style={styles.iconAdressStyle}
          />
        </View>
        <View style={styles.row}>
          <Icon
            name="map-marker"
            size={12}
            color="#000"
            style={styles.iconAdressStyle}
          />
          <Text style={styles.adress}>{item.short_address}</Text>
        </View>
        <View style={styles.typeStyle}>
          <Text style={styles.room}>{item.type}</Text>
          <Text style={styles.price}>€{item.rooms[0].price}</Text>
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
    color: '#000',
    marginTop: 5,
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
  iconAdressStyle: {marginRight: 5, marginTop: 2},
});
