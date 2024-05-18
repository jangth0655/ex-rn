import {colors, numbers} from '@/constants';
import {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  isVisible: boolean;
  hide: () => void;
  currentYear: number;
  onChangeYear: (year: number) => void;
}

export default function YearSelector({
  currentYear,
  hide,
  isVisible,
  onChangeYear,
}: Props) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const yearIndex = currentYear - numbers.MIN_CALENDAR_YEAR;
    const currentRow = Math.floor(
      yearIndex / numbers.CALENDAR_YEAR_SELECTOR_COLUMN,
    );

    const scrollToY = currentRow * 50;

    setScrollY(scrollToY);
  }, [isVisible, currentYear]);

  return (
    <>
      {isVisible && (
        <View style={styles.container}>
          <View style={styles.yearsContainer}>
            <FlatList
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              initialNumToRender={currentYear - numbers.MIN_CALENDAR_YEAR}
              contentOffset={{
                x: 0,
                y: scrollY,
              }}
              data={Array.from(
                {
                  length:
                    numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR + 1,
                },
                (_, index) => ({
                  id: index,
                  num: index + numbers.MIN_CALENDAR_YEAR,
                }),
              )}
              keyExtractor={item => String(item.id)}
              numColumns={numbers.CALENDAR_YEAR_SELECTOR_COLUMN}
              renderItem={({item}) => (
                <Pressable
                  key={item.id}
                  onPress={() => onChangeYear(item.num)}
                  style={[
                    styles.yearButton,
                    currentYear === item.num && styles.currentYearButton,
                  ]}>
                  <Text
                    style={[
                      styles.yearText,
                      currentYear === item.num && styles.currentYearText,
                    ]}>
                    {item.num}
                  </Text>
                </Pressable>
              )}
            />
          </View>
          <Pressable style={styles.closeButton}>
            <Text style={styles.closeText}>닫기</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              color={colors.GRAY_500}
            />
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  },
  yearsContainer: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {
    maxHeight: 200,
    backgroundColor: colors.WHITE,
  },
  yearButton: {
    width: 80,
    height: 40,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.GRAY_700,
  },
  currentYearText: {
    color: colors.WHITE,
    fontWeight: '600',
  },
  closeButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.GRAY_500,
  },
  closeText: {
    color: colors.BLACK,
    fontSize: 16,
  },
  currentYearButton: {
    backgroundColor: colors.PINK_700,
    borderColor: colors.PINK_700,
  },
});
