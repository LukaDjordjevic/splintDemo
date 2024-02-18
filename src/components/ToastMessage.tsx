import React, {useEffect, useState} from 'react';
import {Portal, Snackbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectToastMessage} from '../store/appSlice';

type ToastMessageProps = {};

const ToastMessage: React.FC<ToastMessageProps> = () => {
  const message = useSelector(selectToastMessage);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
    }
  }, [message]);

  return (
    <Portal>
      <Snackbar
        visible={isVisible}
        onDismiss={() => {
          setIsVisible(false);
        }}
        action={{
          label: 'Close',
        }}>
        {message}
      </Snackbar>
    </Portal>
  );
};

export default ToastMessage;
