import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const ServerError: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Layout style={styles.container}>
      <View style={styles.body}>
        <Image
          source={require('../assets/status500.jpg')}
          style={styles.image}
        />
        <Text style={styles.title}>
          There was an error, please try again later
        </Text>
        <Text style={styles.subTitle}>
          The server encountered an internal error and was not able to complete
          your request
        </Text>
      </View>
      <Button
        title={'Refresh'}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.textButton}
        type="solid"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          } as any)
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 400,
    width: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {width: 'auto'},
  button: {
    backgroundColor: '#2756a1',
    borderRadius: 10,
    width: '100%',
    height: 50,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ServerError;
