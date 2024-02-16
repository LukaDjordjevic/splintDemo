import React from 'react';
import {Provider} from 'react-redux';
import {
  RadioButton,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
// import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import store from './src/store/store';
import Home from './src/pages/Home';
import StockDetails from './src/pages/StockDetails';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Stock details"
              component={StockDetails}
              // options={{title: ''}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
