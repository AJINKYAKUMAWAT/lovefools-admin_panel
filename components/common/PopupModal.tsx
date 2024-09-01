import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import ComponentProps from '@/types/component/common/popupModal';

const PopupModal: React.FC<ComponentProps> = ({
  isOpen,
  onOpenChange,
  header,
  children,
  ...rest
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior='inside'
      {...rest}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{header}</ModalHeader>
            <ModalBody>{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PopupModal;
