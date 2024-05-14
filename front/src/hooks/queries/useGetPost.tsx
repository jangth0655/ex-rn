import {ResponseSinglePost, getPost} from '@/api';
import {queryKey} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {useQuery} from '@tanstack/react-query';

export function useGetPost(
  id: number | null = null,
  queryOptions?: UseQueryCustomOptions<ResponseSinglePost>,
) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKey.POST, queryKey.GET_POST, id],
    enabled: Boolean(id),
    ...queryOptions,
  });
}
