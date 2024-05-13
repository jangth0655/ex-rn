import {mapNavigation} from '@/constants';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigation.ADD_POST
>;

export default function AddPostScreen({route}: AddPostScreenProps) {
  const {
    location: {latitude, longitude},
  } = route.params;

  return (
    <View>
      <Text>lat {latitude}</Text>
      <Text>long {longitude}</Text>
    </View>
  );
}
