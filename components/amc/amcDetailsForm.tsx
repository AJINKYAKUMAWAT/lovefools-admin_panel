'use client';
import React from 'react';
import { Roles } from '@/utils/constant';
import ControllerTextField from '../common/ControllerTextField';
import AuthChecker from '../common/AuthChecker';
import { useFormContext } from 'react-hook-form';
import ControllerDatePicker from '../common/ControllerDatePicker';

const AmcDetailsForm = () => {
  const { setValue, watch } = useFormContext();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <AuthChecker
      allowedRoles={[Roles.HR_ADMIN, Roles.ADMIN, Roles.ACCOUNT_ADMIN]}>
      {(isAuthorised: boolean) => (
        <>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <ControllerTextField
              type='text'
              placeholder='Service Name'
              name='serviceName'
              isDisabled={!isAuthorised}
              label='Service Name'
            />
            <ControllerTextField
              type='text'
              placeholder='Service Company Name'
              name='serviceCompanyName'
              isDisabled={!isAuthorised}
              label='Service Company Name'
            />
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <ControllerDatePicker
              placeHolder='Select Start Date'
              name='startDate'
              isDisabled={!isAuthorised}
              label='Start Date'
            />
            <ControllerDatePicker
              placeHolder='Select End Date'
              name='endDate'
              isDisabled={!isAuthorised}
              label='End Date'
              minDate={watch('startDate')}
            />
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <ControllerTextField
              type='text'
              placeholder='Amount'
              name='amount'
              isDisabled={!isAuthorised}
              variantType='amount'
              label='Amount'
              onChange={(event) => {
                let value = event
                  .replace(/[^\d.,]+/g, '')
                  .replace(/^0+(\d)/, '$1')
                  .replace(/^\.*/, '')
                  .replace(/(\.\d{2})\d+/, '$1');
                if (value === '') {
                  value = '';
                }
                setValue('amount', value);
              }}
            />
          </div>
        </>
      )}
    </AuthChecker>
  );
};

export default AmcDetailsForm;
