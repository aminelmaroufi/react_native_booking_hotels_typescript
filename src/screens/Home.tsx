import React, {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Layout} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {getHotels, selectHotel} from '../redux/actions';
import {RootState} from '../redux/reducers';
import {IHotel} from '../models';
import {HotelItem} from '../components/home/HotelItem';

type Props = {
  hotels: Array<IHotel>;
  navigation: NativeStackNavigationProp<any>;
};

const Home: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {hotels} = useSelector((state: RootState) => state.hotel);

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  const _renderItem = ({item}: {item: IHotel}) => {
    return <HotelItem item={item} onSelectHotel={onSelectHotel} />;
  };

  const onSelectHotel = (item: IHotel) => {
    dispatch(selectHotel(item));
    props.navigation?.navigate('HotelDetails');
  };

  return (
    <Layout style={styles.container}>
      {hotels.length > 0 && (
        <FlatList
          data={hotels}
          numColumns={1}
          keyExtractor={(item: IHotel) => item._id}
          renderItem={_renderItem}
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
