import SearchInput from '@/components/common/SearchInput';
import {useSearchLocation} from '@/hooks/queries/useSearchLocation';
import {useUserLocation} from '@/hooks/useUserLocation';
import {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';

export default function SearchLocationScreen() {
  const [keyword, setKeyword] = useState('');
  const {userLocation} = useUserLocation();
  useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        onSubmit={() => Keyboard.dismiss()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
