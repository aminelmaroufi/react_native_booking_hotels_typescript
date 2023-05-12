import React, {useEffect} from 'react';
import {StyleSheet, Text, FlatList} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {BookingItem} from '../components/bookings/BookingItem';
import {RootState} from '../redux/reducers';
import {IBook} from '../models';
import {getBookings} from '../redux/actions';

const Bookings: React.FC = () => {
  const dispatch = useDispatch();
  const {bookings}: {bookings: Array<IBook>} = useSelector(
    (state: RootState) => state.book,
  );

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  const _renderItem = ({item}: {item: IBook}) => {
    return <BookingItem booking={item} />;
  };

  return (
    <Layout style={styles.layout}>
      {bookings.length === 0 && (
        <Layout style={styles.emptyList}>
          <Text style={styles.textMessage}>No Bookings found</Text>
        </Layout>
      )}
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          numColumns={1}
          keyExtractor={(item: IBook) => item._id}
          renderItem={_renderItem}
        />
      ) : (
        <Layout style={styles.noContentView}>
          <Text>No bookings found</Text>
        </Layout>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMessage: {
    fontSize: 17,
    fontStyle: 'italic',
  },
  noContentView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Bookings;
