import {createStackNavigator} from '@react-navigation/stack';
import AuthHomeScreen from '../../screens/AuthHomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import {authNavigation} from '../../constants';
import SignupScreen from '../../screens/SignupScreen';

export type AuthStackParamList = {
  [authNavigation.AUTH_HOME]: undefined;
  [authNavigation.LOGIN]: undefined;
  [authNavigation.SIGNUP]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authNavigation.AUTH_HOME}
        component={AuthHomeScreen}
      />
      <Stack.Screen name={authNavigation.LOGIN} component={LoginScreen} />
      <Stack.Screen name={authNavigation.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
}
