'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ControllerTextField from '@/components/common/ControllerTextField';
import Button from '@/components/common/Button';
import FormProvider from '@/components/common/FormProvider';
import { floorListSchema } from '@/schema/floor-list/floorList';

const FloorListForm = ({
  handleFloorListSubmit,
  handleClose,
  defaultValues,
}) => {
  const methods = useForm({
    resolver: yupResolver(floorListSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log('data', data);

    handleFloorListSubmit(data);
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}>
      <div className='container mx-auto'>
        <div className='grid gap-4'>
          <div className='grid gap-4'>
            <ControllerTextField
              type='text'
              placeholder='Enter floor name '
              name='floorName'
              label='Floor Name'
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

export default FloorListForm;
