"use client";

import { url } from "inspector";
import { useState } from "react";
import CustomModal from "@/components/shared/CustomModal";

interface Props {
  id?: string;
}

const DeleteButton = ({ id, ...rest }: Props) => {
  const [modalState, setModalState] = useState(false);

  const handleDeleteClick = (id: string | undefined) => {
    fetch("/api/delete", {
      method: "DELETE",
      body: JSON.stringify({
        _id: id,
      }),
    }).then(() => {
      window.location.href = "/list";
    });
  };

  return (
    <>
      <button onClick={() => setModalState(true)}>삭제</button>
      {modalState && (
        <CustomModal
          modalState={modalState}
          closeModal={() => setModalState(false)}
          eventHandler={() => handleDeleteClick(id)}
        >
          리얼루 삭제 하겠습니까
        </CustomModal>
      )}
    </>
  );
};

export default DeleteButton;
