import * as Yup from 'yup';

export const floorListSchema = Yup.object().shape({
  floorName: Yup.string().required('Name is required'),
});
