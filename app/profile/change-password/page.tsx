/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import ChangePassword from '@/components/changePassword/ChangePassword';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import PopupModal from '@/components/common/PopupModal';
import withAllowedRole from '@/hoc/withAllowedRole';
import { handleLogout } from '@/redux/auth/auth-slice';
import { showNotification } from '@/redux/notification/notification-slice';
import { useAppDispatch } from '@/redux/selector';
import { ChangePasswordInputData, UserInfoData } from '@/types/changePassword';
import { CustomError } from '@/types/errorMessage';
import axiosInstance from '@/utils/axios';
import {
  API_ENDPOINT,
  AllRoles,
  CONFIRMATION_MESSAGES,
  ERROR_MESSAGES,
  PASSWORD_CHANGE_MESSAGES,
} from '@/utils/constant';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
const ChangePasswordFOrm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginUser, setLoginUser] = useState<UserInfoData>();
  const [showConfirmModal, setShowConformModal] = useState(false);
  const defaultValues = useRef<ChangePasswordInputData>({
    newPassword: '',
  });

  const router = useRouter();

  const dispatch = useAppDispatch();

  const getLoginUser = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINT.LOGGEDIN_USER);
      setLoginUser(response.data);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          showNotification({
            message: error.message,
            variant: 'error',
          }),
        );
      } else {
        dispatch(
          showNotification({
            message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            variant: 'error',
          }),
        );
      }
    }
  };

  useEffect(() => {
    getLoginUser();
  }, []);

  const passwordChangeRequest = async () => {
    toggleConfirmModal();
  };

  const logout = async () => {
    await dispatch(handleLogout());
    deleteCookie('lastPathBeforeLogin');
    router.push('/login');
  };

  const onSubmit = async (changePasswordData: ChangePasswordInputData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.patch(
        API_ENDPOINT.UPDATE_PASSWORD_CHANGE,
        changePasswordData,
      );

      if (response) {
        setLoading(false);
        dispatch(
          showNotification({
            message: PASSWORD_CHANGE_MESSAGES.PASSWORD_CHANGE_UPDATE_SUCCESS,
            variant: 'success',
          }),
        );
        logout();
      }
    } catch (error) {
      setLoading(false);
      let errorMessage: CustomError | undefined;
      if (error instanceof Error) {
        dispatch(
          showNotification({
            message: error.message,
            variant: 'error',
          }),
        );
      } else {
        errorMessage = error as CustomError; // Type assertion
        dispatch(
          showNotification({
            message: errorMessage
              ? errorMessage.message
              : ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            variant: 'error',
          }),
        );
      }
    }
  };

  const toggleConfirmModal = () => {
    defaultValues.current = {
      newPassword: '',
    };

    setShowConformModal((prevState) => !prevState);
  };

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col justify-between'>
        <h2 className='text-2xl font-semibold'>Change Password</h2>
        {/* <div
          className={`flexgrid  mt-4 flex w-full grid-cols-1  items-center justify-center gap-4`}>
          <Card className={`grid w-[30%] gap-4  md:col-span-2`}>
            <ChangePassword
              handleChangePasswordSubmit={onSubmit}
              loading={loading}
            />
          </Card>
        </div> */}
        <div className={`mt-4 flex   items-center justify-center gap-4`}>
          <Card className={`grid w-1/2 gap-4  md:col-span-2`}>
            <div className='container mx-auto'>
              <div className='grid gap-4'>
                <div className='grid gap-4'>
                  <p>{CONFIRMATION_MESSAGES.PASSWORD_CHANGE}</p>
                </div>
                <div className='flex justify-end space-x-4'>
                  <Button
                    type='submit'
                    isLoading={loading}
                    onClick={passwordChangeRequest}>
                    Proceed
                  </Button>
                </div>
              </div>
            </div>
            {/* {loginUser?.isPasswordChangeRequest && (
              <p>{CONFIRMATION_MESSAGES.PENDING_PASSWORD_CHANGE}</p>
            )}
            {loginUser?.isPasswordChangeRequest === false && (
              <ChangePassword
                handleChangePasswordSubmit={onSubmit}
                loading={loading}
              />
            )} */}
          </Card>
        </div>
      </div>
      <PopupModal
        isOpen={showConfirmModal}
        header='Change Password'
        onOpenChange={toggleConfirmModal}>
        <ChangePassword
          handleClose={toggleConfirmModal}
          handleChangePasswordSubmit={onSubmit}
          defaultValues={defaultValues.current}
          loading={loading}
        />
      </PopupModal>
    </div>
  );
};

export default withAllowedRole(ChangePasswordFOrm, AllRoles);
