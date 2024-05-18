import Calendar from '@/components/calendar/Calendar';
import EventList from '@/components/calendar/EventList';
import {colors} from '@/constants';
import {useGetCalendarPost} from '@/hooks/queries/useGetCalendarPost';
import {getMonthYearDetails, getNewMonthYear} from '@/utils/date';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPost(monthYear.year, monthYear.month);

  if (isPending || isError) return <></>;

  const [selectedDate, setSelectedDate] = useState(0);

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        schedules={posts}
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
        onPressDate={handlePressDate}
        selectedDate={selectedDate}
      />
      <EventList posts={posts[selectedDate]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
