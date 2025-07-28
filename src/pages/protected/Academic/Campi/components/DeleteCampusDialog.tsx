import { MyConfirmDialog, MyConfirmDialogBase } from '@/components/ConfirmDialog';
import { Dropdown } from '@/components/Dropdown';
import { IconTrash } from '@tabler/icons-react';

export const DeleteCampusDialog = ({ name }: { name: string }) => {
  return (
    <MyConfirmDialog
      content={
        <p>
          Tem certeza que deseja excluir o campus <b>{name}</b>?
        </p>
      }
      primaryText="Excluir"
    >
      <MyConfirmDialogBase.Context>
        {context => (
          <Dropdown.Item
            value="delete-campus"
            icon={IconTrash}
            variant="error"
            onClick={() => context.setOpen(true)}
          >
            Excluir
          </Dropdown.Item>
        )}
      </MyConfirmDialogBase.Context>
    </MyConfirmDialog>
  );
};
