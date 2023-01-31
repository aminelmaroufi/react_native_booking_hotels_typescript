import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {IBook} from '../../models';
import {RootState} from '../../redux/reducers';

export const CardItem = (props: any) => {
  let {book}: {book: IBook} = useSelector((state: RootState) => state.book);

  const secure_number = (cvc: string) => {
    return '************' + cvc;
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginLeft: 15,
        marginBottom: 15,
        // backgroundColor: 'red',
      }}>
      <Image
        source={require('../../assets/visa.jpg')}
        style={{
          height: 20,
          width: 30,
          marginRight: 10,
        }}
      />
      <Text style={styles.qst}> {secure_number(props.card.number)} </Text>
      {book.card.id === props.card.id && (
        <TouchableOpacity style={styles.defaultCardContainer}>
          <Text style={styles.defaultCardStyle}> default card </Text>
        </TouchableOpacity>
      )}

      {book.card.id !== props.card.id && (
        <TouchableOpacity
          style={styles.defaultCardContainer}
          onPress={() => props.setDefaultCard(props.card)}>
          <Text style={styles.setDefaultStyle}> set default card </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  qst: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  defaultCardContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  defaultCardStyle: {
    color: '#888',
  },
  setDefaultStyle: {
    color: 'green',
    textDecorationLine: 'underline',
  },
});
