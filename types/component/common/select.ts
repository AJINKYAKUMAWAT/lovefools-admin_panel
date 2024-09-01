import { Props as ReactSelectProps } from 'react-select';

export interface ValueLabelOption {
  value: string;
  label: string;
}

export type GroupedOptions = {
  label: string;
  options: ValueLabelOption[];
};

type SelectProps = {
  placeholder: string;
  required?: boolean;
  isInvalid?: boolean;
  multiple?: boolean;
  errorMessage?: string | undefined;
  label?: string;
  handleInputChange?: (input: string) => void;
} & ReactSelectProps;

export default SelectProps;
