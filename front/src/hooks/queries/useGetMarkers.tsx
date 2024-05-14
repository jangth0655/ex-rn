import {getMarkers} from '@/api';
import {queryKey} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {Marker} from '@/types/domain';
import {useQuery} from '@tanstack/react-query';

export function useGetMarkers(queryOptions?: UseQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKey.GET_MARKERS, queryKey.GET_MARKERS],
    ...queryOptions,
  });
}
