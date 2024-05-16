import {useDetailPostStore} from '@/store/useDetailPostStore';
import ImageCarousel from '../common/ImageCarousel';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigator} from '@/constants';

type ImageZoomScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigator.IMAGE_ZOOM
>;

export default function ImageZoomScreen({route}: ImageZoomScreenProps) {
  const {index} = route.params;
  const {detailPost} = useDetailPostStore();
  return (
    <ImageCarousel images={detailPost?.images ?? []} pressedIndex={index} />
  );
}
