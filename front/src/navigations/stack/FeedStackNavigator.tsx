import {createStackNavigator} from '@react-navigation/stack';
import {colors, feedNavigator} from '@/constants/';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import {LatLng} from 'react-native-maps';
import EditPostScreen from '@/screens/feed/EditPostScreen';

export type FeedStackParamList = {
  [feedNavigator.FEED_HOME]: undefined;
  [feedNavigator.FEED_DETAIL]: {
    id: number;
  };
  [feedNavigator.EDIT_POST]: {location: LatLng};
};

const Stack = createStackNavigator<FeedStackParamList>();

export default function FeedStackNavigator() {
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
        name={feedNavigator.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={feedNavigator.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.GRAY_100,
          },
        }}
      />
      <Stack.Screen
        name={feedNavigator.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: '장소 수정',
        }}
      />
    </Stack.Navigator>
  );
}
