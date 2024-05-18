import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import {PropsWithChildren} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Text, View} from 'react-native';
import CustomButton from './CustomButton';

export default function RetryErrorBoundary({children}: PropsWithChildren) {
  const {reset} = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({resetErrorBoundary}) => (
        <View>
          <Text>잠시 후 다시 시도해주세요.</Text>
          <Text>요청 사항을 처리하는데 실패했습니다..</Text>
          <CustomButton
            label=""
            size="medium"
            variant="outlined"
            onPress={resetErrorBoundary}
          />
        </View>
      )}>
      {children}
    </ErrorBoundary>
  );
}
