import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {baseURL} from '../../config/config';
import {IRoom} from '../../models';

type Props = {
  room: IRoom;
  selectRoom: (item: IRoom) => void;
};
export const RoomItem = (props: Props) => {
  const item = props.room;

  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subTitle}>non-refundable</Text>

          <View style={[styles.row, {marginTop: 15}]}>
            <Icon
              name="group"
              size={12}
              color="#000"
              style={{marginRight: 5}}
            />
            <Text style={styles.groupStyle}>Price for 2 adults</Text>
          </View>
        </View>
        <Image
          source={{uri: `${baseURL}/files/${item.room_picture}/view`}}
          style={{
            height: 70,
            width: 60,
            marginTop: 10,
          }}
        />
      </View>
      <View style={[styles.row, {marginTop: 15}]}>
        <Icon name="compress" size={12} color="#000" style={{marginRight: 5}} />
        <Text style={styles.groupStyle}>Room size 20 m²</Text>
      </View>
      <View style={[styles.row, {marginTop: 15}]}>
        <Icon
          name="coffee"
          size={12}
          color="#2756a1"
          style={{marginRight: 5}}
        />
        <Text style={styles.foodStyle}>{item.advantage}</Text>
      </View>
      <View style={[styles.row, {marginTop: 30}]}>
        <View style={[styles.row, {marginRight: 10}]}>
          <Icon
            name="wifi"
            size={12}
            color="#2756a1"
            style={{marginRight: 5}}
          />
          <Text style={styles.foodStyle}>Free WIFI</Text>
        </View>
        <View style={[styles.row, {marginRight: 10}]}>
          <Icon
            name="bath"
            size={12}
            color="#2756a1"
            style={{marginRight: 5}}
          />
          <Text style={styles.foodStyle}>Bath</Text>
        </View>
        <View style={[styles.row, {marginRight: 10}]}>
          <Icon
            name="code"
            size={12}
            color="#2756a1"
            style={{marginRight: 5, marginTop: 2}}
          />
          <Text style={styles.foodStyle}>Air conditioning</Text>
        </View>
        <View style={[styles.row, {marginRight: 15}]}>
          <Icon
            name="shower"
            size={12}
            color="#2756a1"
            style={{marginRight: 5}}
          />
          <Text style={styles.foodStyle}>Private bathroom</Text>
        </View>
      </View>
      <Text style={styles.price}>€{item.price}</Text>
      <View style={{flex: 1, marginTop: 30}}>
        <Button
          title="Select"
          containerStyle={{width: 'auto'}}
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
          type="solid"
          onPress={() => props.selectRoom(item)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  item: {
    flex: 1,
    borderBottomWidth: 2,
    paddingBottom: 10,
    borderBottomColor: '#f4ab49',
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 17,
    color: '#2756a1',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    color: '#000',
    marginTop: 5,
  },
  groupStyle: {
    fontSize: 13,
    color: '#000',
  },
  foodStyle: {
    fontSize: 13,
    color: '#2756a1',
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#2756a1',
  },
  textButton: {
    color: '#2756a1',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
