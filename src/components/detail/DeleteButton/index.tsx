"use client";

import { useState } from "react";
import CustomModal from "@/components/shared/CustomModal";

interface Props {
  id: string;
  author: string;
}

const DeleteButton = ({ id, author, ...rest }: Props) => {
  const [modalState, setModalState] = useState(false);

  const handleDeleteClick = (id: string | undefined) => {
    fetch("/api/delete", {
      method: "DELETE",
      body: JSON.stringify({
        _id: id,
        author: author,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.replace("/list");
        }
      })
      .catch((error) => {
        console.log(error);
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
