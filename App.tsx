/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, useColorScheme, SafeAreaView} from 'react-native';
import * as eva from '@eva-design/eva';
import {useSelector} from 'react-redux';
import {ApplicationProvider, Layout, Spinner} from '@ui-kitten/components';
import {RootState} from './src/redux/reducers';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import RootNavigation from './src/navigation/rootNavigation';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {fetching} = useSelector((state: RootState) => state.auth);
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
      {fetching && (
        <Layout style={styles.spinnerLayout}>
          <Spinner status={'control'} size={'large'} />
        </Layout>
      )}
      <RootNavigation />
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
