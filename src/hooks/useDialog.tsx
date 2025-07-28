import React, { useCallback } from 'react';

export function useDialog() {
  const [isOpen, setIsOpen] = React.useState(false);

  const openDialog = useCallback(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 2);
  }, [isOpen]);

  const closeDialog = (state: boolean) => {
    if (state) {
      setIsOpen(state);
    } else {
      setIsOpen(false);
    }
  };

  return { isOpen, openDialog, closeDialog };
}
