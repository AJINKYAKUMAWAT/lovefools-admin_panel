'use client';

import withAllowedRole from '@/hoc/withAllowedRole';
import { API_ENDPOINT, ERROR_MESSAGES, Roles } from '@/utils/constant';
import React from 'react';
import FileManager from '@/components/common/FileManager';
import axiosInstance from '@/utils/axios';
import {
  FileManagerListParameters,
  FolderInput,
} from '@/types/component/common/fileManager';
import { useAppDispatch, useAppSelector } from '@/redux/selector';
import { showNotification } from '@/redux/notification/notification-slice';

const Document = () => {
  const { selectAmc } = useAppSelector((state) => state.amc);
  const dispatch = useAppDispatch();
  const getAmcDetails = async (params: FileManagerListParameters) => {
    const { parentId } = params;
    try {
      const response = await axiosInstance.get(
        API_ENDPOINT.FILE_EXPLORER(Number(selectAmc?.id), parentId!),
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

  const handleAddFolder = async (
    folderInput: FolderInput,
    queryParameters: FileManagerListParameters,
  ) => {
    if (queryParameters.parentId) {
      const folderObj = {
        name: folderInput.folderName,
        parentId: queryParameters.parentId,
        isFolder: true,
        amcId: Number(selectAmc?.id),
      };

      const response = await axiosInstance.post(
        API_ENDPOINT.ADD_FILE_EXPLORER,
        folderObj,
      );

      const responseData = {
        data: response.data,
        pageData: response.data.pageData,
        totalCount: response.data.totalCount,
      };

      return responseData;
    } else {
      const folderObj = {
        name: folderInput.folderName,
        parentId: 11,
        isFolder: true,
        amcId: Number(selectAmc?.id),
      };
      const response = await axiosInstance.post(
        API_ENDPOINT.ADD_FILE_EXPLORER,
        folderObj,
      );
      const responseData = {
        data: response.data,
        pageData: response.data.pageData,
        totalCount: response.data.totalCount,
      };

      return responseData;
    }
  };

  const handleUploadFile = async (
    queryParameters: FileManagerListParameters,
    fileName: string,
    fileUrl: string,
  ) => {
    if (queryParameters.parentId) {
      const fileObj = {
        name: fileName,
        parentId: queryParameters.parentId,
        documentLinks: fileUrl,
        isFolder: false,
        amcId: Number(selectAmc?.id),
      };

      const response = await axiosInstance.post(
        API_ENDPOINT.ADD_FILE_EXPLORER,
        fileObj,
      );

      const responseData = {
        data: response.data,
        pageData: response.data.pageData,
        totalCount: response.data.totalCount,
      };

      return responseData;
    } else {
      const fileObj = {
        name: fileName,
        documentLinks: fileUrl,
        parentId: 11,
        isFolder: false,
        amcId: Number(selectAmc?.id),
      };

      const response = await axiosInstance.post(
        API_ENDPOINT.ADD_FILE_EXPLORER,
        fileObj,
      );

      const responseData = {
        data: response.data,
        pageData: response.data.pageData,
        totalCount: response.data.totalCount,
      };

      return responseData;
    }
  };

  return (
    <div className='container mx-auto'>
      <div>
        <FileManager
          getFilesAndFolders={getAmcDetails}
          handleAddButtonClick={handleAddFolder}
          handleFileSubmit={handleUploadFile}
          docType='amc'
        />
      </div>
    </div>
  );
};

export default withAllowedRole(Document, [
  Roles.TEAM_LEAD,
  Roles.SUPER_ADMIN,
  Roles.ADMIN,
  Roles.BUSINESS_DEVELOPER,
  Roles.HR_ADMIN,
  Roles.ACCOUNT_ADMIN,
]);
