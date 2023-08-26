"use client";

import { ReactElement } from "react";

interface Props extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

const CustomButton = ({ children, ...rest }: Props) => {
  return (
    <>
      <button {...rest}>{children}</button>
    </>
  );
};

export default CustomButton;
