/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as eva from '@eva-design/eva';
import {useSelector, useDispatch} from 'react-redux';
import {ApplicationProvider, Layout, Spinner} from '@ui-kitten/components';
import DropdownAlert from 'react-native-dropdownalert';
import {RootState} from './src/redux/reducers';
import RootNavigation from './src/navigation';
import {navigationRef} from './src/navigation/rootNavigation';
import {checkUser} from './src/redux/actions';

const App = () => {
  let dropDownAlertRef: any;
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const {fetching, message, error, success} = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    const showToast = () => {
      if (message.length) {
        dropDownAlertRef?.alertWithType(
          success ? 'success' : 'error',
          success ? 'Success' : 'Error',
          message,
        );
      }
    };

    showToast();
  }, [dropDownAlertRef, error, success, message]);

  useEffect(() => {
    SplashScreen.hide();
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
      <RootNavigation ref={navigationRef} />
      {fetching && (
        <Layout style={styles.spinnerLayout}>
          <Spinner status={'control'} size={'large'} />
        </Layout>
      )}

      {(error || success) && (
        <DropdownAlert ref={ref => (dropDownAlertRef = ref)} />
      )}
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  spinnerLayout: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2756a1',
    zIndex: 9999,
    opacity: 0.4,
  },
});

export default App;
