import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {Store} from 'redux';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';

// interface SetupProps {
//   MyComponent: JSX.Element;
//   store: Store;
// }

const Setup = (MyComponent: JSX.Element, store: Store) =>
  render(
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>{MyComponent}</NavigationContainer>
      </ApplicationProvider>
    </Provider>,
  );

export default Setup;
