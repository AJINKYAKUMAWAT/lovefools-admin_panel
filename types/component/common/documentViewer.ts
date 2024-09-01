export interface DocumentViewerProps {
  fileUrl: string;
  open: boolean;
  onClose: () => void;
  isLoading?: boolean;
}
export interface Document {
  url: string;
  fileName: string;
  fileType: string;
}

export interface FileDetails {
  fileName: string;
  fileExtension: string;
}
