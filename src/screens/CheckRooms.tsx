import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {IBook, IRoom} from '../models';
import {RootState} from '../redux/reducers';
import {RoomItem} from '../components/Rooms/RoomItem';
import {updateReservation} from '../redux/actions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const CheckRooms: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {book}: {book: IBook} = useSelector((state: RootState) => state.book);
  const {isLoggedIn}: boolean = useSelector((state: RootState) => state.auth);

  const _selectRoom = (room: IRoom) => {
    let booking: IBook = book;
    const price: number = booking.night_numbers * room.price;
    booking = {...booking, price, room};
    dispatch(updateReservation(booking));

    if (isLoggedIn) {
      props.navigation.navigate('Overview');
    } else {
      props.navigation.navigate('Account');
    }
  };

  const _renderItem = ({item}: {item: IRoom}) => {
    return <RoomItem room={item} selectRoom={_selectRoom} />;
  };

  return (
    <Layout style={styles.container}>
      <FlatList
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
