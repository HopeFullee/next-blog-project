"use client";

import clsx from "clsx";
import "./index.scss";

type Props = {
  modalState: boolean;
  closeModal: React.MouseEventHandler<HTMLElement>;
  eventHandler: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const CustomModal = ({
  modalState,
  closeModal,
  eventHandler,
  children,
}: Props) => {
  return (
    <div className="modal-wrapper">
      <div onClick={closeModal} className="overlay"></div>
      <div
        className={clsx(
          modalState ? "modal-animation" : "",
          "w-full !py-40 max-w-300 absolute gap-30 z-30 flex-col-center bg-white border-1 border-gray-400"
        )}
      >
        <p>{children}</p>
        <div className="flex gap-20 under:border-1 under:px-10 under:py-3 under:rounded-sm">
          <button type="button" onClick={eventHandler}>
            삭제
          </button>
          <button type="button" onClick={closeModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
