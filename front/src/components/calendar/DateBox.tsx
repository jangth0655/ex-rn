import {colors} from '@/constants';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

interface Props {
  date: number;
  selectedDate: number;
  onPressDate: (date: number) => void;
  isToday: boolean;
}

const deviceWidth = Dimensions.get('window').width;

export default function DateBox({
  date,
  selectedDate,
  onPressDate,
  isToday,
}: Props) {
  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      {date > 0 && (
        <>
          <View
            style={[
              styles.dateContainer,
              selectedDate === date && styles.selectedContainer,
              selectedDate === date && isToday && styles.selectedTodayContainer,
            ]}>
            <Text
              style={[
                styles.dateText,
                selectedDate === date && styles.selectedDateText,
                isToday && styles.todayText,
              ]}>
              {date}
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 7,
    height: deviceWidth / 7,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    alignItems: 'center',
  },
  dateContainer: {
    marginTop: 5,
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 20,
  },
  dateText: {
    fontSize: 17,
    color: colors.BLACK,
  },
  selectedContainer: {
    backgroundColor: colors.BLACK,
  },
  selectedDateText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  todayText: {
    color: colors.PINK_700,
    fontWeight: 'bold',
  },
  selectedTodayContainer: {
    backgroundColor: colors.PINK_700,
  },
});
