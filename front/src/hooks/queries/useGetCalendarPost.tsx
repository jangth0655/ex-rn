import {ResponseCalendarPost, getCalendarPosts} from '@/api';
import {queryKey} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

function useGetCalendarPost(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [queryKey.POST, queryKey.GET_CALENDAR_POST, year, , month],
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

export {useGetCalendarPost};
