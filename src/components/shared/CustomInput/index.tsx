"use client";

import { useState } from "react";

interface Props extends React.ComponentProps<"input"> {
  regexWarning: string;
}

const CustomInput = ({ regexWarning, ...rest }: Props) => {
  return (
    <div className="relative w-full">
      <input {...rest} className="w-full p-5 outline-none" />
      {regexWarning && (
        <p className="absolute bottom-[-25px] left-5 text-red-500 text-13">
          {regexWarning}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
