import PostForm from '@/components/post/PostForm';
import {mapNavigation} from '@/constants';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigation.ADD_POST
>;

export default function AddPostScreen({route}: AddPostScreenProps) {
  const {location} = route.params;
  return <PostForm location={location} />;
}
