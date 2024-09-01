import { showNotification } from '@/redux/notification/notification-slice';
import { useAppDispatch } from '@/redux/selector';
import { ErrorProps } from '@/types/errorMessage';
import { ERROR_MESSAGES } from '@/utils/constant';
import { useEffect } from 'react';

const ErrorHandling: React.FC<ErrorProps> = ({ error }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const errorMessage: string =
      error instanceof Error ? error.message : String(error);

    dispatch(
      showNotification({
        message: errorMessage || ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        variant: 'error',
      }),
    );
  }, [dispatch, error]);

  return null;
};

export default ErrorHandling;
