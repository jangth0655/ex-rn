import {createPost} from '@/api';
import {queryClient} from '@/api/queryClient';
import {queryKey} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {Marker} from '@/types/domain';
import {useMutation} from '@tanstack/react-query';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.MARKER, queryKey.GET_MARKERS],
      });
      // queryClient.setQueryData<Marker[]>(
      //   [queryKey.MARKER, queryKey.GET_MARKERS],
      //   existingMarkers => {
      //     const newMarker = {
      //       id: newPost.id,
      //       latitude: newPost.latitude,
      //       longitude: newPost.longitude,
      //       color: newPost.color,
      //       score: newPost.score,
      //     };

      //     return existingMarkers
      //       ? [...existingMarkers, newMarker]
      //       : [newMarker];
      //   },
      // );
    },
    ...mutationOptions,
  });
}

export {useMutateCreatePost};
