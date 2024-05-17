import {updateFavorite} from '@/api';
import {queryClient} from '@/api/queryClient';
import {queryKey} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

function useMutateFavoritePost(mutationOption?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavorite,
    onSuccess: updateId => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POST, updateId],
      });
      queryClient.invalidateQueries({
        queryKey: [
          queryKey.POST,
          queryKey.FAVORITE,
          queryKey.GET_FAVORITE_POST,
        ],
      });
    },
    ...mutationOption,
  });
}

export {useMutateFavoritePost};
