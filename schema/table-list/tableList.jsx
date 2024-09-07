import * as Yup from 'yup';

export const tableListSchema = Yup.object().shape({
  tableNo: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  photo: Yup.string(),
});
