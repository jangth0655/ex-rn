import {colors, feedNavigator, feedTapNavigation} from '@/constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import FeedFavoriteScreen from '@/components/feed/FeedFavoriteScreen';
import {StyleSheet} from 'react-native';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';

export type FeedTabParamList = {
  [feedTapNavigation.FEED_HOME]: {
    screen: typeof feedNavigator.FEED_DETAIL;
    params: {
      id: number;
    };
    initial: false;
  };
  [feedTapNavigation.FEED_FAVORITE]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function TabBarIcons(route: RouteProp<FeedTabParamList>, focused: boolean) {
  let iconName = '';
  switch (route.name) {
    case feedTapNavigation.FEED_HOME: {
      iconName = focused ? 'reader' : 'reader-outline';
      break;
    }
    case feedTapNavigation.FEED_FAVORITE: {
      iconName = focused ? 'start' : 'start-outline';
      break;
    }
  }

  return (
    <Ionicons
      name={iconName}
      size={25}
      color={focused ? colors.PINK_700 : colors.GRAY_500}
    />
  );
}

function FeedTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: colors.WHITE,
          shadowColor: colors.GRAY_200,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.BLACK,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.PINK_700,
        tabBarStyle: {
          backgroundColor: colors.WHITE,
          borderLeftColor: colors.GRAY_200,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
        tabBarIcon: ({focused}) => TabBarIcons(route, focused),
      })}>
      <Tab.Screen
        name={feedTapNavigation.FEED_HOME}
        component={FeedStackNavigator}
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: (tabRoute => {
            const routeName = getFocusedRouteNameFromRoute(tabRoute);

            if (
              routeName === feedNavigator.FEED_DETAIL ||
              routeName === feedNavigator.EDIT_POST ||
              routeName === feedNavigator.IMAGE_ZOOM
            ) {
              return {display: 'none'};
            }
            return {
              backgroundColor: colors.WHITE,
              borderLeftColor: colors.GRAY_200,
              borderTopWidth: StyleSheet.hairlineWidth,
            };
          })(route),
        })}
      />
      <Tab.Screen
        name={feedTapNavigation.FEED_FAVORITE}
        component={FeedFavoriteScreen}
        options={({navigation}) => ({
          headerTitle: '즐겨찾기',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
    </Tab.Navigator>
  );
}

export default FeedTabNavigation;
