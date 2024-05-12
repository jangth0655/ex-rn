import {createStackNavigator} from '@react-navigation/stack';
import {mapNavigation} from '@/constants/';
import MapHomeScreen from '@/screens/map/MapHomeScreen';

export type MapStackParamList = {
  [mapNavigation.MAP_HOME]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

export default function MapStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={mapNavigation.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
