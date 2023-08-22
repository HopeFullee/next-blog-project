"use client";

interface Props extends React.ComponentProps<"input"> {
  regexState: boolean;
  regexMessage: string;
}

const CustomInput = ({ regexState, regexMessage, ...rest }: Props) => {
  return (
    <div className="relative w-full">
      <input {...rest} className="w-full p-5 outline-none" />
      {regexState && (
        <p className="absolute bottom-[-25px] left-5 text-red-500 text-13">
          {regexMessage}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
