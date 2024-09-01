import { createTypedSelector } from '../selector';

export const getAssociatesWithClientInfo = createTypedSelector(
  (state) => state.amc,
);
