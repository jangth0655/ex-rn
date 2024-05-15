import {useMutateDeletePost} from '@/hooks/useMutateDeletePost';
import {CompoundOption} from '../common/CompoundOption';
import {useDetailPostStore} from '@/store/useDetailPostStore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {Alert} from 'react-native';
import {alerts, feedNavigator} from '@/constants';

interface Props {
  isVisible: boolean;
  hideOption: () => void;
}

export default function FeedDetailOption({hideOption, isVisible}: Props) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const deletePost = useMutateDeletePost();
  const {detailPost} = useDetailPostStore();

  const handleDeletePost = () => {
    if (!detailPost) return;
    Alert.alert(alerts.DELETE_POST.TITLE, alerts.DELETE_POST.DESCRIPTION, [
      {
        text: '삭제',
        onPress: () => {
          deletePost.mutate(detailPost.id, {
            onSuccess: () => {
              hideOption();
              navigation.goBack();
            },
          });
        },
        style: 'destructive',
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };

  const handleEditPost = () => {
    if (!detailPost) return;
    navigation.navigate(feedNavigator.EDIT_POST, {
      location: {
        latitude: detailPost?.latitude,
        longitude: detailPost?.longitude,
      },
    });
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button isDanger onPress={handleDeletePost}>
            삭제하기
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button onPress={handleEditPost}>
            수정하기
          </CompoundOption.Button>
        </CompoundOption.Container>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소하기
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}
