import { useState } from "react";

export const useAlert = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const onOpenAlert = () => {
    setIsOpenAlert(true);
  };
  const onCloseAlert = () => {
    setIsOpenAlert(false);
  };

  return [onCloseAlert, onOpenAlert, isOpenAlert];
};
