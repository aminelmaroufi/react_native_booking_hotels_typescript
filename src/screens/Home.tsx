import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Layout, Input} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {useNavigation} from '@react-navigation/native';
import {getHotels, getMoreHotels, selectHotel} from '../redux/actions';
import {RootState} from '../redux/reducers';
import {IHotel} from '../models';
import {HotelItem} from '../components/home/HotelItem';

// type Props = {
//   hotels: Array<IHotel>;
// };

const Home: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {hotels, pages, page} = useSelector((state: RootState) => state.hotel);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm] = useState(() => new Subject());
  const [q, setTermText] = useState('');

  const SearchIcon = () => (
    <Icon style={styles.searchIcon} name="search" size={20} color="#444" />
  );

  useEffect(() => {
    dispatch(getHotels({q: '', page: 1}));
  }, []);

  useEffect(() => {
    setRefreshing(false);
  }, [hotels]);

  useEffect(() => {
    const subscription = searchTerm
      .pipe(debounceTime(300))
      .subscribe((term: string) => {
        if (term.length === 0 || term.length > 2) {
          const params = {
            q: term,
            page: 1,
          };
          dispatch(getHotels(params));
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [searchTerm]);

  useEffect(() => {
    searchTerm.next(q);
  }, [q]);

  const _renderItem = ({item}: {item: IHotel}) => {
    return <HotelItem item={item} onSelectHotel={onSelectHotel} />;
  };

  const onSelectHotel = (item: IHotel) => {
    dispatch(selectHotel(item));
    navigation?.navigate('HotelDetails');
  };

  const _handleRefresh = () => {
    console.log('refreshing...');
    setRefreshing(true);
    dispatch(getMoreHotels({q: '', page: 1}));
  };

  const onLoadMore = () => {
    if (page < pages) {
      dispatch(getMoreHotels({q: '', page: page + 1}));
    }
  };

  const do_search = () => {
    // dispatch(getHotels({q: value, page: page + 1}));
  };

  return (
    <Layout style={styles.container}>
      <Input
        testID="search-box"
        placeholder="Search hotel by name, city ...."
        accessoryRight={SearchIcon}
        onChangeText={nextValue => setTermText(nextValue)}
        onSubmitEditing={() => do_search()}
        style={styles.searchInput}
      />
      {hotels.length > 0 && (
        <FlatList
          data={hotels}
          numColumns={1}
          keyExtractor={(item: IHotel) => item._id}
          renderItem={_renderItem}
          onEndReachedThreshold={0.7}
          onEndReached={onLoadMore}
          refreshing={refreshing}
          onRefresh={_handleRefresh}
        />
      )}
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 0,
  },
  searchInput: {
    backgroundColor: '#ddd',
    borderRadius: 100,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 5,
    color: '#888',
  },
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
export default Home;
