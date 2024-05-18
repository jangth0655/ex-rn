import {deletePost} from '@/api';
import {queryClient} from '@/api/queryClient';
import {queryKey} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {Marker} from '@/types/domain';
import {useMutation} from '@tanstack/react-query';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: deleteId => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.MARKER, queryKey.GET_MARKERS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_CALENDAR_POST],
      });
      // queryClient.setQueryData<Marker[]>([queryKey.MARKER], existingMarkers => {
      //   return existingMarkers?.filter(marker => marker.id !== deleteId);
      // });
    },
    ...mutationOptions,
  });
}

export {useMutateDeletePost};
