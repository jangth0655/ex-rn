import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootNavigator from './src/navigations/root/RootNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './src/api/queryClient';
import 'react-native-gesture-handler';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
