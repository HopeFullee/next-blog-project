"use client";

import { useState } from "react";
import CustomModal from "@/components/shared/CustomModal";

interface Props {
  id: string;
}

const DeleteButton = ({ id }: Props) => {
  const [modalState, setModalState] = useState(false);

  const handleDeleteClick = (id: string | undefined) => {
    fetch("/api/delete", {
      method: "DELETE",
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.replace("/forum");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button
        className="hover:text-cyan-500"
        onClick={() => setModalState(true)}
      >
        삭제
      </button>
      {modalState && (
        <CustomModal
          modalType={"delete"}
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
