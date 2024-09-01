export interface CustomError {
  message: string;
  // other properties if exists
}

export interface ErrorProps {
  error: Error | CustomError | string;
}
