import PostForm from '@/components/post/PostForm';
import {feedNavigator} from '@/constants';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';

type EditPostScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigator.EDIT_POST
>;

export default function EditPostScreen({route}: EditPostScreenProps) {
  const {location} = route.params;
  return <PostForm location={location} isEdit />;
}
