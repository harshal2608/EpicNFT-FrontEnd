import { useState } from 'react';
export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);

  const toggle = () => setIsShown((prvState) => !prvState);
  return {
    isShown,
    toggle,
  };
};
