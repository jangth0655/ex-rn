import {Button, Text, View} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';

export default function MapHomeScreen() {
  const {logoutMutation} = useAuth();
  return (
    <View>
      <Text>맵 스크린</Text>
      <Button title="로그아웃" onPress={() => logoutMutation.mutate()} />
    </View>
  );
}
