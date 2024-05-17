import {FlatList, StyleSheet, Text, View} from 'react-native';

import {useState} from 'react';
import FeedItem from '@/components/feed/FeedItem';
import {useGetInfiniteFavoritePost} from '@/hooks/queries/useGetInfiniteFavoritePost';

export default function FeedFavoriteList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFavoritePost();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={({id}) => String(id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle="black"
      ListEmptyComponent={
        <View>
          <Text>즐겨찾기한 장소가 없습니다.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});
