import { ModalProps } from '@nextui-org/react';
export default interface PopupModalProps extends ModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  header: string;
  children: React.ReactNode;
}
