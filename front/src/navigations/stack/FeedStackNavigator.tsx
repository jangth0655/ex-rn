import {createStackNavigator} from '@react-navigation/stack';
import {feedNavigator} from '@/constants/';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedHomeHeaderLeft from '@/components/FeedHomeHeaderLeft';

export type FeedStackParamList = {
  [feedNavigator.FEED_HOME]: undefined;
  [feedNavigator.FEED_DETAIL]: undefined;
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
    </Stack.Navigator>
  );
}
