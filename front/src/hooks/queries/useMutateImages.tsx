import {uploadImage} from '@/api';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

export function useMutateImages(mutationOption?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImage,
    ...mutationOption,
  });
}
