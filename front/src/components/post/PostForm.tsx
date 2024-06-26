import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import CustomButton from '@/components/common/CustomButton';
import DatePickerOption from '@/components/post/DatePickerOption';
import ImageInput from '@/components/post/ImageInput';
import InputField from '@/components/common/InputField';
import MarkerSelector from '@/components/post/MarkerSelector';
import PreviewImageList from '@/components/common/PreviewImageList';
import ScoreInput from '@/components/post/ScoreInput';
import {colors} from '@/constants';
import {useMutateCreatePost} from '@/hooks/queries/useMutateCreatePost';
import {useForm} from '@/hooks/useForm';
import {useGetAddress} from '@/hooks/useGetAddress';
import {useImagePicker} from '@/hooks/useImagePicker';
import {useModal} from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';

import {MarkerColor} from '@/types/domain';
import {validateAddPost} from '@/utils';
import {getDateWithSeparator} from '@/utils/date';
import {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {useDetailPostStore} from '@/store/useDetailPostStore';
import {useMutateUpdatePost} from '@/hooks/queries/useMutateUpdatePost';

interface Props {
  isEdit?: boolean;
  location: LatLng;
}

export default function PostForm({location, isEdit = false}: Props) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  usePermission('PHOTO');
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const {detailPost} = useDetailPostStore();
  const isEditMode = isEdit && detailPost;
  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
    },
    validate: validateAddPost,
  });

  const updatePost = useMutateUpdatePost();

  const imagePicker = useImagePicker({
    initialImages: isEditMode ? detailPost.images : [],
  });

  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED',
  );
  const [score, setScore] = useState(isEditMode ? detailPost.score : 5);
  const address = useGetAddress(location);
  const [date, setDate] = useState(
    isEditMode ? new Date(String(detailPost.date)) : new Date(),
  );
  const [isPicked, setIsPicked] = useState(false);
  const {hide, isVisible, show} = useModal();

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirmDate = () => {
    setIsPicked(true);
    hide();
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleScore = (score: number) => {
    setScore(score);
  };

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imagesUris,
    };

    if (isEditMode) {
      updatePost.mutate(
        {
          id: detailPost.id,
          body,
        },
        {
          onSuccess: () => navigation.goBack(),
        },
      );
      return;
    }

    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={
              isPicked || isEdit
                ? getDateWithSeparator(date, '. ')
                : '날짜 선택'
            }
            onPress={show}
          />
          <InputField
            placeholder="제목을 입력하세요."
            error={addPost.errors?.title}
            touched={addPost.touched?.title}
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            error={addPost.errors?.description}
            touched={addPost.touched?.description}
            blurOnSubmit={false}
            multiline
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector
            score={score}
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleScore} />
          <View style={styles.imagesViewer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <ImageInput onChange={imagePicker.handleChange} />
              <PreviewImageList
                imageUris={imagePicker.imagesUris}
                onDelete={imagePicker.deleteImageUri}
                onChangeOrder={imagePicker.changeImageUrisOrder}
                showOption
              />
            </ScrollView>
          </View>
          <DatePickerOption
            date={date}
            isVisible={isVisible}
            onConfirmDate={handleConfirmDate}
            onChangeDate={handleChangeDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  imagesViewer: {
    flexDirection: 'row',
  },
});
