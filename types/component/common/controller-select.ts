import SelectProps from './select';

type ControllerSelectProps = { name: string } & Omit<SelectProps, 'ref'>;

export default ControllerSelectProps;
