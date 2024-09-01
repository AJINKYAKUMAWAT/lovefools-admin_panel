import { createTypedSelector } from '../selector';

export const selectNotification = createTypedSelector(
  (state) => state.notification,
);
