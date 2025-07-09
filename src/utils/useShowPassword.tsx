import { useCallback, useRef, useState, type RefObject } from 'react';

interface UseShowPasswordProps {
  initialState?: boolean;
  focusElement?: RefObject<HTMLInputElement> | null;
}

export function useShowPassword({
  focusElement = null,
  initialState = false,
}: UseShowPasswordProps = {}) {
  const [showPassword, setShowPassword] = useState<boolean>(initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => {
      const newState = !prev;

      const elementToFocus = focusElement?.current || inputRef.current;

      if (elementToFocus && elementToFocus instanceof HTMLInputElement) {
        elementToFocus.focus();
      }

      return newState;
    });
  }, [focusElement]);

  return {
    showPassword,
    togglePassword,
    inputRef,
  };
}
