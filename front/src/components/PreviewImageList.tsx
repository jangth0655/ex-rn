import {ImageUri} from '@/types/domain';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

interface Props {
  imageUris: ImageUri[];
}

export default function PreviewImageList({imageUris}: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri}, index) => {
          return (
            <Pressable style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                key={index}
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030'
                      : 'http://192.168.0.42:3030'
                  }/${uri}`,
                }}
                style={styles.image}
              />
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {width: '100%', height: '100%'},
});
