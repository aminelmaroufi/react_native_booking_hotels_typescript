/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Ref, RefObject, useEffect} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import * as eva from '@eva-design/eva';
import {useSelector, useDispatch} from 'react-redux';
import {ApplicationProvider, Layout, Spinner} from '@ui-kitten/components';
import DropdownAlert from 'react-native-dropdownalert';
import {RootState} from './src/redux/reducers';
import RootNavigation from './src/navigation';
import {navigationRef} from './src/navigation/rootNavigation';
import {checkUser} from './src/redux/actions';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const App = () => {
  let dropDownAlertRef: any;
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const {user, fetching, message, error, success} = useSelector(
    (state: RootState) => state.auth,
  );

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

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
  }, [error, success]);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
      {fetching && (
        <Layout style={styles.spinnerLayout}>
          <Spinner status={'control'} size={'large'} />
        </Layout>
      )}
      <RootNavigation ref={navigationRef} />
      {(error || success) && (
        <DropdownAlert ref={ref => (dropDownAlertRef = ref)} />
      )}
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  spinnerLayout: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2756a1',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    opacity: 0.4,
  },
});

export default App;
