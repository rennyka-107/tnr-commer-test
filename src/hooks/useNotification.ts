import type { ContextValue } from '../context/NotificationContext';
import { NotificationContext } from '../context/NotificationContext';
import { useContext } from 'react';

const useNotification = (): ContextValue => {
  const notificationContext = useContext(NotificationContext);

  if (!notificationContext) {
    throw new Error('Forgot to wrap component in NotificationProvider');
  }

  return notificationContext;
};

export default useNotification;
