import {createStackNavigator} from '@react-navigation/stack';
import {mapNavigation} from '@/constants/';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddPostScreen from '@/screens/map/AddPostScreen';
import {LatLng} from 'react-native-maps';
import SearchLocationScreen from '@/screens/map/SearchLocationScreen';

export type MapStackParamList = {
  [mapNavigation.MAP_HOME]: undefined;
  [mapNavigation.ADD_POST]: {
    location: LatLng;
  };
  [mapNavigation.SEARCH_LOCATION]: undefined;
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
      <Stack.Screen
        name={mapNavigation.ADD_POST}
        component={AddPostScreen}
        options={{
          headerTitle: '장소 추가',
        }}
      />
      <Stack.Screen
        name={mapNavigation.SEARCH_LOCATION}
        component={SearchLocationScreen}
        options={{
          presentation: 'modal',
          headerTitle: '장소 검색',
        }}
      />
    </Stack.Navigator>
  );
}
