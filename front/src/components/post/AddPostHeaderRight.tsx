import HeaderButton from '../common/HeaderButton';

export default function AddPostHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
}
