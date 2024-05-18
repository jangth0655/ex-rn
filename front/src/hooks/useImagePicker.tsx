import {getFormDataImages} from '@/utils/image';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useMutateImages} from './queries/useMutateImages';
import {useState} from 'react';
import {ImageUri} from '@/types/domain';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

interface UseImagePickerProps {
  initialImages: ImageUri[];
}

export function useImagePicker({initialImages = []}: UseImagePickerProps) {
  const uploadImages = useMutateImages();
  const [imagesUris, setImageUris] = useState(initialImages);
  const addImageUri = (uris: string[]) => {
    if (imagesUris.length + uris.length > 5) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 5개입니다.');
      return;
    }

    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imagesUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUri = [...imagesUris];
    const [removeImage] = copyImageUri.splice(fromIndex, 1);
    copyImageUri.splice(toIndex, 0, removeImage);
    setImageUris(copyImageUri);
  };

  const handleChange = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images);

        uploadImages.mutate(formData, {
          onSuccess: data => addImageUri(data),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '갤러리를 열 수 없어요.',
            text2: '권한을 허용했는지 확인해주세요.',
            position: 'bottom',
          });
        }
      });
  };

  return {
    imagesUris,
    handleChange,
    deleteImageUri,
    changeImageUrisOrder,
  };
}
