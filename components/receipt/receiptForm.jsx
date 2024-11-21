'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ControllerTextField from '@/components/common/ControllerTextField';
import Button from '@/components/common/Button';
import FormProvider from '@/components/common/FormProvider';
import { reciptSchema } from '@/schema/receipt/receipt';
import ControllerTextArea from '../common/ControllerTextArea';
import { generateOptions } from '@/utils/utils';
import { menuType, subMenuType } from '@/utils/constant';
import {
  ArrowUpTrayIcon,
  EyeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import ControllerSelect from '../common/ControllerSelect';
import { Tooltip } from '@nextui-org/react';
import ControllerDateTimePicker from '../common/ControllerDateTimePicker';
import ControllerDatePicker from '../common/ControllerDatePicker';

const ReceiptForm = ({ handleReceiptSubmit, handleClose, defaultValues }) => {
  const methods = useForm({
    resolver: yupResolver(reciptSchema),
    defaultValues,
    mode: 'onBlur',
  });
  const [fileName, setfileName] = useState(defaultValues.photo);
  const updateFileName = (name) => {
    setfileName(name);
  };

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    getValues,
    watch,
  } = methods;

  const onSubmit = async (data) => {
    handleReceiptSubmit(data);
  };

  const handleImageUpload = async (name, event) => {
    const { files } = event.target;

    const selectedFile = files && files.length ? files[0] : '';
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        // const { data } = await axiosInstance.post(
        //   `${API_ENDPOINT.IMAGE_UPLOAD}?fileType=${ImageUpload.DOCUMENTS}`,
        //   formData,
        //   config,
        // );

        console.log('selectedFile', selectedFile);

        setValue(name, selectedFile);
        clearErrors(name);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(watch('photo'));

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}>
      <div className='container mx-auto'>
        <div className='grid gap-4'>
          <div className='grid gap-4'>
            <ControllerTextField
              type='text'
              placeholder='Enter email id '
              name='email'
              label='Email'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerTextField
              type='text'
              placeholder='Enter mobile no. '
              name='mobile'
              label='Mobile No.'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerDatePicker
              placeholder='Enter Date '
              name='date'
              label='Date'
            />
          </div>{' '}
          <div className='grid gap-4'>
            <ControllerDateTimePicker
              name='time'
              label='Time'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerTextField
              type='text'
              placeholder='Enter Price '
              name='price'
              label='Price'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerSelect
              name='menuType'
              placeholder='Select menu type'
              options={generateOptions(menuType, 'id', 'type')}
              label='Type'
            />
          </div>
          <div className='grid gap-4'>
            <ControllerSelect
              name='subMenuType'
              placeholder='Select sub menu type'
              options={generateOptions(subMenuType, 'id', 'type')}
              label='Sub Type'
            />
          </div>
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              variant='bordered'
              onClick={handleClose}>
              Cancel
            </Button>
            <Button type='submit'>{defaultValues.id ? 'Update' : 'Add'}</Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default ReceiptForm;
