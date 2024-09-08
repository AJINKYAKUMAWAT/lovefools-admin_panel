import * as Yup from 'yup';

export const galleryListSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),

  type: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('Type is required'),
  photo: Yup.string(),
});
