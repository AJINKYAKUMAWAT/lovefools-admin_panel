import * as Yup from 'yup';

export const reciptSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Price is required'),
  menuType: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('Menu type is required'),
  subMenuType: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('Sub menu type is required'),
  photo: Yup.string(),
});
