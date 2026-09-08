import { Modal, useOverlayState } from '@heroui/react';
import type { UserModel } from '../../../../app/modules/users/models/get_all_users.model';
import UserForm from './user_form';
import { UserFormModalVM } from './user_form_modal.vm';

type Props = {
  state: ReturnType<typeof useOverlayState>;
  /** Provided => edit mode. Omitted => add mode. */
  user?: UserModel;
};

const UserFormModal = ({ state, user }: Props) => {
  const { title, submitLabel, defaultValues, isPending, handleSubmit } =
    UserFormModalVM({ user, onDone: state.close });

  return (
    <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>
              <UserForm
                // remount the form when the target changes so state resets
                key={user?.id ?? 'new'}
                defaultValues={defaultValues}
                submitLabel={submitLabel}
                isPending={isPending}
                onSubmit={handleSubmit}
              />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UserFormModal;
