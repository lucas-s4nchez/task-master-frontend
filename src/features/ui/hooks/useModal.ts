import { useState } from "react";

export const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return { isOpenModal, handleOpenModal, handleCloseModal };
};
