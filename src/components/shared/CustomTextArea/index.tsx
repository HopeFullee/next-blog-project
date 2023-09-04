"use client";

interface Props extends React.ComponentProps<"textarea"> {
  regexWarning: string;
}

const CustomTextArea = ({ regexWarning, ...rest }: Props) => {
  return (
    <div className="relative w-full">
      <textarea
        {...rest}
        className="w-full p-5 outline-none resize-none min-h-150"
      />
      {regexWarning && (
        <p className="absolute bottom-[-25px] left-5 text-red-500 text-13">
          {regexWarning}
        </p>
      )}
    </div>
  );
};

export default CustomTextArea;
