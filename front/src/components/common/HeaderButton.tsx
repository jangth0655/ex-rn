import {colors} from '@/constants';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';

interface Props extends PressableProps {
  labelText?: string;
  icon?: React.ReactNode;
  hasError?: boolean;
}

export default function HeaderButton({
  icon,
  labelText,
  hasError,
  ...props
}: Props) {
  return (
    <Pressable disabled={hasError} style={styles.container} {...props}>
      {!labelText && icon}
      {!icon && labelText && (
        <Text style={[styles.text, hasError && styles.textError]}>
          {labelText}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.PINK_700,
  },
  textError: {
    color: colors.GRAY_200,
  },
});
