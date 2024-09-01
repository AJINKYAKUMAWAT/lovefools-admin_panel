'use client';
import { Roles, API_ENDPOINT, ERROR_MESSAGES } from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';
import { useParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/selector';
import FileManager from '@/components/common/FileManager';
import axiosInstance from '@/utils/axios';
import {
  FileManagerListParameters,
  FilesManagerApiResponse,
} from '@/types/component/common/fileManager';
import { showNotification } from '@/redux/notification/notification-slice';
import BackButton from '@/components/common/BackButton';
import { useRouter } from 'next/navigation';

const Preview = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const router = useRouter();
  const getAmc = async (params: FileManagerListParameters) => {
    const { parentId } = params;
    try {
      const response = await axiosInstance.get(
        API_ENDPOINT.FILE_EXPLORER(Number(id), parentId!),
      );
      return response.data;
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

  const goBack = () => {
    router.push('/amc');
  };
  return (
    <div className='container mx-auto'>
      <div className='ml-3 flex'>
        <BackButton onClick={goBack} />
        <h2 className='mb-3 ml-3 text-xl font-semibold'>Preview Amc</h2>
      </div>
      <div className='ml-3 flex'>
        <FileManager
          getFilesAndFolders={getAmc}
          handleAddButtonClick={function (): Promise<FilesManagerApiResponse> {
            throw new Error('Function not implemented.');
          }}
          handleFileSubmit={function (): Promise<FilesManagerApiResponse> {
            throw new Error('Function not implemented.');
          }}
          docType='amc'
        />
      </div>
    </div>
  );
};

export default withAllowedRole(Preview, [
  Roles.SUPER_ADMIN,
  Roles.ADMIN,
  Roles.HR_ADMIN,
  Roles.ACCOUNT_ADMIN,
]);
