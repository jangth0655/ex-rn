type UserInformation = {
  email: string;
  password: string;
};

export function validateLogin(values: UserInformation) {
  const errors: Record<keyof UserInformation, string> = {
    email: '',
    password: '',
  };
  if (!/^[^\s@]+@[^\s@]+\.[^s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (values.password.length >= 8 && values.password.length <= 20) {
    errors.password = '비밀번호는  8~20 사이로 입력해주세요.';
  }

  return errors;
}
