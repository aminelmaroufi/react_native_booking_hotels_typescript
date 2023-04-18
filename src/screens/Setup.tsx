import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';

const Setup = (MyComponent, store) =>
  render(
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {/* <Home hotels={hotels_response.result.hotels} /> */}
          {MyComponent}
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>,
  );

export default Setup;
