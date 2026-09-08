import { PlusIcon } from '@heroicons/react/24/outline';
import { Button, Modal } from '@heroui/react';

const UserModal = () => {
  return (
    <>
      <Modal>
        <Button isIconOnly>
          <PlusIcon />
        </Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>Add User</Modal.Header>
              <Modal.Body>Burada form olacaq</Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default UserModal;
