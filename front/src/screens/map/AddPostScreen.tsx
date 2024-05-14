import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import {colors, mapNavigation} from '@/constants';
import {useMutateCreatePost} from '@/hooks/queries/useMutateCreatePost';
import {useForm} from '@/hooks/useForm';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {MarkerColor} from '@/types/domain';
import {validateAddPost} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigation.ADD_POST
>;

export default function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });

  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    const body = {
      date: new Date(),
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: [],
    };
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
            value=""
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton variant="outlined" size="large" label="날짜 선택" />
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
});
