import * as Yup from 'yup';

export const reciptSchema = Yup.object().shape({
  email: Yup.string().required('Name is required'),
  mobile: Yup.string().required('Description is required'),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
  price: Yup.string().required('Price is required'),
  menuType: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('Menu type is required'),
  subMenuType: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('Sub menu type is required'),
});
