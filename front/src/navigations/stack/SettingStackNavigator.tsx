import {createStackNavigator} from '@react-navigation/stack';
import {colors, settingNavigation} from '@/constants/';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft';

export type SettingStackParamList = {
  [settingNavigation.SETTING_HOME]: undefined;
  [settingNavigation.EDIT_PROFILE]: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();

export default function SettingStackNavigator() {
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
        name={settingNavigation.SETTING_HOME}
        component={SettingHomeScreen}
        options={({navigation}) => ({
          headerTitle: '설정',
          headerLeft: () => SettingHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={settingNavigation.EDIT_PROFILE}
        component={EditProfileScreen}
        options={({navigation}) => ({
          headerTitle: '프로필 수정',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        })}
      />
    </Stack.Navigator>
  );
}
