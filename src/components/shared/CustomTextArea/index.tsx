"use client";

interface Props extends React.ComponentProps<"textarea"> {
  regexState: boolean;
  regexMessage: string;
}

const CustomTextArea = ({ regexState, regexMessage, ...rest }: Props) => {
  return (
    <div className="relative w-full">
      <textarea
        {...rest}
        className="w-full p-5 outline-none resize-none min-h-150"
      />
      {regexState && (
        <p className="absolute bottom-[-20px] left-5 text-red-500 text-13">
          {regexMessage}
        </p>
      )}
    </div>
  );
};

export default CustomTextArea;
