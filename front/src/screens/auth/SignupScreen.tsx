import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputField from '@/components/InputField';
import {useForm} from '@/hooks/useForm';
import CustomButton from '@/components/CustomButton';
import {validateSignUp} from '@/utils';
import {useRef} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import useAuth from '@/hooks/queries/useAuth';

export default function SignupScreen() {
  const {signupMutation, loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignUp,
  });

  const handleSubmit = async () => {
    const {email, password} = signup.values;

    signupMutation.mutate(signup.values, {
      onSuccess: () => loginMutation.mutate({email, password}),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors?.email}
          touched={signup.touched?.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={signup.errors?.password}
          touched={signup.touched?.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signup.errors?.passwordConfirm}
          touched={signup.touched?.passwordConfirm}
          secureTextEntry
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    paddingHorizontal: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});
