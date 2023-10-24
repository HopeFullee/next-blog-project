"use client";

interface Props extends React.ComponentProps<"input"> {
  regexWarning: string;
}

const CustomInput = ({ regexWarning, ...rest }: Props) => {
  return (
    <div className="relative w-full">
      <input
        {...rest}
        className="w-full p-5 text-[#15202B] outline-none disabled:py-5 disabled:px-0 disabled:bg-transparent disabled:text-white"
      />
      {regexWarning && (
        <p className="absolute bottom-[-23px] left-5 text-red-500 text-12">
          {regexWarning}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
