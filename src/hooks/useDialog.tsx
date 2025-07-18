import React from 'react';

export function useDialog() {
  const [isOpen, setIsOpen] = React.useState(false);

  const openDialog = () => {
    setTimeout(() => {
      setIsOpen(true);
    }, 2);
  };

  const closeDialog = (state: boolean) => {
    if (state) {
      setIsOpen(state);
    } else {
      setIsOpen(false);
    }
  };

  return { isOpen, openDialog, closeDialog };
}
