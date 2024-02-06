import { useState } from "react";

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState();
  const [args, setArgs] = useState([]);

  function showModal(...args) {
    setArgs(args);
    setIsModalOpen(true);
  }

  function hideModal() {
    setIsModalOpen(false);
  }

  return {
    isModalOpen,
    showModal,
    hideModal,
    args,
  };
}

export default useModal;
