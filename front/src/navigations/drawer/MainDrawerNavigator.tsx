import {createDrawerNavigator} from '@react-navigation/drawer';

import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {colors, mainNavigation} from '@/constants';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';
import FeedTabNavigation, {FeedTabParamList} from '../tab/FeedTabNavigator';

export type MainDrawerParamList = {
  [mainNavigation.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigation.FEED]: NavigatorScreenParams<FeedTabParamList>;
  [mainNavigation.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerActions(
  route: RouteProp<MainDrawerParamList>,
  focused: boolean,
) {
  let iconName = '';

  switch (route.name) {
    case mainNavigation.HOME: {
      iconName = 'location-on';
      break;
    }
    case mainNavigation.FEED: {
      iconName = 'book';
      break;
    }
    case mainNavigation.CALENDAR: {
      iconName = 'event-note';
      break;
    }
  }

  return (
    <MaterialIcons
      name={iconName}
      size={18}
      color={focused ? colors.BLACK : colors.GRAY_500}
    />
  );
}

export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerType: 'front',
        drawerIcon: ({focused}) => DrawerActions(route, focused),
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
          backgroundColor: colors.WHITE,
        },
        drawerActiveTintColor: colors.BLACK,
        drawerInactiveTintColor: colors.GRAY_500,
        drawerActiveBackgroundColor: colors.PINK_200,
        drawerInactiveBackgroundColor: colors.GRAY_100,
        drawerLabelStyle: {
          fontWeight: '600',
        },
      })}>
      <Drawer.Screen
        name={mainNavigation.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen name={mainNavigation.FEED} component={FeedTabNavigation} />
      <Drawer.Screen
        name={mainNavigation.CALENDAR}
        component={CalendarHomeScreen}
      />
    </Drawer.Navigator>
  );
}
