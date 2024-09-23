import * as Yup from 'yup';

export const tableListSchema = Yup.object().shape({
  tableNo: Yup.string().required('Table no is required'),
  description: Yup.string().required('Description is required'),
  photo: Yup.mixed()
    .nullable()
    .test(
      'fileType',
      'Invalid file type',
      (value) => !value || value instanceof File,
    ),
});
