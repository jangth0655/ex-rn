import {useGetInfinitePost} from '@/hooks/queries/useGetInfinitePost';
import {FlatList, StyleSheet, View} from 'react-native';
import FeedItem from './FeedItem';
import {useState} from 'react';

export default function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePost();

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
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});
