"use client";

import { useState } from "react";
import useDeletePost from "@/hooks/useDeletePost";
import CustomModal from "@/components/shared/CustomModal";
import axios from "axios";

interface Props {
  id: string;
}

const DeleteButton = ({ id }: Props) => {
  const [modalState, setModalState] = useState(false);

  const { isFetching, deletePost } = useDeletePost();

  const handleDeleteClick = async (id: string) => {
    deletePost(id);
  };

  return (
    <>
      <button
        className="bg-cyan-500/25 hover:text-cyan-400"
        onClick={() => setModalState(true)}
      >
        Delete
      </button>
      {modalState && (
        <CustomModal
          modalType={"delete"}
          modalState={modalState}
          closeModal={() => setModalState(false)}
          eventHandler={() => handleDeleteClick(id)}
          isFetching={isFetching}
        >
          Delete Post ?
        </CustomModal>
      )}
    </>
  );
};

export default DeleteButton;
