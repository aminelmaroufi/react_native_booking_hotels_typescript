import React, {useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import {Layout, Input} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getHotels, getMoreHotels, selectHotel} from '../redux/actions';
import {RootState} from '../redux/reducers';
import {IHotel} from '../models';
import {HotelItem} from '../components/home/HotelItem';

// type Props = {
//   hotels: Array<IHotel>;
// };

const SearchIcon = () => (
  <Icon style={styles.searchIcon} name="search" size={20} color="#444" />
);

const Home: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const {hotels, pages, page} = useSelector((state: RootState) => state.hotel);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [q, setTermText] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setRefreshing(false);
  }, [hotels]);

  useEffect(() => {
    const params = {
      q: '',
      page: 1,
    };
    dispatch(getHotels(params));
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, [dispatch]);

  useEffect(() => {
    if ((q.length >= 3 || q === '') && mounted) {
      const timeoutId = setTimeout(() => {
        const params = {
          q,
          page: 1,
        };
        dispatch(getHotels(params));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [q]);

  const _renderItem = ({item, index}: {item: IHotel; index: number}) => {
    return (
      <HotelItem
        index={`item${index}`}
        item={item}
        onSelectHotel={onSelectHotel}
      />
    );
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
    <Layout testID="Home" style={styles.container}>
      <Input
        testID="search-box"
        placeholder="Search hotel by name, city ...."
        accessoryRight={SearchIcon}
        onChangeText={value => setTermText(value)}
        onSubmitEditing={() => do_search()}
        style={styles.searchInput}
      />
      {hotels.length > 0 ? (
        <FlatList
          testID="hotels-list"
          data={hotels}
          numColumns={1}
          keyExtractor={(item: IHotel) => item._id}
          renderItem={_renderItem}
          onEndReachedThreshold={0.7}
          onEndReached={onLoadMore}
          refreshing={refreshing}
          onRefresh={_handleRefresh}
        />
      ) : (
        <Layout style={styles.noContentView}>
          <Text>No hotels found</Text>
        </Layout>
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
  noContentView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export default Home;
