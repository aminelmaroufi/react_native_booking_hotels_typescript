import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';
import {IBook} from '../models';

const Bookings = () => {
  const {bookings}: {bookings: Array<IBook>} = useSelector(
    (state: RootState) => state.book,
  );
  return (
    <Layout style={styles.layout}>
      {bookings.length === 0 && (
        <Layout style={styles.emptyList}>
          <Text style={styles.textMessage}>No Bookings found</Text>
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
});

export default Bookings;
