import {ResponsePost, getFavoritePost} from '@/api';
import {queryKey} from '@/constants';
import {ResponseError} from '@/types/common';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

export function useGetInfiniteFavoritePost(
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getFavoritePost(pageParam),
    queryKey: [queryKey.POST, queryKey.FAVORITE, queryKey.GET_FAVORITE_POST],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPage.length + 1 : undefined;
    },
    ...queryOptions,
  });
}
