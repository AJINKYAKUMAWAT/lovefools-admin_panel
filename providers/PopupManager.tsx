import React, { useState, createContext, useContext, FC } from 'react';
import ComponentProps from '@/types/component/common/popupModal';
import DocumentContainer from '@/components/common/document/DocumentContainer';
import { getFileDetailsFromUrl } from '@/utils/utils';
import { useAppDispatch } from '@/redux/selector';
import { showNotification } from '@/redux/notification/notification-slice';
import { API_ENDPOINT, ERROR_MESSAGES } from '@/utils/constant';
import axiosInstance from '@/utils/axios';
import { Document } from '@/types/component/common/documentViewer';

interface PopupContextType {
  showPopup: (args: { type: string; document: Document }) => void;
  showDocumentPreview: (args: { documentUrl: string }) => void;
  hidePopup: () => void;
}

export const PopupContext = createContext<PopupContextType | null>(null);

interface PopupManagerProps {
  children: React.ReactNode;
}

const PopupManager: FC<PopupManagerProps> = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<string>('');
  const [documentInfo, setDocumentInfo] = useState<Document>({
    url: '',
    fileName: '',
    fileType: '',
  });

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const dispatch = useAppDispatch();

  const showPopup = ({
    type,
    document,
  }: {
    type: string;
    document: Document;
  }) => {
    setPopupType(type);
    if (document) {
      setDocumentInfo(document);
    }
    openPopup();
  };

  const hidePopup = () => {
    closePopup();
  };

  const showDocumentPreview = async ({
    documentUrl,
  }: {
    documentUrl: string;
  }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINT.GET_PRESIGNED_URL, {
        params: { key: documentUrl },
      });

      const { fileName, fileExtension } = getFileDetailsFromUrl(documentUrl);

      if (response.data && response.data.data) {
        showPopup({
          type: 'documentPreview',
          document: {
            url: response.data.data,
            fileName: fileName,
            fileType: fileExtension,
          },
        });
      } else {
        dispatch(
          showNotification({
            message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            variant: 'error',
          }),
        );
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
          variant: 'error',
        }),
      );
    }
  };

  return (
    <>
      <Popup
        isOpen={isPopupOpen}
        onOpenChange={closePopup}
        header=''
        type={popupType}
        documentInfo={documentInfo}>
        {children}
      </Popup>
      <PopupContext.Provider
        value={{ showPopup, showDocumentPreview, hidePopup }}>
        {children}
      </PopupContext.Provider>
    </>
  );
};

export const usePopupManager = () => {
  const popupContext = useContext(PopupContext);

  if (!popupContext) {
    throw new Error(
      'usePopupManager must be used within a PopupContextProvider',
    );
  }

  return popupContext;
};

interface PopupProps extends ComponentProps {
  isOpen: boolean;
  onOpenChange: () => void;
  type: string;
  documentInfo?: Document;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  type,
  documentInfo,
  onOpenChange,
}) => {
  if (!isOpen) return null;

  switch (type) {
    case 'documentPreview':
      if (!documentInfo?.url) {
        console.error('Document URL is required for document preview');
        return null;
      }

      return (
        <DocumentContainer
          cancelHandler={onOpenChange}
          url={documentInfo?.url}
          fileType={documentInfo?.fileType}
          fileName={documentInfo.fileName}
        />
      );
    default:
      console.error(`Unknown popup type: ${type}`);
      return null;
  }
};

export default PopupManager;
