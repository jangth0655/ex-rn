import {colors} from '@/constants';
import FeedFavoriteList from '@/screens/feed/FeedFavoriteList';
import {SafeAreaView, StyleSheet} from 'react-native';

export default function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedFavoriteList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
