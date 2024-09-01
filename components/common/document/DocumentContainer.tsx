import axios from 'axios';
import DocumentViewer from './DocumentViewer';
import './Document.css';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface DocumentContainerProps {
  url: string;
  fileName?: string;
  cancelHandler: () => void;
  fileType: string;
}

const DocumentContainer: React.FC<DocumentContainerProps> = ({
  url,
  fileName,
  cancelHandler,
  fileType,
}) => {
  const downloadURI = async (url: string, name: string) => {
    const blob = await axios.get(url, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      responseType: 'blob',
    });
    const a = document.createElement('a');
    const href = window.URL.createObjectURL(blob.data);
    a.href = href;
    a.download = name + '.' + fileType.trim();
    a.click();
  };

  return (
    <div
      className={`document-container document-container-full`}
      style={{ width: '100%' }}>
      <div className='document-header flex h-16 items-center bg-black px-4 text-white'>
        <div className='document-header-left flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap'>
          {`${fileName}.${fileType}` || ''}
        </div>
        <div className='document-header-right space-x-1'>
          <span
            className='close-icon-notification cursor-pointer pr-1'
            onClick={() => downloadURI(url, fileName || '')}>
            <ArrowDownTrayIcon className='h-5 w-5' />
          </span>
          <span
            className='close-icon-notification cursor-pointer pr-1'
            onClick={cancelHandler}>
            <XMarkIcon className='h-6 w-6' />
          </span>
        </div>
      </div>
      <div className='document-content h-full overflow-hidden rounded-md border border-gray-200 p-2'>
        <DocumentViewer
          fileUrl={url}
          fileType={fileType}
        />
      </div>
    </div>
  );
};

export default DocumentContainer;
