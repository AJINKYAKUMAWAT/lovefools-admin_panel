import { RadioGroupProps as NextUIRadioGroupProps } from '@nextui-org/react';
import { ValueLabelOption } from '@/types/component/common/select';

export default interface RadioGroupProps extends NextUIRadioGroupProps {
  options: ValueLabelOption[];
}
