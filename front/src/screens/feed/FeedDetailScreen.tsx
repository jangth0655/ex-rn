import {
  colorHex,
  colors,
  feedNavigator,
  mainNavigation,
  mapNavigation,
} from '@/constants';
import {useGetPost} from '@/hooks/queries/useGetPost';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getDateLocateForm} from '@/utils/date';
import PreviewImageList from '@/components/common/PreviewImageList';
import CustomButton from '@/components/common/CustomButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {useLocationStore} from '@/store/useLocation';
import {useModal} from '@/hooks/useModal';
import FeedDetailOption from '@/components/feed/FeedDetailOption';
import {useEffect} from 'react';
import {useDetailPostStore} from '@/store/useDetailPostStore';

type Props = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, typeof feedNavigator.FEED_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;

export default function FeedDetailScreen({route, navigation}: Props) {
  const {id} = route.params;
  const {data: post, isPending, isError} = useGetPost(id);
  const insets = useSafeAreaInsets();
  const {setMoveLocation} = useLocationStore();
  const detailOption = useModal();
  const {setDetailPost} = useDetailPostStore();

  useEffect(() => {
    post && setDetailPost(post);
  }, [post]);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressLocation = () => {
    const {latitude, longitude} = post;
    setMoveLocation({latitude, longitude});
    navigation.navigate(mainNavigation.HOME, {
      screen: mapNavigation.MAP_HOME,
    });
  };

  return (
    <>
      <ScrollView
        scrollIndicatorInsets={{right: 1}}
        style={
          insets.bottom
            ? [styles.container, {marginBottom: insets.bottom + 50}]
            : [styles.container, styles.scrollNoInsets]
        }>
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.header}>
            <Octicons
              name="arrow-left"
              size={30}
              color={colors.WHITE}
              onPress={() => navigation.goBack()}
            />
            <Ionicons
              name="ellipsis-vertical"
              size={30}
              color={colors.WHITE}
              onPress={detailOption.show}
            />
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

      <View style={[styles.bottomContainer, {paddingBottom: insets.bottom}]}>
        <View
          style={[
            styles.tabContainer,
            insets.bottom === 0 && styles.tabContainerNoInsets,
          ]}>
          <Pressable
            style={({pressed}) => [
              pressed && styles.bookmarkPressedContainer,
              styles.bookmarkContainer,
            ]}>
            <Octicons name="star-fill" size={30} color={colors.GRAY_100} />
          </Pressable>
          <CustomButton
            label="위치보기"
            size="medium"
            variant="filled"
            onPress={handlePressLocation}
          />
        </View>
      </View>

      <FeedDetailOption
        isVisible={detailOption.isVisible}
        hideOption={detailOption.hide}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  scrollNoInsets: {
    marginBottom: 65,
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
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_200,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tabContainerNoInsets: {
    marginBottom: 10,
  },
  bookmarkContainer: {
    backgroundColor: colors.PINK_700,
    height: '100%',
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  bookmarkPressedContainer: {
    opacity: 0.5,
  },
});
