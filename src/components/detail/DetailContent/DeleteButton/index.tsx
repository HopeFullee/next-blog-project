"use client";

import { useState } from "react";
import CustomModal from "@/components/shared/CustomModal";
import axios from "axios";

interface Props {
  id: string;
}

const DeleteButton = ({ id }: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [modalState, setModalState] = useState(false);

  const handleDeleteClick = async (id: string | undefined) => {
    setIsFetching(true);

    try {
      const res = await axios.delete("/api/forum", {
        params: {
          id: id,
        },
      });

      if (res.status === 200) window.location.replace("/forum");
      else throw res;
    } catch (err) {
      setIsFetching(false);
      console.log(err);
    }
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
          isFetching={isFetching}
        >
          리얼루 삭제 하겠습니까
        </CustomModal>
      )}
    </>
  );
};

export default DeleteButton;
