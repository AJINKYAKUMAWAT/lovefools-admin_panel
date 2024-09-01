import * as Yup from 'yup';

export const amcSchema = Yup.object().shape({
  serviceName: Yup.string()
    .required('Service name is required')
    .max(50, ' Service name must be less than 50 characters'),
  serviceCompanyName: Yup.string()
    .required('Service company name is required')
    .max(50, ' Service company name must be less than 50 characters'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  amount: Yup.string()
    .required('Amount is required')
    .max(13, ' Amount must be less than 13 characters'),
});
