import TextFieldProps from './textField';

type SearchBarProps = {
  onChange: (value: string) => void;
  value: string;
  className?: string;
} & TextFieldProps;

export default SearchBarProps;
