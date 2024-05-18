import {updatePost} from '@/api';
import {queryClient} from '@/api/queryClient';
import {queryKey} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

function useMutateUpdatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POST],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.MARKER, queryKey.GET_MARKERS],
      });

      queryClient.setQueryData(
        [queryKey.POST, queryKey.GET_POST, newPost.id],
        newPost,
      );
      queryClient.invalidateQueries({
        queryKey: [
          queryKey.POST,
          queryKey.GET_CALENDAR_POST,
          new Date(newPost.date).getFullYear(),
          new Date(newPost.date).getMonth() + 1,
        ],
      });
    },
    ...mutationOptions,
  });
}

export {useMutateUpdatePost};
