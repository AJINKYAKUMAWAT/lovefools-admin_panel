export interface MaxFileSize {
  image: number;
  pdf: number;
}

export interface DocumentUploadProps {
  allowedFileTypes: string[];
  maxFileSize: MaxFileSize;
  onSuccess: (fileUrl: string) => void;
  apiEndpoint: string;
  errorMessage: string | null;
  label: string;
}
