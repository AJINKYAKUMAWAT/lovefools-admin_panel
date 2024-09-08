import * as Yup from 'yup';

export const eventListSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),

  description: Yup.string().required('Description is required'),

  status: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('Status is required'),
  photo: Yup.string(),
});
