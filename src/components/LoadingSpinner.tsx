import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

type LoadingSpinnerProps = {
  visible: boolean;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({visible}) => {
  if (!visible) return null;
  return (
    <ActivityIndicator
      animating={true}
      color={'darkblue'}
      size="large"
      style={styles.activityIndicator}
    />
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default LoadingSpinner;
