"use client";

interface Props extends React.ComponentProps<"input"> {
  regexWarning: string;
}

const CustomInput = ({ regexWarning, ...rest }: Props) => {
  return (
    <div className="relative w-full">
      <input {...rest} className="w-full p-5 outline-none" />
      {regexWarning && (
        <p className="absolute bottom-[-23px] left-5 text-red-500 text-12">
          {regexWarning}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
