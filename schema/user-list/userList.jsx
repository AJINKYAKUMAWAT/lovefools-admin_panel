import * as Yup from 'yup';

export const userListSchema = Yup.object().shape({
  mobileNo: Yup.string().required('Name is required'),
  name: Yup.string().required('Name is required'),
  emailId: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  photo: Yup.string(),
});
