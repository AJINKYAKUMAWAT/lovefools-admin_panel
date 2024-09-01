import { Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import React from 'react';
import Button from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  modalBodyClass?: string;
  cancelButtonClass?: string;
  confirmButtonClass?: string;
  loading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  cancelButtonLabel = 'Discard',
  confirmButtonLabel = 'Proceed',
  modalBodyClass = '',
  cancelButtonClass = '',
  confirmButtonClass = '',
  loading = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      hideCloseButton
      size='lg'>
      <ModalContent>
        <ModalBody className={modalBodyClass}>
          <p className='my-4'>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color='default'
            onPress={onClose}
            className={cancelButtonClass}>
            {cancelButtonLabel}
          </Button>
          <Button
            color='primary'
            onPress={handleConfirm}
            className={confirmButtonClass}
            isLoading={loading}>
            {confirmButtonLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
