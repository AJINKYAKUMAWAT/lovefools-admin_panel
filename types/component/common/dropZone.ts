export interface MaxFileSize {
  image: number;
  pdf: number;
}

export interface DropZoneProps {
  allowedFileTypes: string[];
  maxFileSize: MaxFileSize;
  onUpload: (file: File[]) => void;
  errorMessage: string | null;
  singleFile?: boolean;
  allowAllTypes?: boolean;
}
