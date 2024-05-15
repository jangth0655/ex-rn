import {colors} from '@/constants';
import {ImageUri} from '@/types/domain';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

interface Props {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  onChangeOrder?: (fromIndex: number, toIndex: number) => void;
  showOption?: boolean;
}

export default function PreviewImageList({
  imageUris,
  onDelete,
  onChangeOrder,
  showOption = false,
}: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri}, index) => (
          <Pressable key={index} style={styles.imageContainer}>
            <Image
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030'
                    : 'http://192.168.0.42:3030'
                }/${uri}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
            {showOption && (
              <>
                <Pressable
                  style={[styles.imageButton, styles.deleteButton]}
                  onPress={() => onDelete && onDelete(uri)}>
                  <IonIcons name="close" size={16} color={colors.WHITE} />
                </Pressable>

                {index > 0 && (
                  <Pressable
                    style={[styles.imageButton, styles.moveLeftButton]}
                    onPress={() =>
                      onChangeOrder && onChangeOrder(index, index - 1)
                    }>
                    <IonIcons
                      name="arrow-back-outline"
                      size={16}
                      color={colors.WHITE}
                    />
                  </Pressable>
                )}
                {index < imageUris.length - 1 && (
                  <Pressable
                    style={[styles.imageButton, styles.moveRightButton]}
                    onPress={() =>
                      onChangeOrder && onChangeOrder(index, index + 1)
                    }>
                    <IonIcons
                      name="arrow-forward-outline"
                      size={16}
                      color={colors.WHITE}
                    />
                  </Pressable>
                )}
              </>
            )}
          </Pressable>
        ))}
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
  imageButton: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },
  deleteButton: {
    top: 0,
    right: 0,
  },
  moveLeftButton: {
    bottom: 0,
    left: 0,
  },
  moveRightButton: {
    bottom: 0,
    right: 0,
  },
});
