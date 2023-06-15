import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IBook, IRoom} from '../models';
import {RootState} from '../redux/reducers';
import {RoomItem} from '../components/Rooms/RoomItem';
import {updateReservation} from '../redux/actions';

const CheckRooms: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const {book}: {book: IBook} = useSelector((state: RootState) => state.book);
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);

  const _selectRoom = (room: IRoom) => {
    let booking: IBook = book;
    const price: number = booking.night_numbers * room.price;
    booking = {...booking, price, room};
    dispatch(updateReservation(booking));
    // setTimeout(() => {
    //   dispatch(updateReservation(booking));
    // }, 2000);
    if (isLoggedIn) {
      navigation.navigate('Overview');
    } else {
      navigation.navigate('Account');
    }
  };

  const _renderItem = ({item, index}: {item: IRoom; index: number}) => {
    return (
      <RoomItem index={`item${index}`} room={item} selectRoom={_selectRoom} />
    );
  };

  return (
    <Layout testID="checkRooms" style={styles.container}>
      <FlatList
        testID="roomList"
        data={book.hotel.rooms}
        numColumns={1}
        keyExtractor={(item: IRoom) => item._id}
        renderItem={_renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default CheckRooms;
