import {createDrawerNavigator} from '@react-navigation/drawer';

import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {mainNavigation} from '@/constants';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MainDrawerParamList = {
  [mainNavigation.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigation.FEED]: undefined;
  [mainNavigation.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name={mainNavigation.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
        }}
      />
      <Drawer.Screen name={mainNavigation.FEED} component={FeedHomeScreen} />
      <Drawer.Screen
        name={mainNavigation.CALENDAR}
        component={CalendarHomeScreen}
      />
    </Drawer.Navigator>
  );
}
