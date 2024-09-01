import { ListResult, ListParameters } from '@/types/baseTypes';

type FolderInput = {
  id?: number | null;
  folderName: string;
  documentLinks?: string;
  parentId?: number | null;
  carDocumentId?: number | null;
};

export interface FileData {
  id: number | null;
  parentId: number | null;
  type: string;
}
export interface FolderEditData {
  id: number | null;
  parentId: number | null;
  folderName: string;
}

type FolderData = {
  id?: number | null;
  name: string;
  parentId: number | null;
  isFolder: boolean;
  status: boolean;
};

export interface AssetsFormProps {
  defaultValues: FolderInput;
  handleClose: () => void;
  handleAddButtonClick: (folderInput: FolderInput) => void;
}

type FilesManagerApiResponse = ListResult<FolderData>;

type FileManagerListParameters = ListParameters & { parentId: number | null };

export type DocType =
  | 'property'
  | 'car'
  | 'associationWithjoinVentures'
  | 'companyDirector'
  | 'businessDevelopment'
  | 'associatesWithClient'
  | 'Projects'
  | 'booking'
  | 'amc'
  | 'associationWithSubConsultant';

type FileManagerProps = {
  docType: DocType;
  getFilesAndFolders: (
    listParams: FileManagerListParameters,
  ) => Promise<FilesManagerApiResponse>;
  handleAddButtonClick: (
    folderInput: FolderInput,
    listParams: FileManagerListParameters,
  ) => Promise<FilesManagerApiResponse>;
  handleFileSubmit: (
    listParams: FileManagerListParameters,
    fileName: string,
    fileUrl: string,
  ) => Promise<FilesManagerApiResponse>;
};

export interface AllDocsIds {
  car: string;
  property: string;
  associationWithjoinVentures: string;
  companyDirector: string;
  businessDevelopment: string;
  Projects: string;
  associatesWithClient: string;
  booking: string;
  amc: string;
  associationWithSubConsultant: string;
  // Add more keys if needed
}

export default FileManagerProps;

export type {
  FolderInput,
  FolderData,
  FilesManagerApiResponse,
  FileManagerListParameters,
};
