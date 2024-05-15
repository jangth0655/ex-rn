import {colorHex, colors, feedNavigator} from '@/constants';
import {useGetPost} from '@/hooks/queries/useGetPost';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-reanimated/lib/typescript/Animated';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getDateLocateForm, getDateWithSeparator} from '@/utils/date';
import PreviewImageList from '@/components/common/PreviewImageList';

type Props = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigator.FEED_DETAIL
>;

export default function FeedDetailScreen({route, navigation}: Props) {
  const {id} = route.params;
  const {data: post, isPending, isError} = useGetPost(id);

  if (isPending || isError) {
    return <></>;
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <Octicons
            name="arrow-left"
            size={30}
            color={colors.WHITE}
            onPress={() => navigation.goBack()}
          />
          <Ionicons name="ellipsis-vertical" size={30} color={colors.WHITE} />
        </View>
      </SafeAreaView>
      <View style={styles.imageContainer}>
        {post?.images.length > 0 && (
          <Image
            style={styles.image}
            source={{
              uri: `${
                Platform.OS === 'ios'
                  ? 'http://localhost:3030'
                  : 'http://192.168.0.42:3030'
              }/${post?.images[0].uri}`,
            }}
            resizeMode="cover"
          />
        )}

        {post.images.length === 0 && (
          <View style={styles.emptyImageContainer}>
            <Text>No Image</Text>
          </View>
        )}
      </View>

      <View style={styles.contentsContainer}>
        <View style={styles.addressContainer}>
          <Octicons name="location" size={10} color={colors.GRAY_500} />
          <Text
            style={styles.addressText}
            ellipsizeMode={'tail'}
            numberOfLines={1}>
            {post.address}
          </Text>
          <Text style={styles.titleText}>{post.title}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.infoColum}>
                <Text style={styles.infoColumKeyText}>방문날짜</Text>
                <Text style={styles.infoColumValueText}>
                  {getDateLocateForm(post.date)}
                </Text>
              </View>
              <View style={styles.infoColum}>
                <Text style={styles.infoColumKeyText}>평점</Text>
                <Text style={styles.infoColumValueText}>{post.score}점</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoColum}>
                <Text style={styles.infoColumKeyText}>마커색상</Text>
                <View
                  style={[
                    styles.markerColor,
                    {backgroundColor: colorHex[post.color]},
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.descriptionText}>{post.description}</Text>
      </View>

      {post.images.length > 0 && (
        <View style={styles.imageContentsContainer}>
          <PreviewImageList imageUris={post.images} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get('screen').width / 2,
    height: Dimensions.get('screen').width / 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  contentsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  infoContainer: {
    marginVertical: 20,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColum: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoColumKeyText: {
    color: colors.BLACK,
  },
  infoColumValueText: {
    color: colors.PINK_700,
  },
  markerColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  addressContainer: {
    gap: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 12,
  },
  descriptionText: {
    color: colors.BLACK,
    lineHeight: 25,
    fontSize: 16,
  },
  imageContentsContainer: {
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
});